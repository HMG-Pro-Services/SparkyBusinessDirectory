import { Component, OnInit } from '@angular/core';
import { BusinessesService } from 'src/app/services/businesses.service';
import { ServicesService } from '../services.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
})
export class ServicesListComponent implements OnInit {
  services: any[];

  constructor(
    private servicesService: ServicesService,
    private businessService: BusinessesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.servicesService.getServices(this.businessService.getCurrent().$key)
      .then((services) => this.services = services);
  }

  itemTapped(service) {
    this.servicesService.setCurrent(service);
    this.router.navigate([`${service.$key}`], {relativeTo: this.route});
  }
}
