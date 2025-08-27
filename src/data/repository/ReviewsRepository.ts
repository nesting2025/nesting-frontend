import { getReviewsProduct, getReviewsProxy } from "../../api/reviewsApi";
import { BaseResponseDto } from "../dto/common/BaseResponseDto";
import { GetReviewsDto } from "../dto/Request/products/getReviewsDto";
import { GetReviewsResponseDto } from "../dto/Response/products/GetReviewsResponseDto";

export const ReviewsRepository = {
    getReviewsProxy : async(getReviewsDto: GetReviewsDto): Promise<BaseResponseDto<GetReviewsResponseDto>> =>{
        return await getReviewsProxy(getReviewsDto);
    },

    getReviewsProduct: async(getReviewsDto: GetReviewsDto): Promise<BaseResponseDto<GetReviewsResponseDto>> => {
        return await getReviewsProduct(getReviewsDto);
    },
}