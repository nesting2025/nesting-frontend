import { useState } from "react";
import '../styles/css/PreferenceSetup.css';
import CustomButton from "../components/CustomButton";

const PreferenceSetup = () => {
    const [nickname, setNickName] = useState("");
    const [showNicknameError, SetShowNicknameError] = useState(false); 

    const onChangeNickNmae = (e) => {
        const value = e.target.value;
        setNickName(value);
    }

    const clearInput = () => {
        setNickName("");
        SetShowNicknameError(false);
    }

    const checkNickname = () => {
        const nicknameRegex = /^[가-힣a-zA-Z0-9]{1,10}$/;

        if (!nicknameRegex.test(nickname)) {
            SetShowNicknameError(true);
        }
        else {
            // API 통신
        }
    }

    return (
        <div className="preference-setup">
        <img 
            className="back-button"
            src="/assets/button/btn_back.svg" 
        />
        <h2>취향을 알려주시면<br />맞춰서 추천해드릴게요</h2>
        <h5>닉네임*</h5>
        <div className="input-nickname-container">
            <div className='input-nickname-wrapper'>
                <input
                    className="input-nickname"
                    placeholder="한글, 영문, 숫자 10자 이내"
                    value={nickname}
                    onChange={onChangeNickNmae}
                    maxLength={10}
                />
                {nickname && (
                    <img
                        className='x-button'
                        src='/assets/button/btn_x2.svg' 
                        onClick={clearInput}
                    />
                )}
            </div>
            <button 
                className="check-nickname-button"
                onClick={checkNickname}>
                중복 확인
            </button>
        </div>
        {showNicknameError && (
                <div className='nickname-error-message'>띄어쓰기 없이 10자 이내 (한글,영문,숫자)</div>
            )}
        <h5>좋아하는 캐릭터</h5>
        <div className='input-category-wrapper'>
                <input
                    className="input-category"
                    placeholder="선택하세요"
                    readOnly
                />
                <img
                    className='dropdown-button'
                    src='/assets/button/btn_dropdown.svg' 
                />
        </div>
        <h5>좋아하는 굿즈 유형</h5>
        <div className='input-category-wrapper'>
                <input
                    className="input-category"
                    placeholder="선택하세요"
                    readOnly
                />
                <img
                    className='dropdown-button'
                    src='/assets/button/btn_dropdown.svg' 
                />
        </div>
        <CustomButton className='next-button' text="저장하고 네스팅 시작하기" isValid={false} />
        </div>
    )
}

export default PreferenceSetup;