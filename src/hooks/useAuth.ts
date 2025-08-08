import { AuthRepository } from "../data/repository/auth/authRepository";
import { BaseResponseDto } from "../data/dto/common/BaseResponseDto";
import { useAsync } from "./useAsync";
import { LoginEmailResponseDto } from "../data/dto/Response/auth/LoginEmailResponseDto";

export const useCheckNickname = () => {
    const {
        execute: checkNickname,
        loading,
        error,
        data,
    } = useAsync<BaseResponseDto<boolean>>(AuthRepository.nicknameCheck);

    return { checkNickname, loading, error, data };
};

export const useCheckValidEmail = () => {
    const {
        execute: checkValidEmail,
        loading,
        error,
        data,
        reset
    } = useAsync<BaseResponseDto<boolean>>(AuthRepository.checkValidEmail);

    return { checkValidEmail, loading, error, data, reset };
};

export const useCheckValidPhone = () => {
    const {
        execute: checkValidPhone,
        loading,
        error,
        data,
        reset
    } = useAsync<BaseResponseDto<boolean>>(AuthRepository.checkValidPhone);

    return { checkValidPhone, loading, error, data, reset };
};

export const useVerifyPhoneSend = () => {
    const {
        execute: sendVerifyPhone,
        loading,
        error,
        data,
    } = useAsync<BaseResponseDto<number>>(AuthRepository.verifyPhoneSend);

    return { sendVerifyPhone, loading, error, data };
};

export const useVerifyEmailSend =() => {
    const {
        execute: sendVerifyEmail,
        loading,
        error,
        data,
    } = useAsync<BaseResponseDto<number>>(AuthRepository.verifyEmailSend);

    return { sendVerifyEmail, loading, error, data };
}

export const useVerifyCodeCheck = () => {
    const {
        execute: verifyCodeCheck,
        loading,
        error,
        data,
        reset
    } = useAsync<BaseResponseDto<boolean>>(AuthRepository.verifyCodeCheck);

    return { verifyCodeCheck, loading, error, data, reset };
};

export const useLoginEmail = () => {
    const {
        execute: loginEmail,
        loading,
        error,
        data,
        reset
    } = useAsync<BaseResponseDto<LoginEmailResponseDto | null>>(AuthRepository.loginEmail);

    return { loginEmail, loading, error, data, reset };
};

export const useSignup = () => {
    const {
        execute: signup,
        loading,
        error,
        data,
        reset
    } = useAsync<BaseResponseDto<LoginEmailResponseDto>>(AuthRepository.signup);

    return { signup, loading, error, data, reset  };
};