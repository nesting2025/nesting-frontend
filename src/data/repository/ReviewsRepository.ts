import { getReviewsProduct, getReviewsProxy } from "../../api/reviewsApi";
import { BaseResponseDto } from "../dto/common/BaseResponseDto";
import { GetReviewsResponseDto } from "../dto/Response/products/GetReviewsResponseDto";

export const ReviewsRepository = {
    getReviewsProxy : async(page: number, size: number): Promise<BaseResponseDto<GetReviewsResponseDto>> =>{
        return await getReviewsProxy(page, size);
    },

    getReviewsProduct: async(page: number, size: number, productId: string): Promise<BaseResponseDto<GetReviewsResponseDto>> => {
        return await getReviewsProduct(page, size, productId);
    },
}