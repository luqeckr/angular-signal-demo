import { Component, computed, OnInit, Signal, WritableSignal } from '@angular/core';
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

  cart
  dollarKeRupiah = 16000
  totalPrice: Signal<string>
  
  constructor(
    private _svc: AppService
  ) {
    // this._svc.totalPrice$.subscribe(r => this.totalPrice = (r * this.dollarKeRupiah).toLocaleString('id-ID'))
    this.totalPrice = computed(() => (this._svc.totalPrice() * this.dollarKeRupiah).toLocaleString('id-ID'))
    this.cart = this._svc.getCart()
  }

  ngOnInit(): void {
  }

  onQuantityChange(product: Product, quantity: number) {
    const cartItem = this.cart().find(item => item.product.id === product.id);
    if (cartItem) {
      // cartItem.quantity = quantity;
      this._svc.updateQuantity(product, quantity)
      // this._svc.updateCart(this.cart());
    }
  }

  removeFromCart(product: Product) {
    this._svc.removeFromCart(product);
    // this.cart = this._svc.getCart();
  }

}
