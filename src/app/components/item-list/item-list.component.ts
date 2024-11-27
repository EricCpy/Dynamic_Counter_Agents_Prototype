import {Component} from '@angular/core';
import {items} from '../items';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent {
  products = items;
}
