import { BaseResponseDto } from "../data/dto/common/BaseResponseDto"
import { GetProductListResponseDto } from "../data/dto/Response/products/GetProductListResponseDto"
import { ProductsRepository } from "../data/repository/ProductsRepository"
import { useAsync } from "./useAsync"

export const useGetProductList = () => {
    const {
        execute: getProductList,
        loading,
        error,
        data,
        reset
    } = useAsync<BaseResponseDto<GetProductListResponseDto>>(ProductsRepository.getProductList);

    return { getProductList, loading, error, data, reset };
};

