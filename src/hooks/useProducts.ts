import { BaseResponseDto } from "../data/dto/common/BaseResponseDto"
import { GetFilterPricesResponseDto } from "../data/dto/Response/products/GetFilterPricesResponseDto";
import { GetProductListResponseDto } from "../data/dto/Response/products/GetProductListResponseDto"
import { TypeResponseDto } from "../data/dto/Response/products/TypeResponseDto";
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

export const useGetFilterPrices = () => {
    const {
        execute: getFilterPrices,
        loading,
        error,
        data,
        reset
    } = useAsync<BaseResponseDto<GetFilterPricesResponseDto>>(ProductsRepository.getFilterPrices);

    return { getFilterPrices, loading, error, data, reset };
};

export const useGetFilterTypes = () => {
    const {
        execute: getFilterTypes,
        loading,
        error,
        data,
        reset
    } = useAsync<BaseResponseDto<TypeResponseDto[]>>(ProductsRepository.getFilterTypes);

    return { getFilterTypes, loading, error, data, reset };
};