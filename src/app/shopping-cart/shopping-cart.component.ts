import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { CartItem, Product } from '../product.model';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart.component.html',
  // styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {

  cart: CartItem[] = []
  totalPrice: number = 0;
  
  constructor(
    private _svc: AppService
  ) {}

  ngOnInit(): void {
    this.cart = this._svc.getCart()
    this.calculateTotalPrice();
  }

  addToCart(product: Product) {
    this._svc.addToCart(product);
    this.cart = this._svc.getCart();
    this.calculateTotalPrice();
  }

  removeFromCart(product: Product) {
    this._svc.removeFromCart(product)
    this.cart = this._svc.getCart()
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.totalPrice = this.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

}
