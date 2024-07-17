import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { HttpClient } from '@angular/common/http';
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductDetailsComponent, NgClass],
  templateUrl: './products.component.html',
  // styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products: Product[] = []
  selectedProduct: Product | undefined

  constructor(
    private _http: HttpClient
  ) {}

  ngOnInit(): void {
    this._http.get<Product[]>('https://fakestoreapi.com/products').subscribe(r => this.products = r)
  }

  viewProductDetails(product: Product) {
    this.selectedProduct = product
    console.log(`selected: ${this.selectedProduct.title}`)
  }
}
