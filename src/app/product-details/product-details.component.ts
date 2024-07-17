import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { ProductsComponent } from '../products/products.component';
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
    private route: ActivatedRoute, 
    private productsComponent: ProductsComponent,
    private _svc: AppService
  ) {}

  ngOnInit(): void {
    // const productId = +this.route.snapshot.paramMap.get('id')!;
    // this.product = this.productsComponent.products.find(p => p.id === productId);
  }

  addToCart() {
    this._svc.addToCart(this.product)
  }
}
