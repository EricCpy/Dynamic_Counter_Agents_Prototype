import {Routes} from '@angular/router';
import {ItemListComponent} from './components/item-list/item-list.component';
import {ItemDetailComponent} from './components/item-detail/item-detail.component';

export const routes: Routes = [
  {path: '', component: ItemListComponent},
  {path: 'item/:id', component: ItemDetailComponent}
];
