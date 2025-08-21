import { getProductList } from "../../api/productsApi";
import { BaseResponseDto } from "../dto/common/BaseResponseDto";
import { GetProductListDto } from "../dto/Request/products/GetProductListDto";
import { GetProductListResponseDto } from "../dto/Response/products/GetProductListResponseDto";

export const ProductsRepository = {
    getProductList: async (getProductListDto: GetProductListDto): Promise<BaseResponseDto<GetProductListResponseDto>> => {
        return await getProductList(getProductListDto);
    }
}