export interface SignupDto {
    name: string;
    email: string;
    phone: string;
    password: string;
    loginType: string;
    termAgreement: {
        ageAgreement: boolean;
        personalInfoAgreement: boolean;
        marketingAgreement: boolean;
        ecommerceAgreement: boolean;
    };
    marketingReceiveInfo: {
        email: boolean;
        sms: boolean;
    };
    authId: number;
}