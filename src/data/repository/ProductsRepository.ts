import { getFilterPrices, getFilterTypes, getProductDetail, getProductLikeList, getProductList, getProductRecentViewList, postProductView, toggleProductLike } from "../../api/productsApi";
import { BaseResponseDto } from "../dto/common/BaseResponseDto";
import { GetProductListDto } from "../dto/Request/products/GetProductListDto";
import { GetFilterPricesResponseDto } from "../dto/Response/products/GetFilterPricesResponseDto";
import { GetProductDetailResponseDto } from "../dto/Response/products/GetProductDetailResponseDto";
import { GetProductListResponseDto } from "../dto/Response/products/GetProductListResponseDto";
import { TypeResponseDto } from "../dto/Response/products/TypeResponseDto";

export const ProductsRepository = {
    getProductList: async (getProductListDto: GetProductListDto): Promise<BaseResponseDto<GetProductListResponseDto>> => {
        return await getProductList(getProductListDto);
    },

    getFilterPrices: async (): Promise<BaseResponseDto<GetFilterPricesResponseDto>> => {
        return await getFilterPrices();
    },

    getFilterTypes: async (): Promise<BaseResponseDto<TypeResponseDto[]>> => {
        return await getFilterTypes();
    },

    toggleProductLike: async (id: string): Promise<BaseResponseDto<boolean>> => {
        return await toggleProductLike(id);
    },

    getProductDetail: async (id: string): Promise<BaseResponseDto<GetProductDetailResponseDto>> => {
        return await getProductDetail(id);
    },

    postProductView: async (id: string): Promise<BaseResponseDto<null>> => {
        return await postProductView(id);
    },

    getProductLikeList: async (getProductListDto: GetProductListDto): Promise<BaseResponseDto<GetProductListResponseDto>> => {
        return await getProductLikeList(getProductListDto);
    },

    getProductRecentViewList: async (getProductListDto: GetProductListDto): Promise<BaseResponseDto<GetProductListResponseDto>> => {
        return await getProductRecentViewList(getProductListDto);
    },
}