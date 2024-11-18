import { Component } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})
export class TopMenuComponent {
  categories = ['Electronics', 'Clothing', 'Home', 'Books', 'Toys'];
}
