import { Component, OnInit } from '@angular/core';
import { DrupalService } from '../drupal.service';

import { DrupalPost } from '../models/drupal-post.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'drupal.item.html',
})
export class DrupalItemPage implements OnInit {
  post: DrupalPost;

  constructor(
    private activatedRoute: ActivatedRoute,
    private drupal: DrupalService,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const { id } = params;
      this.drupal.getPost(id).subscribe((item) => {
        this.post = item;
      });
    });
  }
}
