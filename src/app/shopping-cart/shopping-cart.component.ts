import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { CartItem, Product } from '../product.model';
import { NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [NgStyle, FormsModule],
  templateUrl: './shopping-cart.component.html',
  // styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {

  cart: CartItem[] = []
  dollarKeRupiah = 16000
  totalPrice: string = '0'
  
  constructor(
    private _svc: AppService
  ) {
    this._svc.totalPrice$.subscribe(r => this.totalPrice = (r * this.dollarKeRupiah).toLocaleString('id-ID'))
  }

  ngOnInit(): void {
    this.cart = this._svc.getCart()
  }

  onQuantityChange(product: Product, quantity: number) {
    const cartItem = this.cart.find(item => item.product.id === product.id);
    if (cartItem) {
      cartItem.quantity = quantity;
      this._svc.updateCart(this.cart);
    }
  }

  removeFromCart(product: Product) {
    this._svc.removeFromCart(product);
    this.cart = this._svc.getCart();
  }

}
