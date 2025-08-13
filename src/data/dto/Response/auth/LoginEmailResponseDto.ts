export interface LoginEmailResponseDto {
    tokenInfo: {
        accessToken: string;
        refreshToken: string;
    };
    userInfo: {
        userId: number;
        name: string;
        email: string;
        phone: string;
        loginType: string;
        role: string;
        createdAt: string;
        nickname: string | null;
        profileImg: string | null;
        characters: string | null;
        goods: string | null;
    };
}