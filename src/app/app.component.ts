import { Component, Signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe, CurrencyPipe],
  templateUrl: './app.component.html',
  // styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'signal-sample';
  cartCount = this._svc.totalQuantity
  totalPrice
  
  constructor(
    private _svc: AppService
  ) {
    this.totalPrice = this._svc.totalPrice
  }
}
