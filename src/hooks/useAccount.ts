import { BaseResponseDto } from "../data/dto/common/BaseResponseDto";
import { AccountRepository } from "../data/repository/accountRepository";
import { useAsync } from "./useAsync";

export const useSocialLink = () => {
    const {
        execute: socialLink,
        loading,
        error,
        data,
        reset
    } = useAsync<BaseResponseDto<null>>(AccountRepository.socialLink);

    return { socialLink, loading, error, data, reset };
};