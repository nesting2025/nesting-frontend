import { BaseResponseDto } from "../../dto/common/BaseResponseDto";
import { checkValidEmail, checkValidPhone, loginEmail, nicknameCheck, signup, verifyCodeCheck, verifyPhoneSend, verifyEmailSend, resetPassword, findEmail, setPreference, loginKakao, loginNaver } from "../../../api/authApi";
import { VerifyPhoneSendDto } from "../../dto/Request/auth/VerifyPhoneSendDto";
import { LoginEmailDto } from "../../dto/Request/auth/LoginEmailDto";
import { LoginEmailResponseDto } from "../../dto/Response/auth/LoginEmailResponseDto";
import { SignupDto } from "../../dto/Request/auth/SignUpDto";
import { VerifyEamilSendDto } from "../../dto/Request/auth/VerifyEmailSendDto";
import { ResetPasswordDto } from "../../dto/Request/auth/ResetPasswordDto";
import { FindEmailDto } from "../../dto/Request/auth/FindEmailDto";
import { FindEmailResponseDto } from "../../dto/Response/auth/FindEmailResponseDto";
import { setPreferenceDto } from "../../dto/Request/auth/SetPreferenceDto";

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

    verifyEmailSend: async (verifyEmailSendDto: VerifyEamilSendDto): Promise<BaseResponseDto<number>> => {
        return await verifyEmailSend(verifyEmailSendDto);
    },

    verifyCodeCheck: async (authId: string, code: string): Promise<BaseResponseDto<boolean>> => {
        return await verifyCodeCheck(authId, code);
    },

    loginEmail: async (loginEmailDto: LoginEmailDto): Promise<BaseResponseDto<LoginEmailResponseDto>> => {
        return await loginEmail(loginEmailDto);
    },

    signup: async (signupDto: SignupDto): Promise<BaseResponseDto<LoginEmailResponseDto>> => {
        return await signup(signupDto);
    },

    resetPassword: async (resetPasswordDto: ResetPasswordDto): Promise<BaseResponseDto<null>> => {
        return await resetPassword(resetPasswordDto);
    },

    findEmail: async (findEmailDto: FindEmailDto): Promise<BaseResponseDto<FindEmailResponseDto>> => {
        return await findEmail(findEmailDto);
    },

    setPreference: async (setPreferenceDto: setPreferenceDto): Promise<BaseResponseDto<null>> => {
        return await setPreference(setPreferenceDto);
    },

    loginKakao: async (code: string): Promise<BaseResponseDto<LoginEmailResponseDto>> => {
        return await loginKakao(code);
    },

    loginNaver: async (code: string, state: string): Promise<BaseResponseDto<LoginEmailResponseDto>> => {
        return await loginNaver(code, state);
    },
}