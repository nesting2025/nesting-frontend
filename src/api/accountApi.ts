import { BaseResponseDto } from "../data/dto/common/BaseResponseDto";
import { SocialLinkDto } from "../data/dto/Request/auth/SocialLinkDto";
import { authClient } from "./client";

const ACCOUNT_URL = "/users/api/v1/account";

export const socialLink = async (socialLinkDto: SocialLinkDto): Promise<BaseResponseDto<null>> => {
  const response = await authClient.post(`${ACCOUNT_URL}/social-link`, socialLinkDto) as BaseResponseDto<null>;

  return response;
};
