import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { BusinessesService } from 'src/app/services/businesses.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  public products: any[];

  constructor(
    private productsService: ProductsService,
    private businessService: BusinessesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.productsService.getProducts(this.businessService.getCurrent().$key)
      .then((products) => this.products = products);
  }

  itemTapped(product) {
    this.productsService.setCurrent(product);
    this.router.navigate([`${product.$key}`], {relativeTo: this.route});
  }
}
