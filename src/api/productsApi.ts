import { BaseResponseDto } from "../data/dto/common/BaseResponseDto";
import { GetProductListDto } from "../data/dto/Request/products/GetProductListDto";
import { GetProductListResponseDto } from "../data/dto/Response/products/GetProductListResponseDto";
import { requestClient } from "./requestClient";

const PRODUCTS_URL = "/nesting/api/v1/products";

export const getProductList = async (getProductListDto: GetProductListDto): Promise<BaseResponseDto<GetProductListResponseDto>> => {
    return requestClient(async (client) => {
        const response = await client.get<BaseResponseDto<GetProductListResponseDto>>(`${PRODUCTS_URL}`, {
            params: getProductListDto
        });
        return response.data;
    })
}