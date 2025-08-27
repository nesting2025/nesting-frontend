export interface GetReviewsDto {
    productId?: string | null;
    page: number;
    size: number;
    onlyPhoto: boolean;
    sortType: string;
}