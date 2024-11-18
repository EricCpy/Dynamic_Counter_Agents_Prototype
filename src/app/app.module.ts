import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {TopMenuComponent} from './components/top-menu/top-menu.component';
import {LandingComponent} from './components/landing/landing.component';
import {ItemListComponent} from './components/item-list/item-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {provideRouter, RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {ItemDetailComponent} from './components/item-detail/item-detail.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [AppComponent, TopMenuComponent, LandingComponent, ItemListComponent, ItemDetailComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent]
})
export class AppModule {}
