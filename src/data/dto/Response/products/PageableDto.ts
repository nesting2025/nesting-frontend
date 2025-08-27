import { SortDto } from "./SortDto";

export interface PageableDto {
    pageNumber: number;
    pageSize: number;
    sort: SortDto;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}