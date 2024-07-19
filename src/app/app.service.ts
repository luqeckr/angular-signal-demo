import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Product } from './product.model';

@Injectable({providedIn: 'root'})
export class AppService {
  cartCount$ = new BehaviorSubject(0)
  cart = signal<CartItem[]>([])
  totalPrice$ = new BehaviorSubject(0)
  totalQuantity = computed(() => this.cart().reduce((acc, item) => acc + item.quantity, 0));
  totalPrice = computed(() => this.cart().reduce((acc, item) => acc + item.product.price * item.quantity, 0));

  constructor() { }

  getCart() {
    return this.cart;
  }

  addToCart(product: Product | undefined) {
    if (product) {
      const cartItem = this.cart().find(item => item.product.id === product.id);
      if (cartItem) {
        cartItem.quantity++
        this.updateQuantity(cartItem.product, cartItem.quantity)
        // this.cart.set(newCart)
      } else {
        this.cart.update(c => [...c, {product, quantity: 1}])
      }
    }
  }

  updateQuantity(product: Product, quantity: number) {
    this.cart.update(cart => cart.map(c => c.product.id == product.id ? {product: product, quantity: quantity} : c))
  }

  removeFromCart(product: Product) {
    const cartItem = this.cart().find(item => item.product.id === product.id);
    if (cartItem) {
      this.cart.update(c => c.filter(item => item.product.id !== product.id));
    }
  }

  updateCart(updatedCart: CartItem[]) {
    this.cart.set(updatedCart)
  }
  
}