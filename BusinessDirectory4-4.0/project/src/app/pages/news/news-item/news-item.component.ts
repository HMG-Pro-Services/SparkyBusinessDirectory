import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
})
export class NewsItemComponent implements OnInit {
  post: any = {};

  constructor(
    private newsService: NewsService,
  ) { }

  ngOnInit() {
    this.post = this.newsService.getCurrent();
  }
}
