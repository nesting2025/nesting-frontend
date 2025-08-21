export interface ProductDto {
    id: string;
    name: string;
    tag: string[];
    prefixTag: string[];
    price: number;
    discountPercent: number;
    thumbnail: string;
    soldOut: boolean;
    likeCount: number;
    isLiked: boolean
}

export interface PageableDto {
    pageNumber: number;
    pageSize: number;
    sort: {
        sorted: boolean;
        empty: boolean;
        unsorted: boolean
    };
    offset: number;
    paged: boolean;
    unpaged: boolean
}

export interface GetProductListResponseDto {
    content : ProductDto[];
    pageable: PageableDto;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
        sorted: boolean;
        empty: boolean;
        unsorted: boolean
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}