import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Product } from './product.model';

@Injectable({providedIn: 'root'})
export class AppService {
  cartCount$ = new BehaviorSubject(0)
  cart: CartItem[] = []
  totalPrice$ = new BehaviorSubject(0)

  constructor() { }

  getCart() {
    return this.cart;
  }

  getCartCount() {
    return this.cartCount$.asObservable();
  }
  
  getTotalPrice() {
    return this.totalPrice$.asObservable();
  }


  addToCart(product: Product | undefined) {
    if (product) {
      const cartItem = this.cart.find(item => item.product.id === product.id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        this.cart.push({ product, quantity: 1 });
      }
      this.updateCartCount();
    }
  }

  removeFromCart(product: Product) {
    const cartItem = this.cart.find(item => item.product.id === product.id);
    if (cartItem) {
      this.cart = this.cart.filter(item => item.product.id !== product.id);
      this.updateCartCount();
    }
  }

  updateCart(updatedCart: CartItem[]) {
    this.cart = updatedCart;
    this.updateCartCount();
  }

  private updateCartCount() {
    const totalQuantity = this.cart.reduce((acc, item) => acc + item.quantity, 0);
    this.cartCount$.next(totalQuantity);
    const totalPrice = this.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    this.totalPrice$.next(Math.round(totalPrice*100)/100)
  }
  
}