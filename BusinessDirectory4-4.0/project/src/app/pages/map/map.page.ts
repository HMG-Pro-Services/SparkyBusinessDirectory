import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MapsService } from 'src/app/services/common/maps.service';
import { BusinessesService } from 'src/app/services/businesses.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: any;

  constructor(
    private mapService: MapsService,
    private businessesService: BusinessesService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.mapService.getMapData().then((map) => {
      this.map = map;
    });
  }

  showBusinessDetails(business) {
    this.businessesService.setCurrent(business);
    this.router.navigate([`${business.$key}`]);
  }
}
