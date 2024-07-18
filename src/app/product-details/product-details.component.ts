import { Component, Input } from '@angular/core';
import { Product } from '../product.model';
import { NgStyle } from '@angular/common';
import { AppService } from '../app.service';

@Component({
  selector: 'product-details',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './product-details.component.html',
  // styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  @Input() product: Product | undefined;

  constructor(
    private _svc: AppService
  ) {}

  addToCart() {
    this._svc.addToCart(this.product)
  }
}
