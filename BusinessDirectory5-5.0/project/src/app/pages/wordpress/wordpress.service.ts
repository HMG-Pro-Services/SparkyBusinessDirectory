import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from '../../../config';
import { WordpressPost } from './models/wordpress-post.model';

@Injectable({
  providedIn: 'root',
})
export class WordpressService {
  private articles: WordpressPost[];

  constructor(
    private http: HttpClient,
  ) { }

  getPosts(): Observable<WordpressPost[]> {
    return this.http.get(Config.wordpressApiUrl).pipe(
      map((response: any) => {
        this.articles = response.posts.map((item: any) => this.createArticle(item));
        return this.articles;
      }),
    );
  }

  getPost(id: string): Observable<WordpressPost> {
    return this.http.get(Config.wordpressApiUrl).pipe(
      map((response: any) => {
        this.articles = response.posts.map((item: any) => this.createArticle(item));
        return this.articles.find((a) => a.id === parseInt(id, 10));
      }),
    );
  }

  private createArticle(item): WordpressPost {
    const imageUrl = item.attachments.length > 0 ? item.attachments[0].images.full.url : null;
    const tags = item.tags.map((x) => x.title);

    const contentIndex = item.content.indexOf('</p>') + 4;
    const content = contentIndex === -1 ? item.content : item.content.substring(contentIndex);

    return {
      id: item.id,
      title: item.title,
      brief: item.excerpt,
      image: imageUrl,
      date: item.date,
      content: content,
      author: item.author.name,
      tags: tags,
      url: Config.wordpressApiUrl,
    };
  }
}
