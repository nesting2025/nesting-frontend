import { BaseResponseDto } from "../data/dto/common/BaseResponseDto"
import { CartRepository } from "../data/repository/CartRepository"
import { useAsync } from "./useAsync"

export const useAddCart = () => {
    const {
        execute: addCart,
        loading,
        error,
        data,
        reset
    } = useAsync<BaseResponseDto<null>>(CartRepository.addCart);

    return { addCart, loading, error, data, reset };
};