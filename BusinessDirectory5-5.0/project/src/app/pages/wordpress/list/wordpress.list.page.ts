import { Component, OnInit } from '@angular/core';
import { WordpressService } from './../wordpress.service';
import { WordpressPost } from '../models/wordpress-post.model';

@Component({
  templateUrl: 'wordpress.list.html',
})
export class WordPressListPage implements OnInit {
  public posts: WordpressPost[];

  constructor(
    private wordpressService: WordpressService,
  ) {}

  ngOnInit(): void {
    this.wordpressService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
}
