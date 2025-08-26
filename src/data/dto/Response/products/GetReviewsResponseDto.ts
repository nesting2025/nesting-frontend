import { PageableDto } from "./PageableDto";
import { SortDto } from "./SortDto";

export interface GetReviewsResponseDto {
    content: ReviewContent[];
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

export interface ReviewContent {
    userInfo: UserInfo;
    score: number;
    reviewSurveyInfo: ReviewSurveyInfo;
    content: string;
    imageUrl: string[];
    createdAt: string;
}

export interface UserInfo {
    nickname: string;
    profileImg: string;
}

export interface ReviewSurveyInfo {
    satisfaction: string;
    originalComparison: string;
    recommend: string;
}