import { Component, OnInit } from '@angular/core';
import { InAppBrowserService } from 'src/app/services/common/in-app-browser.service';
import { CatalogsService } from '../catalogs.service';

@Component({
  selector: 'app-catalogs-item',
  templateUrl: './catalogs-item.component.html',
  styleUrls: ['./catalogs-item.component.scss'],
})
export class CatalogsItemComponent implements OnInit {
  catalog: any;

  constructor(
    private browser: InAppBrowserService,
    private catalogsService: CatalogsService,
  ) { }

  ngOnInit() {
    this.catalog = this.catalogsService.getCurrent();
  }

  open() {
    this.browser.open(this.catalog.url);
  }

  openPdf() {
    this.browser.open(this.catalog.pdf);
  }
}
