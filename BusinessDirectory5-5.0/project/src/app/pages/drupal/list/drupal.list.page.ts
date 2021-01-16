import { Component, OnInit } from '@angular/core';
import { DrupalService } from '../drupal.service';
import { DrupalPost } from '../models/drupal-post.model';

@Component({
  templateUrl: 'drupal.list.html',
})
export class DrupalListPage implements OnInit {
  public posts: DrupalPost[];

  constructor(
    private drupal: DrupalService,
  ) {}

  ngOnInit(): void {
    this.drupal.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
}
