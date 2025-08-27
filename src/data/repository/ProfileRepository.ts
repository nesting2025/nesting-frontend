import { setPreference } from "../../api/profileApi";
import { BaseResponseDto } from "../dto/common/BaseResponseDto";
import { setPreferenceDto } from "../dto/Request/auth/SetPreferenceDto";

export const ProfileRepository = {
    setPreference: async (setPreferenceDto: setPreferenceDto): Promise<BaseResponseDto<null>> => {
            return await setPreference(setPreferenceDto);
    },
};