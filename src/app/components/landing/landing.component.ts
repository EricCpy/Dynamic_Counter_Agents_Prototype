import {Component} from '@angular/core';
import {items} from '../items';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  products = items.slice(4, 7);
}
