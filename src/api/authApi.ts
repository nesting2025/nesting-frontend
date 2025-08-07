import client from "./client";
import { BaseResponseDto } from "../data/dto/common/BaseResponseDto";
import { VerifyPhoneSendDto } from "../data/dto/Request/VerifyPhoneSendDto";

export const nicknameCheck = async (nickname: string): Promise<BaseResponseDto<boolean>> => {
    const response = await client.post<BaseResponseDto<boolean>>("/auth/valid/nickname", 
        { nickname }
    );
    return response.data;
};

export const checkValidEmail = async (email: string): Promise<BaseResponseDto<boolean>> => {
    const response = await client.post<BaseResponseDto<boolean>>("auth/valid/email",
        { email }
    );
    return response.data;
};

export const verifyPhoneSend = async (verifyPhoneSendDto: VerifyPhoneSendDto): Promise<BaseResponseDto<number>> => {
    const response = await client.post<BaseResponseDto<number>>("/auth/verify/phone/send",
        verifyPhoneSendDto
    );

    return response.data;
}

export const verifyCodeCheck = async (authId: string, code: string): Promise<BaseResponseDto<boolean>> => {
    const response = await client.post<BaseResponseDto<boolean>>(`/auth/verify/${authId}/check`,
        { code }
    );
    return response.data;
}