import { Injectable } from '@angular/core';
import { DataService } from 'src/app/services/database/data.service';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private currentPost: any;

  constructor(
    private dataService: DataService,
  ) { }

  getPosts(businessId): Promise<any[]> {
    return this.dataService.getPosts(businessId);
  }

  setCurrent(post: any) {
    this.currentPost = post;
  }

  getCurrent() {
    return this.currentPost;
  }
}
