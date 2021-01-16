import { Component, OnInit } from '@angular/core';
import { BusinessesService } from 'src/app/services/businesses.service';
import { ModalController } from '@ionic/angular';
import { BusinessesFilterComponent } from '../business/businesses-filter/businesses-filter.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  queryText = '';
  businesses: any[] = [];
  orderBy: 'title' | 'distance' = 'title';
  categories: any[] = [];
  selectedCategory: string = null;

  get isFilterDirty(): boolean {
    return !!this.selectedCategory;
  }

  constructor(
    private businessesService: BusinessesService,
    private modalCtrl: ModalController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.updateList();
  }

  ionViewWillEnter() {
    Promise.all([this.loadCategories()])
      .then(() => this.updateList());
  }

  updateList() {
    this.businessesService.fetchBusinesses(this.queryText, true, this.selectedCategory, this.orderBy)
      .then((businesses) => {
        this.businesses = businesses;
      });
  }

  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: BusinessesFilterComponent,
      componentProps: {
        categories: this.categories,
        orderBy: this.orderBy,
        selectedCategory: this.selectedCategory,
      },
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.selectedCategory = data.selectedCategory;
      this.orderBy = data.orderBy;
      this.updateList();
    }
  }

  goToBusinessDetail(business: any) {
    this.businessesService.setCurrent(business);
    this.router.navigate([`${business.$key}`]);
  }

  clearFilter() {
    this.selectedCategory = null;
    this.updateList();
  }

  selectCategory(event) {
    this.selectedCategory = event.detail.value;
    this.updateList();
  }

  private loadCategories() {
    return this.businessesService.getCategories().then((categories) => {
      this.categories = [{ $key: null, title: 'All' }, ...categories];
    });
  }
}
