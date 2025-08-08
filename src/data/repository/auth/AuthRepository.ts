import { BaseResponseDto } from "../../dto/common/BaseResponseDto";
import { checkValidEmail, checkValidPhone, loginEmail, nicknameCheck, signup, verifyCodeCheck, verifyPhoneSend } from "../../../api/authApi";
import { VerifyPhoneSendDto } from "../../dto/Request/auth/VerifyPhoneSendDto";
import { LoginEmailDto } from "../../dto/Request/auth/LoginEmailDto";
import { LoginEmailResponseDto } from "../../dto/Response/auth/LoginEmailResponseDto";
import { SignupDto } from "../../dto/Request/auth/SignUpDto";

export const AuthRepository = {
    nicknameCheck: async (nickname: string): Promise<BaseResponseDto<boolean>> => {
        return await nicknameCheck(nickname);
    },

    checkValidEmail: async (email: string): Promise<BaseResponseDto<boolean>> => {
        return await checkValidEmail(email);
    },

    checkValidPhone: async (phone: string): Promise<BaseResponseDto<boolean>> => {
        return await checkValidPhone(phone);
    },
    
    verifyPhoneSend: async (verifyPhoneSendDto: VerifyPhoneSendDto): Promise<BaseResponseDto<number>> => {
        return await verifyPhoneSend(verifyPhoneSendDto);
    },

    verifyCodeCheck: async (authId: string, code: string): Promise<BaseResponseDto<boolean>> => {
        return await verifyCodeCheck(authId, code);
    },

    loginEmail: async (loginEmailDto: LoginEmailDto): Promise<BaseResponseDto<LoginEmailResponseDto | null>> => {
        return await loginEmail(loginEmailDto);
    },

    signup: async (signupDto: SignupDto): Promise<BaseResponseDto<LoginEmailResponseDto>> => {
        return await signup(signupDto);
    },
}