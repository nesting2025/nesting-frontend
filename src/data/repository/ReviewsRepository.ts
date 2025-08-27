import { getReviewsProduct, getReviewsProxy, getReviewStatisticsProduct, getReviewStatisticsProxy } from "../../api/reviewsApi";
import { BaseResponseDto } from "../dto/common/BaseResponseDto";
import { GetReviewsDto } from "../dto/Request/products/getReviewsDto";
import { GetReviewsResponseDto } from "../dto/Response/products/GetReviewsResponseDto";
import { GetReviewStatisticsResponseDto } from "../dto/Response/products/GetReviewStatisticsResponseDto";

export const ReviewsRepository = {
    getReviewsProxy : async(getReviewsDto: GetReviewsDto): Promise<BaseResponseDto<GetReviewsResponseDto>> => {
        return await getReviewsProxy(getReviewsDto);
    },

    getReviewsProduct: async(getReviewsDto: GetReviewsDto): Promise<BaseResponseDto<GetReviewsResponseDto>> => {
        return await getReviewsProduct(getReviewsDto);
    },

    getReviewStatisticsProxy: async(): Promise<BaseResponseDto<GetReviewStatisticsResponseDto>> => {
        return await getReviewStatisticsProxy();
    },

    getReviewStatisticsProduct: async(id: string): Promise<BaseResponseDto<GetReviewStatisticsResponseDto>> => {
        return await getReviewStatisticsProduct(id);
    },
}