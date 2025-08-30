import { BaseResponseDto } from "../data/dto/common/BaseResponseDto"
import { GetCartResponseDto } from "../data/dto/Response/products/GetCartResponseDto";
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

export const useGetCart = () => {
    const {
        execute: getCart,
        loading,
        error,
        data,
        reset
    } = useAsync<BaseResponseDto<GetCartResponseDto>>(CartRepository.getCart);

    return { getCart, loading, error, data, reset };
};

export const useModifyCartOption = () => {
    const {
        execute: modifyCartOption,
        loading,
        error,
        data,
        reset
    } = useAsync<BaseResponseDto<null>>(CartRepository.modifyCartOption);

    return { modifyCartOption, loading, error, data, reset };
};

export const useDeleteCartItem = () => {
    const {
        execute: deleteCartItem,
        loading,
        error,
        data,
        reset
    } = useAsync<BaseResponseDto<null>>(CartRepository.deleteCartItem);

    return { deleteCartItem, loading, error, data, reset };
};