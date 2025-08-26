import { BaseResponseDto } from "../data/dto/common/BaseResponseDto"
import { GetReviewsResponseDto } from "../data/dto/Response/products/GetReviewsResponseDto"
import { ReviewsRepository } from "../data/repository/ReviewsRepository"
import { useAsync } from "./useAsync"

export const useGetReviewsProxy = () => {
    const {
        execute: getReviewsProxy,
        loading,
        error,
        data,
        reset
    } = useAsync<BaseResponseDto<GetReviewsResponseDto>>(ReviewsRepository.getReviewsProxy);

    return { getReviewsProxy, loading, error, data, reset };
};

export const useGetReviewsProduct = () => {
    const {
        execute: getReviewsProduct,
        loading,
        error,
        data,
        reset
    } = useAsync<BaseResponseDto<GetReviewsResponseDto>>(ReviewsRepository.getReviewsProduct);

    return { getReviewsProduct, loading, error, data, reset };
};