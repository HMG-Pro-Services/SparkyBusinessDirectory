import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessComponent } from './pages/business/business/business.component';
import { DataResolverService } from './services/common/data-resolver.service';

const routes: Routes = [
  { path: 'home', component: BusinessComponent, resolve: {isCach: DataResolverService} },
  { path: 'map', loadChildren: () => import('./pages/map/map.module').then((m) => m.MapPageModule) },
  { path: 'favorites', loadChildren: () => import('./pages/favorites/favorites.module').then((m) => m.FavoritesPageModule) },
  { path: ':id/wordpress', loadChildren: () => import('./pages/wordpress/wordpress.module').then((m) => m.WordpressModule) },
  { path: ':id/drupal', loadChildren: () => import('./pages/drupal/drupal.module').then((m) => m.DrupalModule) },
  { path: ':id/news', loadChildren: () => import('./pages/news/news.module').then((m) => m.NewsModule) },
  { path: ':id/products', loadChildren: () => import('./pages/products/products.module').then((m) => m.ProductsModule) },
  { path: ':id/services', loadChildren: () => import('./pages/services/services.module').then((m) => m.ServicesModule) },
  { path: ':id/catalogs', loadChildren: () => import('./pages/catalogs/catalogs.module').then((m) => m.CatalogsModule) },
  { path: ':id/reviews', loadChildren: () => import('./pages/reviews/reviews.module').then((m) => m.ReviewsModule) },
  { path: ':id/contacts', loadChildren: () => import('./pages/contacts/contacts.module').then((m) => m.ContactsModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
