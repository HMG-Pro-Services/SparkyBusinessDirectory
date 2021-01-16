import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BusinessesService } from 'src/app/services/businesses.service';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit {
  posts: any[];

  constructor(
    private newsService: NewsService,
    private businessService: BusinessesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.newsService.getPosts(this.businessService.getCurrent().$key)
      .then((posts) => {
        this.posts = posts;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  itemTapped(post) {
    this.newsService.setCurrent(post);
    this.router.navigate([`${post.$key}`], {relativeTo: this.route});
  }
}
