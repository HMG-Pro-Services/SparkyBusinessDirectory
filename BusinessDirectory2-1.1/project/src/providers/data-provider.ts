export abstract class DataProvider {
	abstract init(): Promise<boolean>;

	abstract getBusinesses(): Promise<any[]>;

	abstract getCategories(): Promise<any[]>;

	abstract getReviews(businessId: string): Promise<any[]>;

	abstract addReview(businessId: string, review: any): Promise<void>;

	abstract getPosts(businessId: string): Promise<any[]>;

	abstract getProducts(businessId: string): Promise<any[]>;

	abstract getServices(businessId: string): Promise<any[]>;

	abstract getCatalogs(businessId: string): Promise<any[]>;

	abstract getMapCommon(): Promise<any>;

	protected calcRating(rating, newRate) {
		if (!newRate) {
			return rating;
		}
		if (!rating || rating.reviews === 0) {
			rating = {
				value: newRate,
				reviews: 1
			};
		} else {
			let rate = (rating.value * rating.reviews);
			rating = {
				value: (rate + newRate) / (rating.reviews + 1),
				reviews: rating.reviews + 1
			};
		}
		return rating;
	}
}