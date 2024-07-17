import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Product } from './product.model';

@Injectable({providedIn: 'root'})
export class AppService {
  cartCount$ = new BehaviorSubject(0)
  cart: CartItem[] = []
  cartList: Product[] = []
  // cartList$ = new BehaviorSubject<Cart[] | null>(this.cartList)

  constructor() { }

  getCart() {
    return this.cart;
  }

  getCartCount() {
    return this.cartCount$.asObservable();
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
      cartItem.quantity--;
      if (cartItem.quantity === 0) {
        this.cart = this.cart.filter(item => item.product.id !== product.id);
      }
      this.updateCartCount();
    }
  }

  private updateCartCount() {
    const totalQuantity = this.cart.reduce((acc, item) => acc + item.quantity, 0);
    this.cartCount$.next(totalQuantity);
  }
  
}