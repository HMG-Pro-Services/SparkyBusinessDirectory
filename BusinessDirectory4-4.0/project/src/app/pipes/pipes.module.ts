import { NgModule } from '@angular/core';
import { DistancePipe } from './distance.pipe';
import { TruncatePipe } from './truncate.pipe';
import { TrimHtmlPipe } from './trim-html.pipe';
import { OrderByPipe } from './order-by.pipe';

@NgModule({
  declarations: [
    DistancePipe,
    TruncatePipe,
    TrimHtmlPipe,
    OrderByPipe,
  ],
  exports: [
    DistancePipe,
    TruncatePipe,
    TrimHtmlPipe,
    OrderByPipe,
  ],
})
export class PipesModule { }
