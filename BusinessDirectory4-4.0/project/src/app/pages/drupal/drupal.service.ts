import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Config } from '../../../config';
import { DrupalPost } from './models/drupal-post.model';

@Injectable({
  providedIn: 'root',
})
export class DrupalService {
  private articles: DrupalPost[];

  constructor(
    private http: HttpClient,
  ) { }

  public getPosts(): Observable<DrupalPost[]> {
    return this.http.get(Config.drupalApiUrl).pipe(
      map((response: any) => {
        this.articles = response.map((item: any) => this.createArticle(item));
        return this.articles;
      }),
    ) as Observable<DrupalPost[]>;
  }

  public getPost(id: string): Observable<DrupalPost> {
    return this.http.get(Config.drupalApiUrl).pipe(
      map((response: any) => {
        this.articles = response.map((item: any) => this.createArticle(item));
        return this.articles.find((a) => a.id === id);
      }),
    ) as Observable<DrupalPost>;
  }

  private parseImgSrc(tag): string {
    const match = tag.match(/<img.+src=(?:"|')(.+?)(?:"|')(?:.+?)>/);
    return match[1];
  }

  private createArticle(item): DrupalPost {
    return {
      id: item.nid,
      title: item.node_title,
      brief: item.teaser,
      image: this.parseImgSrc(item.image),
      content: item.body,
      tags: item.tags,
    };
  }
}
