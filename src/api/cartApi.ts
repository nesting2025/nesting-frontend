import { BaseResponseDto } from "../data/dto/common/BaseResponseDto";
import { AddCartDto } from "../data/dto/Request/products/AddCartDto";
import { GetCartResponseDto } from "../data/dto/Response/products/GetCartResponseDto";
import { authClient } from "./client";

const CART_URL = "/nesting/api/v1/cart";

export const addCart = async(addCartDto: AddCartDto): Promise<BaseResponseDto<null>> => {
    const response = await authClient.post(`${CART_URL}`, addCartDto) as BaseResponseDto<null>;

    return response;
};

export const getCart = async() : Promise<BaseResponseDto<GetCartResponseDto>> => {
    const response = await authClient.get<BaseResponseDto<GetCartResponseDto>>(`${CART_URL}`);

    return response.data;
};

export const modifyCartOption = async(addCartDto: AddCartDto, cartItemId: string): Promise<BaseResponseDto<null>> => {
    const response = await authClient.put(`${CART_URL}/${cartItemId}`, addCartDto) as BaseResponseDto<null>;
    
    return response;
};