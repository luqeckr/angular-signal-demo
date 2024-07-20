import { Component, computed, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { CartItem, Product } from '../product.model';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [NgStyle, FormsModule, CurrencyPipe],
  templateUrl: './shopping-cart.component.html',
  // styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {

  cart = this._svc.cart
  dollarKeRupiah = 16000
  totalPrice = computed(() => (this._svc.totalPrice() * this.dollarKeRupiah).toLocaleString('id-ID'))
  
  constructor(
    private _svc: AppService
  ) {
    // this._svc.totalPrice$.subscribe(r => this.totalPrice = (r * this.dollarKeRupiah).toLocaleString('id-ID'))
  }

  ngOnInit(): void {
    this.cart = this._svc.getCart()
  }

  onQuantityChange(product: Product, quantity: number) {
    const cartItem = this.cart().find(item => item.product.id === product.id);
    if (cartItem) {
      cartItem.quantity = quantity;
      this._svc.updateQuantity(product, quantity)
    }
  }

  removeFromCart(product: Product) {
    this._svc.removeFromCart(product);
    this.cart = this._svc.getCart();
  }

}
