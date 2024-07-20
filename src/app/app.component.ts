import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe],
  templateUrl: './app.component.html',
  // styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'signal-sample';
  cartCount = this._svc.totalQuantity
  totalPrice = this._svc.totalPrice
  
  constructor(
    private _svc: AppService
  ) {}
}
