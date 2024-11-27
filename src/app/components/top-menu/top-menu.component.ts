import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../services/shoppingcart.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})
export class TopMenuComponent implements OnInit {
  categories = ['Electronics', 'Clothing', 'Home', 'Books', 'Toys'];
  items$?: Observable<number>;
  totalPrice$?: Observable<number>;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.items$ = this.shoppingCartService.items$;
    this.totalPrice$ = this.shoppingCartService.totalPrice$;
  }
}
