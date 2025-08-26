import { BaseResponseDto } from "../data/dto/common/BaseResponseDto";
import { GetProductListDto } from "../data/dto/Request/products/GetProductListDto";
import { GetFilterPricesResponseDto } from "../data/dto/Response/products/GetFilterPricesResponseDto";
import { GetProductDetailResponseDto } from "../data/dto/Response/products/GetProductDetailResponseDto";
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
};

export const getProductDetail = async (id: string) : Promise<BaseResponseDto<GetProductDetailResponseDto>> => {
    return requestClient(async (client) => {
        const response = await client.get<BaseResponseDto<GetProductDetailResponseDto>>(`${PRODUCTS_URL}/${id}/detail`);

        return response.data;
    })
};

export const postProductView = async (id: string): Promise<BaseResponseDto<null>> => {
    const response = await authClient.post(`${PRODUCTS_URL}/${id}/view`) as BaseResponseDto<null>;

    return response;
};

export const getProductLikeList = async (getProductListDto: GetProductListDto): Promise<BaseResponseDto<GetProductListResponseDto>> => {
    const response = await authClient.get<BaseResponseDto<GetProductListResponseDto>>(`${PRODUCTS_URL}/like`, {
        params: getProductListDto
    });

    return response.data;
};

export const getProductRecentViewList = async (getProductListDto: GetProductListDto): Promise<BaseResponseDto<GetProductListResponseDto>> => {
    const response = await authClient.get<BaseResponseDto<GetProductListResponseDto>>(`${PRODUCTS_URL}/recent-view`, {
        params: getProductListDto
    });

    return response.data;
};