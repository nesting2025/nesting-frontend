export interface ResetPasswordDto {
    authId: number;
    email: string;
    password: string;
    keyValue: string;
};