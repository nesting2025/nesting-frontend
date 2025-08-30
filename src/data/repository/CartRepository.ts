import { addCart, deleteCartItem, getCart, modifyCartOption } from "../../api/cartApi";
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

    modifyCartOption: async (addCartDto: AddCartDto, cartItemId: string): Promise<BaseResponseDto<null>> => {
        return await modifyCartOption(addCartDto, cartItemId);
    },

    deleteCartItem: async (cartItemId: string): Promise<BaseResponseDto<null>> => {
        return await deleteCartItem(cartItemId);
    },
}