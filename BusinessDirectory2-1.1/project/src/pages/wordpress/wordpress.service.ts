import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { WordpressPost } from './wordpress-post.model';

@Injectable()
export class WordpressService {
	private http: Http;

	constructor(http: Http) {
		this.http = http;
	}

	public getPosts(url: string): Observable<WordpressPost[]> {
		return this.http.get(url)
			.map(x => x.json())
			.map(response => response.posts.map((item: any) => WordpressService.createArticle(item, url)));
	}

	private static createArticle(item, url): WordpressPost {
		let imageUrl = item.attachments.length > 0 ? item.attachments[0].images.full.url : null;
		let tags = item.tags.map(x => x.title);

		let contentIndex = item.content.indexOf('</p>') + 4;
		let content = contentIndex === -1 ? item.content : item.content.substring(contentIndex);

		return {
			id: item.id,
			title: item.title,
			brief: item.excerpt,
			image: imageUrl,
			date: item.date,
			content: content,
			author: item.author.name,
			tags: tags,
			url: url
		};
	};
}