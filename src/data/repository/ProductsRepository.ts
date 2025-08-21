import { getFilterPrices, getFilterTypes, getProductList } from "../../api/productsApi";
import { BaseResponseDto } from "../dto/common/BaseResponseDto";
import { GetProductListDto } from "../dto/Request/products/GetProductListDto";
import { GetFilterPricesResponseDto } from "../dto/Response/products/GetFilterPricesResponseDto";
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
}