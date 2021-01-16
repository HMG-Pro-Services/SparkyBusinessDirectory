import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { DrupalPost } from './drupal-post.model';

@Injectable()
export class DrupalService {
	constructor(private http: Http) {
	}

	public getPosts(url: string): Observable<DrupalPost[]> {
		return <Observable<DrupalPost[]>>this.http.get(url)
			.map(x => x.json())
			.map(response => {
				return response.map((item: any) => DrupalService.createArticle(item));
			});
	}

	private static parseImgSrc(tag): string {
		const match = tag.match(/<img.+src=(?:"|')(.+?)(?:"|')(?:.+?)>/);
		return match[1];
	}

	private static createArticle(item): DrupalPost {
		return {
			id: item.nid,
			title: item.node_title,
			brief: item.teaser,
			image: DrupalService.parseImgSrc(item.image),
			content: item.body,
			tags: item.tags
		};
	};
}