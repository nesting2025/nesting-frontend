import { addCart } from "../../api/cartApi";
import { BaseResponseDto } from "../dto/common/BaseResponseDto";
import { AddCartDto } from "../dto/Request/products/AddCartDto";

export const CartRepository = {
    addCart: async (addCartDto: AddCartDto): Promise<BaseResponseDto<null>> => {
        return await addCart(addCartDto);
    },
}