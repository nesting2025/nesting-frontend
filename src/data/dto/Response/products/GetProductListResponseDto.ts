import { PageableDto } from "./PageableDto";
import { SortDto } from "./SortDto";

export interface ProductDto {
    id: string;
    name: string;
    tag: string[];
    prefixTag: string[];
    price: number;
    discountedPrice: number;
    discountPercent: number;
    thumbnail: string;
    soldOut: boolean;
    likeCount: number;
    isLiked: boolean
}

export interface GetProductListResponseDto {
    content : ProductDto[];
    pageable: PageableDto;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: SortDto;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}