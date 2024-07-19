import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent,children:[
    { path: ':id', component: ProductsComponent}
  ] },
  // { path: 'products/:id', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent }
];