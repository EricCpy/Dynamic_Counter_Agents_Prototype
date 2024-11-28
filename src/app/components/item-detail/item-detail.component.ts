import {ShoppingCartService} from './../../services/shoppingcart.service';
import {Component, OnInit} from '@angular/core';
import {items} from '../items';
import * as d3 from 'd3';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.scss'
})
export class ItemDetailComponent implements OnInit {
  items = items;
  item: any = {};
  minPrice = 0;
  maxPredictedPrice = 0;
  y: any = undefined;
  private svg: any;
  private margin = {top: 20, right: 30, bottom: 40, left: 40};
  private width = 800 - this.margin.left - this.margin.right;
  private height = 400 - this.margin.top - this.margin.bottom;

  constructor(
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.item = this.items.find(i => i.id === id);
    this.minPrice = this.item ? this.item.price : 0;
    this.createChart();
  }

  createChart(): void {
    // Generate price data for 180 days with weekly (every 7 days) price changes
    const data = [];
    let currentPrice = this.minPrice;
    let maxPrice = currentPrice;
    let minPrice = currentPrice;

    for (let day = 1; day <= 180; day++) {
      if (day % 7 === 1 && day !== 1) {
        const changeFactor = 1 + (Math.random() * 0.4 - 0.2); // Random change between -20% and +20%
        currentPrice = currentPrice * changeFactor;
      }
      minPrice = Math.min(minPrice, currentPrice);
      maxPrice = Math.max(maxPrice, currentPrice);

      // Add increasing confidence interval values
      const initialConfidence = 0.05 * currentPrice * (day < 7 ? 0 : 1);
      const growthFactor = 0.2; // Slow growth rate
      const confidenceWidth = initialConfidence + growthFactor * Math.sqrt(day); // Confidence grows with the square root of time
      const upper = currentPrice + confidenceWidth;
      const lower = currentPrice - confidenceWidth;

      data.push({day, price: currentPrice, upper, lower});
    }

    this.maxPredictedPrice = maxPrice;
    this.svg = d3
      .select('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    const x = d3.scaleLinear().domain([1, 180]).range([0, this.width]);
    this.y = d3
      .scaleLinear()
      .domain([Math.min(0, minPrice), maxPrice * 1.2]) // Add padding for confidence interval
      .range([this.height, 0]);

    this.svg.append('g').attr('transform', `translate(0,${this.height})`).call(d3.axisBottom(x));
    this.svg.append('g').call(d3.axisLeft(this.y));

    // X label
    this.svg
      .append('text')
      .attr('x', this.width / 2)
      .attr('y', this.height + this.margin.bottom - 3)
      .style('text-anchor', 'middle')
      .text('Days from now');

    // Y label
    this.svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -this.height / 2)
      .attr('y', -this.margin.left + 12)
      .style('text-anchor', 'middle')
      .text('Price in €');

    // Draw confidence interval as a spline-filled area
    this.svg
      .append('path')
      .datum(data)
      .attr('fill', 'lightsteelblue')
      .attr('opacity', 0.3)
      .attr(
        'd',
        d3
          .area()
          .curve(d3.curveBasis)
          .x((d: any) => x(d.day))
          .y0((d: any) => this.y(d.lower))
          .y1((d: any) => this.y(d.upper))
      );

    // Draw the main line with splines
    const line = d3
      .line()
      .x((d: any) => x(d.day))
      .y((d: any) => this.y(d.price));

    this.svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    // Add minimum price line (default 0, updated dynamically)
    this.updateMinPrice();
  }

  updateMinPrice(): void {
    this.minPrice = Math.max(0, this.minPrice);
    this.minPrice = Math.min(this.minPrice, this.maxPredictedPrice);
    this.svg.selectAll('line').remove();
    this.svg
      .append('line')
      .attr('x1', 0)
      .attr('x2', this.width)
      .attr('y1', this.y(this.minPrice))
      .attr('y2', this.y(this.minPrice))
      .attr('stroke', 'red')
      .attr('stroke-width', 0.5);
  }

  addItem(): void {
    this.shoppingCartService.addItem(this.minPrice);
  }
}
