import { BaseResponseDto } from "../../dto/common/BaseResponseDto";
import { checkValidEmail, checkValidPhone, nicknameCheck, verifyCodeCheck, verifyPhoneSend } from "../../../api/authApi";
import { VerifyPhoneSendDto } from "../../dto/Request/VerifyPhoneSendDto";

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
}