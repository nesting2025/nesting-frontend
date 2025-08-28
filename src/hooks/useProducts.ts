import { BaseResponseDto } from "../data/dto/common/BaseResponseDto"
import { GetFilterPricesResponseDto } from "../data/dto/Response/products/GetFilterPricesResponseDto";
import { GetProductDetailResponseDto } from "../data/dto/Response/products/GetProductDetailResponseDto";
import { GetProductListResponseDto } from "../data/dto/Response/products/GetProductListResponseDto"
import { LoadProxyRequstDto } from "../data/dto/Response/products/LoadProxyRequestDto";
import { TypeResponseDto } from "../data/dto/Response/products/TypeResponseDto";
import { ProductsRepository } from "../data/repository/ProductsRepository"
import { useAsync } from "./useAsync"
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";

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

export const useToggleProductLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string): Promise<BaseResponseDto<boolean>> => 
      ProductsRepository.toggleProductLike(productId),
    onSuccess: () => {
        // 찜한 상품, 최근 본 상품 리스트 갱신
        queryClient.invalidateQueries({ queryKey: ["productLikeList"] });
        queryClient.invalidateQueries({ queryKey: ["productRecentViewList"] });
    }
  });
};

export const useGetProductDetail = () => {
    const {
        execute: getProductDetail,
        loading,
        error,
        data,
        reset
    } = useAsync<BaseResponseDto<GetProductDetailResponseDto>>(ProductsRepository.getProductDetail);

    return { getProductDetail, loading, error, data, reset };
};

export const usePostProductView = () => {
    const {
        execute: postProductView,
        loading,
        error,
        data,
        reset
    } = useAsync<BaseResponseDto<null>>(ProductsRepository.postProductView);

    return { postProductView, loading, error, data, reset };
};

export const useGetProductLikeList = (
  params: { page: string; size: string; includeSoldOut: string },
  enabled: boolean = false
) => {
  return useQuery<BaseResponseDto<GetProductListResponseDto>>({
    queryKey: ["productLikeList", params],
    queryFn: () => ProductsRepository.getProductLikeList(params),
    enabled,
  });
};

export const useGetProductRecentViewList = (
  params: { page: string; size: string; includeSoldOut: string },
  enabled: boolean = false
) => {
  return useQuery<BaseResponseDto<GetProductListResponseDto>>({
    queryKey: ["productRecentViewList", params],
    queryFn: () => ProductsRepository.getProductRecentViewList(params),
    enabled,
  });
};

export const useLoadProxyRequst = () => {
  const {
    execute: loadProxyRequst,
    loading,
    error,
    data,
    reset
  } = useAsync<BaseResponseDto<LoadProxyRequstDto>>(ProductsRepository.loadProxyRequst);

  return { loadProxyRequst, loading, error, data, reset };
};

export const usePostProxyRequest = () => {
  const {
    execute: postProxyRequest,
    loading,
    error,
    data,
    reset
  } = useAsync<BaseResponseDto<null>>(ProductsRepository.postProxyRequest);

  return { postProxyRequest, loading, error, data, reset };
};