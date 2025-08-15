import publicClient from "./client";
import { authClient } from "./client";
import { BaseResponseDto } from "../data/dto/common/BaseResponseDto";
import { VerifyPhoneSendDto } from "../data/dto/Request/auth/VerifyPhoneSendDto";
import { LoginEmailDto } from "../data/dto/Request/auth/LoginEmailDto";
import { LoginEmailResponseDto } from "../data/dto/Response/auth/LoginEmailResponseDto";
import { SignupDto } from "../data/dto/Request/auth/SignUpDto";
import { VerifyEamilSendDto } from "../data/dto/Request/auth/VerifyEmailSendDto";
import { ResetPasswordDto } from "../data/dto/Request/auth/ResetPasswordDto";
import { FindEmailDto } from "../data/dto/Request/auth/FindEmailDto";
import { FindEmailResponseDto } from "../data/dto/Response/auth/FindEmailResponseDto";
import { setPreferenceDto } from "../data/dto/Request/auth/SetPreferenceDto";
import { SocialLinkDto } from "../data/dto/Request/auth/SocialLinkDto";
import { TokenReissueResponseDto } from "../data/dto/Response/auth/TokenReissueResponseDto";

export const nicknameCheck = async (nickname: string): Promise<BaseResponseDto<boolean>> => {
    const response = await publicClient.post<BaseResponseDto<boolean>>("/auth/valid/nickname", 
        { nickname }
    );
    return response.data;
};

export const checkValidEmail = async (email: string): Promise<BaseResponseDto<boolean>> => {
    const response = await publicClient.post<BaseResponseDto<boolean>>("/auth/valid/email",
        { email }
    );
    return response.data;
};

export const checkValidPhone = async (phone: string): Promise<BaseResponseDto<boolean>> => {
    const response = await publicClient.post<BaseResponseDto<boolean>>("/auth/valid/phone",
        { phone }
    );
    return response.data;
};

export const verifyPhoneSend = async (verifyPhoneSendDto: VerifyPhoneSendDto): Promise<BaseResponseDto<number>> => {
    const response = await publicClient.post<BaseResponseDto<number>>("/auth/verify/phone/send",
        verifyPhoneSendDto
    );

    return response.data;
};

export const verifyEmailSend = async (verifyEmailSendDto: VerifyEamilSendDto): Promise<BaseResponseDto<number>> => {
  const response = await publicClient.post<BaseResponseDto<number>>("/auth/verify/email/send",
    verifyEmailSendDto
  );

  return response.data;
};

export const verifyCodeCheck = async (authId: string, code: string): Promise<BaseResponseDto<boolean>> => {
    const response = await publicClient.post<BaseResponseDto<boolean>>(`/auth/verify/${authId}/check`,
        { code }
    );
    return response.data;
};

export const loginEmail = async (loginEmailDto: LoginEmailDto): Promise<BaseResponseDto<LoginEmailResponseDto>> => {
  const response = await publicClient.post<BaseResponseDto<LoginEmailResponseDto>>("/auth/login/email",
    loginEmailDto
  );
  return response.data;
};

export const signup = async (signupDto: SignupDto): Promise<BaseResponseDto<LoginEmailResponseDto>> => {
  const response = await publicClient.post<BaseResponseDto<LoginEmailResponseDto>>("/auth/sign-up",
    signupDto
  );
  return response.data;
};

export const resetPassword = async (resetPasswordDto: ResetPasswordDto): Promise<BaseResponseDto<null>> => {
  const response = await publicClient.patch("/auth/password/reset", resetPasswordDto) as BaseResponseDto<null>;

  return response;
};

export const findEmail = async (findEmailDto: FindEmailDto): Promise<BaseResponseDto<FindEmailResponseDto>> => {
  const response = await publicClient.post<BaseResponseDto<FindEmailResponseDto>>("/auth/find/email", findEmailDto);

  return response.data;
};

export const setPreference = async (setPreferenceDto: setPreferenceDto): Promise<BaseResponseDto<null>> => {
  const response = await authClient.put("/profile", setPreferenceDto) as BaseResponseDto<null>;

  return response;
};

export const loginKakao = async (code: string): Promise<BaseResponseDto<LoginEmailResponseDto>> => {
  const response = await publicClient.post(`/auth/login/kakao?code=${code}`) as BaseResponseDto<LoginEmailResponseDto>;

  return response;
};

export const loginNaver = async (code: string, state: string): Promise<BaseResponseDto<LoginEmailResponseDto>> => {
  const response = await publicClient.post(`/auth/login/naver?code=${code}&state=${state}`) as BaseResponseDto<LoginEmailResponseDto>;

  return response;
};

export const socialLink = async (socialLinkDto: SocialLinkDto): Promise<BaseResponseDto<null>> => {
  const response = await authClient.post("/account/social-link", socialLinkDto) as BaseResponseDto<null>;

  return response;
};

export const tokenReissue = async (refreshToken: string): Promise<BaseResponseDto<TokenReissueResponseDto>> => {
  const response = await publicClient.post("/auth/reissue", { refreshToken }) as BaseResponseDto<TokenReissueResponseDto>;

  return response;
}