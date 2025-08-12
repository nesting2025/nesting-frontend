import client from "./client";
import { AxiosError } from "axios";
import { BaseResponseDto } from "../data/dto/common/BaseResponseDto";
import { VerifyPhoneSendDto } from "../data/dto/Request/auth/VerifyPhoneSendDto";
import { LoginEmailDto } from "../data/dto/Request/auth/LoginEmailDto";
import { LoginEmailResponseDto } from "../data/dto/Response/auth/LoginEmailResponseDto";
import { SignupDto } from "../data/dto/Request/auth/SignUpDto";
import { VerifyEamilSendDto } from "../data/dto/Request/auth/VerifyEmailSendDto";
import { ResetPasswordDto } from "../data/dto/Request/auth/ResetPasswordDto";

export const nicknameCheck = async (nickname: string): Promise<BaseResponseDto<boolean>> => {
    const response = await client.post<BaseResponseDto<boolean>>("/auth/valid/nickname", 
        { nickname }
    );
    return response.data;
};

export const checkValidEmail = async (email: string): Promise<BaseResponseDto<boolean>> => {
    const response = await client.post<BaseResponseDto<boolean>>("/auth/valid/email",
        { email }
    );
    return response.data;
};

export const checkValidPhone = async (phone: string): Promise<BaseResponseDto<boolean>> => {
    const response = await client.post<BaseResponseDto<boolean>>("auth/valid/phone",
        { phone }
    );
    return response.data;
};

export const verifyPhoneSend = async (verifyPhoneSendDto: VerifyPhoneSendDto): Promise<BaseResponseDto<number>> => {
    const response = await client.post<BaseResponseDto<number>>("/auth/verify/phone/send",
        verifyPhoneSendDto
    );

    return response.data;
};

export const verifyEmailSend = async (verifyEmailSendDto: VerifyEamilSendDto): Promise<BaseResponseDto<number>> => {
  const response = await client.post<BaseResponseDto<number>>("/auth/verify/email/send",
    verifyEmailSendDto
  );

  return response.data;
}

export const verifyCodeCheck = async (authId: string, code: string): Promise<BaseResponseDto<boolean>> => {
    const response = await client.post<BaseResponseDto<boolean>>(`/auth/verify/${authId}/check`,
        { code }
    );
    return response.data;
};

export const loginEmail = async (loginEmailDto: LoginEmailDto): Promise<BaseResponseDto<LoginEmailResponseDto>> => {
  const response = await client.post<BaseResponseDto<LoginEmailResponseDto>>("/auth/login/email",
    loginEmailDto
  );
  return response.data;
};

export const signup = async(signupDto: SignupDto): Promise<BaseResponseDto<LoginEmailResponseDto>> => {
  const response = await client.post<BaseResponseDto<LoginEmailResponseDto>>("/auth/sign-up",
    signupDto
  );
  return response.data;
}

export const resetPassword = async(resetPasswordDto: ResetPasswordDto): Promise<BaseResponseDto<null>> => {
  const response = await client.patch<BaseResponseDto<null>>("/auth/password/reset",
    resetPasswordDto
  );
  return response.data;
}