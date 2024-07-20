import { computed, Injectable, signal } from '@angular/core';
import { CartItem, Product } from './product.model';

@Injectable({providedIn: 'root'})
export class AppService {

  cart = signal<CartItem[]>([])
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
        cartItem.quantity++;
        this.updateQuantity(cartItem.product, cartItem.quantity)
      } else {
        this.cart.update(cart => [ ...cart, { product, quantity: 1 }]);
      }
    }
  }

  removeFromCart(product: Product) {
    const cartItem = this.cart().find(item => item.product.id === product.id);
    if (cartItem) {
      this.cart.update(() => this.cart().filter(item => item.product.id !== product.id));
    }
  }

  updateQuantity(product: Product, quantity: number) {
    this.cart.update(cart => cart.map(c => c.product.id == product.id ? { product, quantity } : c))
  }
  
}