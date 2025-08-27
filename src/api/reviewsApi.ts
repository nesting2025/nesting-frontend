import { BaseResponseDto } from "../data/dto/common/BaseResponseDto";
import { GetReviewsDto } from "../data/dto/Request/products/getReviewsDto";
import { GetReviewsResponseDto } from "../data/dto/Response/products/GetReviewsResponseDto";
import { GetReviewStatisticsResponseDto } from "../data/dto/Response/products/GetReviewStatisticsResponseDto";
import publicClient from "./client";

const REVIEWS_URL = "/nesting/api/v1/reviews";

export const getReviewsProxy = async(getReviewsDto: GetReviewsDto): Promise<BaseResponseDto<GetReviewsResponseDto>> => {
    const response = await publicClient.get<BaseResponseDto<GetReviewsResponseDto>>(`${REVIEWS_URL}/proxy`, {
        params: getReviewsDto
    });

    return response.data;
};

export const getReviewsProduct = async(getReviewsDto: GetReviewsDto): Promise<BaseResponseDto<GetReviewsResponseDto>> => {
    const response = await publicClient.get<BaseResponseDto<GetReviewsResponseDto>>(`${REVIEWS_URL}/${getReviewsDto.productId}`, {
        params: getReviewsDto
    });

    return response.data;
};

export const getReviewStatisticsProxy = async(): Promise<BaseResponseDto<GetReviewStatisticsResponseDto>> => {
    const response = await publicClient.get<BaseResponseDto<GetReviewStatisticsResponseDto>>(`${REVIEWS_URL}/proxy/statistics`);

    return response.data;
};

export const getReviewStatisticsProduct = async(id: string): Promise<BaseResponseDto<GetReviewStatisticsResponseDto>> => {
    const response = await publicClient.get<BaseResponseDto<GetReviewStatisticsResponseDto>>(`${REVIEWS_URL}/${id}/statistics`);

    return response.data;
};