import { BaseResponseDto } from "../data/dto/common/BaseResponseDto";
import { AddCartDto } from "../data/dto/Request/products/AddCartDto";
import { authClient } from "./client";

const CART_URL = "/nesting/api/v1/cart";

export const addCart = async(addCartDto: AddCartDto): Promise<BaseResponseDto<null>> => {
    const response = await authClient.post(`${CART_URL}`, addCartDto) as BaseResponseDto<null>;

    return response;
};