import { BaseResponseDto } from "../data/dto/common/BaseResponseDto";
import { GetProductListDto } from "../data/dto/Request/products/GetProductListDto";
import { GetFilterPricesResponseDto } from "../data/dto/Response/products/GetFilterPricesResponseDto";
import { GetProductListResponseDto } from "../data/dto/Response/products/GetProductListResponseDto";
import { TypeResponseDto } from "../data/dto/Response/products/TypeResponseDto";
import publicClient, { authClient } from "./client";
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

export const getFilterTypes = async (): Promise<BaseResponseDto<TypeResponseDto[]>> => {
    const response = await publicClient.get<BaseResponseDto<TypeResponseDto[]>>(`${PRODUCTS_URL}/filter/types`);

    return response.data;
};

export const toggleProductLike = async (id: string): Promise<BaseResponseDto<boolean>> => {
    const response = await authClient.post(`${PRODUCTS_URL}/${id}/like`) as BaseResponseDto<boolean>;

    return response;
}