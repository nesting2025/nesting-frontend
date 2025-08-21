import { BaseResponseDto } from "../data/dto/common/BaseResponseDto";
import { GetProductListDto } from "../data/dto/Request/products/GetProductListDto";
import { GetFilterPricesResponseDto } from "../data/dto/Response/products/GetFilterPricesResponseDto";
import { GetProductListResponseDto } from "../data/dto/Response/products/GetProductListResponseDto";
import publicClient from "./client";
import { requestClient } from "./requestClient";

const PRODUCTS_URL = "/nesting/api/v1/products";

export const getProductList = async (getProductListDto: GetProductListDto): Promise<BaseResponseDto<GetProductListResponseDto>> => {
    return requestClient(async (client) => {
        const response = await client.get<BaseResponseDto<GetProductListResponseDto>>(`${PRODUCTS_URL}`, {
            params: getProductListDto
        });
        return response.data;
    })
};

export const getFilterPrices = async (): Promise<BaseResponseDto<GetFilterPricesResponseDto>> => {
    const response = await publicClient.get<BaseResponseDto<GetFilterPricesResponseDto>>(`${PRODUCTS_URL}/filter/prices`);

    return response.data;
};