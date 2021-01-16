import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-businesses-filter',
  templateUrl: './businesses-filter.component.html',
  styleUrls: ['./businesses-filter.component.scss'],
})
export class BusinessesFilterComponent implements OnInit {
  @Input() categories: any[];
  @Input() selectedCategory: string;
  @Input() orderBy: string;

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() { }

  applyFilters() {
    this.dismiss({
      selectedCategory: this.selectedCategory,
      orderBy: this.orderBy,
    });
  }

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }
}
