import { socialLink } from "../../api/accountApi";
import { BaseResponseDto } from "../dto/common/BaseResponseDto";
import { SocialLinkDto } from "../dto/Request/auth/SocialLinkDto";

export const AccountRepository = {
    socialLink: async (socialLinkDto: SocialLinkDto): Promise<BaseResponseDto<null>> => {
        return await socialLink(socialLinkDto);
    },
};