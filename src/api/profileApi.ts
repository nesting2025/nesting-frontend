import { BaseResponseDto } from "../data/dto/common/BaseResponseDto";
import { setPreferenceDto } from "../data/dto/Request/auth/SetPreferenceDto";
import { authClient } from "./client";

const PROFILE_URL = "/users/api/v1/profile";

export const setPreference = async (setPreferenceDto: setPreferenceDto): Promise<BaseResponseDto<null>> => {
  const response = await authClient.put(`${PROFILE_URL}`, setPreferenceDto) as BaseResponseDto<null>;

  return response;
};
