import { Component, OnInit } from '@angular/core';
import { InAppBrowserService } from 'src/app/services/common/in-app-browser.service';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-services-item',
  templateUrl: './services-item.component.html',
  styleUrls: ['./services-item.component.scss'],
})
export class ServicesItemComponent implements OnInit {
  service: any;

  constructor(
    private browser: InAppBrowserService,
    private servicesService: ServicesService,
  ) { }

  ngOnInit() {
    this.service = this.servicesService.getCurrent();
  }

  open() {
    this.browser.open(this.service.url);
  }
}
