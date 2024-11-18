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
  private svg: any;
  private margin = {top: 20, right: 30, bottom: 30, left: 40};
  private width = 800 - this.margin.left - this.margin.right;
  private height = 400 - this.margin.top - this.margin.bottom;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.item = this.items.find(i => i.id === id);
    this.createChart();
  }

  createChart(): void {
    // Generate price data for one year (365 days), increasing or decreasing by max 20% monthly
    const data = [];
    let currentPrice = Math.random() * (1000 - 100) + 100; // Random starting price between 100 and 1000

    for (let day = 1; day <= 365; day++) {
      if (day % 30 === 1 && day !== 1) {
        // Adjust price every month (30 days)
        const changeFactor = 1 + (Math.random() * 0.4 - 0.2); // Between -20% and +20%
        currentPrice = Math.max(currentPrice * changeFactor, 50); // Ensure price doesn't drop below 50
      }
      data.push({day, price: currentPrice});
    }

    this.svg = d3
      .select('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    const x = d3.scaleLinear().domain([1, 365]).range([0, this.width]);
    const y = d3.scaleLinear().domain([0, 1000]).range([this.height, 0]);

    this.svg.append('g').attr('transform', `translate(0,${this.height})`).call(d3.axisBottom(x));
    this.svg.append('g').call(d3.axisLeft(y));

    const line = d3
      .line()
      .x((d: any) => x((d as any).day))
      .y((d: any) => y((d as any).price));

    this.svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    // Add minimum price line (default 0, updated dynamically)
    this.svg
      .append('line')
      .attr('x1', 0)
      .attr('x2', this.width)
      .attr('y1', y(this.minPrice))
      .attr('y2', y(this.minPrice))
      .attr('stroke', 'red')
      .attr('stroke-width', 1.5);
  }

  updateMinPrice(): void {
    this.svg.selectAll('line').remove();
    this.svg
      .append('line')
      .attr('x1', 0)
      .attr('x2', this.width)
      .attr('y1', d3.scaleLinear().domain([0, 1000]).range([this.height, 0])(this.minPrice))
      .attr('y2', d3.scaleLinear().domain([0, 1000]).range([this.height, 0])(this.minPrice))
      .attr('stroke', 'red')
      .attr('stroke-width', 1.5);
  }
}
