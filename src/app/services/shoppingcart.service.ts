import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private itemsSubject = new BehaviorSubject<number>(0);
  private totalPriceSubject = new BehaviorSubject<number>(0);

  items$ = this.itemsSubject.asObservable();
  totalPrice$ = this.totalPriceSubject.asObservable();

  addItem(price: number): void {
    this.itemsSubject.next(this.itemsSubject.value + 1);
    this.totalPriceSubject.next(this.totalPriceSubject.value + price);
  }

  removeItem(price: number): void {
    if (this.itemsSubject.value > 0) {
      this.itemsSubject.next(this.itemsSubject.value - 1);
      this.totalPriceSubject.next(this.totalPriceSubject.value - price);
    }
  }

  clearCart(): void {
    this.itemsSubject.next(0);
    this.totalPriceSubject.next(0);
  }
}
