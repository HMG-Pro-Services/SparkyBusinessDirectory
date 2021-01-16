import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CatalogsService } from '../catalogs.service';
import { BusinessesService } from 'src/app/services/businesses.service';

@Component({
  selector: 'app-catalogs-list',
  templateUrl: './catalogs-list.component.html',
  styleUrls: ['./catalogs-list.component.scss'],
})
export class CatalogsListComponent implements OnInit {
  catalogs: any[];

  constructor(
    private businessService: BusinessesService,
    private router: Router,
    private catalogsService: CatalogsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.catalogsService.getCatalogs(this.businessService.getCurrent().$key)
      .then((catalogs) => this.catalogs = catalogs);
  }

  itemTapped(catalog) {
    this.catalogsService.setCurrent(catalog);
    this.router.navigate([`${catalog.$key}`], {relativeTo: this.route});
  }
}
