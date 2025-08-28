import { addCart, getCart } from "../../api/cartApi";
import { BaseResponseDto } from "../dto/common/BaseResponseDto";
import { AddCartDto } from "../dto/Request/products/AddCartDto";
import { GetCartResponseDto } from "../dto/Response/products/GetCartResponseDto";

export const CartRepository = {
    addCart: async (addCartDto: AddCartDto): Promise<BaseResponseDto<null>> => {
        return await addCart(addCartDto);
    },

    getCart: async(): Promise<BaseResponseDto<GetCartResponseDto>> => {
        return await getCart();
    },
}