import client from "./client";
import { AxiosError } from "axios";
import { BaseResponseDto } from "../data/dto/common/BaseResponseDto";
import { VerifyPhoneSendDto } from "../data/dto/Request/auth/VerifyPhoneSendDto";
import { LoginEmailDto } from "../data/dto/Request/auth/LoginEmailDto";
import { LoginEmailResponseDto } from "../data/dto/Response/auth/LoginEmailResponseDto";
import { SignupDto } from "../data/dto/Request/auth/SignUpDto";

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

export const verifyCodeCheck = async (authId: string, code: string): Promise<BaseResponseDto<boolean>> => {
    const response = await client.post<BaseResponseDto<boolean>>(`/auth/verify/${authId}/check`,
        { code }
    );
    return response.data;
};

// export const loginEmail = async (loginEmailDto: LoginEmailDto): Promise<BaseResponseDto<LoginEmailResponseDto | null>> => {
//   const response = await client.post<BaseResponseDto<LoginEmailResponseDto | null>>("/auth/login/email",
//     loginEmailDto
//   );
//   return response.data;
// };

export const loginEmail = async (
  loginEmailDto: LoginEmailDto
): Promise<BaseResponseDto<LoginEmailResponseDto | null>> => {
  try {
    const response = await client.post<BaseResponseDto<LoginEmailResponseDto | null>>(
      "/auth/login/email",
      loginEmailDto
    );
    return response.data;
  } catch (error) {
    // AxiosError 타입 확인
    if (error instanceof AxiosError) {
      // 서버가 JSON 응답 바디를 내려주면 (BaseResponseDto 형태)
      if (error.response && error.response.data) {
        // 그대로 반환 (data 키가 없는 경우도 커버)
        return error.response.data;
      }
      // 만약 서버에서 바디가 없거나 AxiosError만 있을 때 예시값 반환
      return {
        code: 'FAIL',
        message: error.message,
        data: null,
        localDateTime: new Date().toISOString(),
      };
    }
    throw error; // 기타 에러는 다시 throw
  }
};

export const signup = async(signupDto: SignupDto): Promise<BaseResponseDto<LoginEmailResponseDto>> => {
  const response = await client.post<BaseResponseDto<LoginEmailResponseDto>>("/auth/sign-up",
    signupDto
  );
  return response.data;
}