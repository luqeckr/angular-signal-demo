import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../product.model';
import { HttpClient } from '@angular/common/http';
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { NgClass } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductDetailsComponent, NgClass, RouterLink],
  templateUrl: './products.component.html',
  // styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products = signal<Product[]>([])
  selectedProduct = signal<Product | undefined>(undefined)

  constructor(
    private _http: HttpClient,
    private route: ActivatedRoute, 
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id']
    
    this._http.get<Product[]>('https://fakestoreapi.com/products')
    .subscribe(r => {
      this.products.set(r)
      if (id) this.selectedProduct.set(r.find(item => item.id == id))
    })
  }

  viewProductDetails(product: Product) {
    this.selectedProduct.set(product)
    // console.log(`selected: ${this.selectedProduct.title}`)
  }
}
