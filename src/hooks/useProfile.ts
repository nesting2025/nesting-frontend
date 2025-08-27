import { BaseResponseDto } from "../data/dto/common/BaseResponseDto";
import { ProfileRepository } from "../data/repository/profileRepository";
import { useAsync } from "./useAsync";

export const useSetPreference = () => {
    const {
        execute: setPreference,
        loading,
        error,
        data,
        reset
    } = useAsync<BaseResponseDto<null>>(ProfileRepository.setPreference);

    return { setPreference, loading, error, data, reset };
};