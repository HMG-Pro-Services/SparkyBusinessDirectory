import { Component, OnInit } from '@angular/core';
import { InAppBrowserService } from 'src/app/services/common/in-app-browser.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.scss'],
})
export class ProductsItemComponent implements OnInit {
  product: any;

  constructor(
    private browser: InAppBrowserService,
    private productsService: ProductsService,
  ) { }

  ngOnInit() {
    this.product = this.productsService.getCurrent();
  }

  buyNow() {
    this.browser.open(this.product.url);
  }
}
