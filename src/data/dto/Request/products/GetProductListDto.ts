export interface GetProductListDto {
    page: string;
    size: string;
    sortType: string;
    includeSoldOut: string;
    category: string | null;
    type: string | null;
    price: string | null;
    search: string | null;
}