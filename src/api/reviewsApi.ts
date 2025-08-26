import { BaseResponseDto } from "../data/dto/common/BaseResponseDto";
import { GetReviewsResponseDto } from "../data/dto/Response/products/GetReviewsResponseDto";
import publicClient from "./client";

const REVIEWS_URL = "/nesting/api/v1/reviews";

export const getReviewsProxy = async(page: number, size: number): Promise<BaseResponseDto<GetReviewsResponseDto>> => {
    const response = await publicClient.get<BaseResponseDto<GetReviewsResponseDto>>(`${REVIEWS_URL}/proxy`, {
        params: { page, size }
    })

    return response.data;
};

export const getReviewsProduct = async(page: number, size: number, productId: string): Promise<BaseResponseDto<GetReviewsResponseDto>> => {
    const response = await publicClient.get<BaseResponseDto<GetReviewsResponseDto>>(`${REVIEWS_URL}/${productId}`, {
        params: { page, size }
    })

    return response.data;
};