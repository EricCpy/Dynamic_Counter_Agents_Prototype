import {Component} from '@angular/core';
import {items} from '../items';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent {
  items = items;
  //TODO items anklickbar machen und wenn man auf ein item klickt, dann wird ein chart generiert in welchem man eine Linie Setzen kann über ein Inputfeld, wenn man das macht, dann wird der chart neu generiert
}
