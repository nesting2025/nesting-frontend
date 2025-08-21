import { getFilterPrices, getProductList } from "../../api/productsApi";
import { BaseResponseDto } from "../dto/common/BaseResponseDto";
import { GetProductListDto } from "../dto/Request/products/GetProductListDto";
import { GetFilterPricesResponseDto } from "../dto/Response/products/GetFilterPricesResponseDto";
import { GetProductListResponseDto } from "../dto/Response/products/GetProductListResponseDto";

export const ProductsRepository = {
    getProductList: async (getProductListDto: GetProductListDto): Promise<BaseResponseDto<GetProductListResponseDto>> => {
        return await getProductList(getProductListDto);
    },

    getFilterPrices: async (): Promise<BaseResponseDto<GetFilterPricesResponseDto>> => {
        return await getFilterPrices();
    },
}