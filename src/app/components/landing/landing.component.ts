import {Component} from '@angular/core';
import {items} from '../items';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  currentIndex: number = 0;
  products = items;

  ngOnInit(): void {
    let selectedProducts = [];
    let randomIndexes: number[] = [];

    while (selectedProducts.length < 3) {
      let randomIndex = Math.floor(Math.random() * this.products.length);
      if (!randomIndexes.includes(randomIndex)) {
        selectedProducts.push(this.products[randomIndex]);
        randomIndexes.push(randomIndex);
      }
    }

    this.products = selectedProducts;
  }
}
