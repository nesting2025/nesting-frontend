import { BaseResponseDto } from "../data/dto/common/BaseResponseDto";
import { GetReviewsDto } from "../data/dto/Request/products/getReviewsDto";
import { GetReviewsResponseDto } from "../data/dto/Response/products/GetReviewsResponseDto";
import publicClient from "./client";

const REVIEWS_URL = "/nesting/api/v1/reviews";

export const getReviewsProxy = async(getReviewsDto: GetReviewsDto): Promise<BaseResponseDto<GetReviewsResponseDto>> => {
    const response = await publicClient.get<BaseResponseDto<GetReviewsResponseDto>>(`${REVIEWS_URL}/proxy`, {
        params: getReviewsDto
    })

    return response.data;
};

export const getReviewsProduct = async(getReviewsDto: GetReviewsDto): Promise<BaseResponseDto<GetReviewsResponseDto>> => {
    const response = await publicClient.get<BaseResponseDto<GetReviewsResponseDto>>(`${REVIEWS_URL}/${getReviewsDto.productId}`, {
        params: getReviewsDto
    })

    return response.data;
};