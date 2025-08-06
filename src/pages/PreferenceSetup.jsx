import { useState, useEffect } from "react";
import '../styles/css/PreferenceSetup.css';
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";
import CharacterDialog from "../components/dialog/CharacterDialog";
import GoodsCategoryDialog from "../components/dialog/GoodsCategoryDialog";
import { useCheckNickname } from "../hooks/useAuth";

const PreferenceSetup = () => {
    const nav = useNavigate();
    const [nickname, setNickName] = useState("");
    const [showNicknameError, SetShowNicknameError] = useState(false); 
    const [isNickNameValid, setIsNickNameValid] = useState(false);  

    const [isCharcterOpen, setIsCharcterOpen] = useState(false);  // 캐릭터 다이얼로그
    const [selectedCharacters, setSelectedCharacters] = useState([]);
    const [isGoodsOpen, setIsGoodsOpen] = useState(false);  // 굿즈 다이얼로그
    const [selectedGoods, setSelectedGoods] = useState([]);

    const goBack = () => nav(-1);
    const gotoHome = () => nav("/");

    const onChangeNickName = (e) => {
        const value = e.target.value;
        setNickName(value);
        setIsNickNameValid(false);

        const nicknameRegex = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]{1,10}$/;
        const isFormValidNickName = nicknameRegex.test(value);

        if(value && !isFormValidNickName) {
            SetShowNicknameError(true);
        }
        else {
            SetShowNicknameError(false);
        }
    }

    const clearInput = () => {
        setNickName("");
        SetShowNicknameError(false);
        setIsNickNameValid(false);
    }

    const handleCharacterComplete = (names) => {
        setSelectedCharacters(names);
    }

    const handleGoodsComplete = (names) => {
        setSelectedGoods(names);
    }

    const { checkNickname, loading, error, data } = useCheckNickname();

    // 컴포넌트 내 함수 이름 변경
    const handleCheckNickname = async () => {
        try {
        await checkNickname(nickname);
        if (!showNicknameError) {
            setIsNickNameValid(true);
        }
        } catch (e) {
        // 에러 처리
        console.error(e);
        }
    };


    return (
        <div className="preference-setup">
        <img 
            className="back-button"
            src="/assets/button/btn_back.svg" 
            onClick={goBack}
        />
        <h2>취향을 알려주시면<br />맞춰서 추천해드릴게요</h2>
        <h5>닉네임*</h5>
        <div className="input-nickname-container">
            <div className='input-nickname-wrapper'>
                <input
                    className="input-nickname"
                    placeholder="한글, 영문, 숫자 10자 이내"
                    value={nickname}
                    onChange={onChangeNickName}
                    maxLength={10}
                />
                {nickname && (
                    <img
                        className='x-button'
                        src={
                            isNickNameValid
                            ? '/assets/icon_check.svg'
                            : '/assets/button/btn_x2.svg' 
                        }
                        onClick={clearInput}
                    />
                )}
            </div>
            <button 
                className="check-nickname-button"
                onClick={handleCheckNickname}>
                중복 확인
            </button>
        </div>
        {showNicknameError && (
                <div className='nickname-error-message'>띄어쓰기 없이 10자 이내 (한글,영문,숫자)</div>
            )}
        <h5>좋아하는 캐릭터</h5>
        <div className='input-category-wrapper'
            onClick={() => setIsCharcterOpen(true)}>
                <input
                    className="input-category"
                    placeholder="선택하세요"
                    value={selectedCharacters.join(', ')}
                    readOnly
                />
                <img
                    className='dropdown-button'
                    src='/assets/button/btn_dropdown.svg' 
                />
        </div>
        <CharacterDialog  
            open={isCharcterOpen} 
            onOpenChange={setIsCharcterOpen}
            onComplete={handleCharacterComplete} 
        />
        <h5>좋아하는 굿즈 유형</h5>
        <div className='input-category-wrapper'
            onClick={() => setIsGoodsOpen(true)}>
                <input
                    className="input-category"
                    placeholder="선택하세요"
                    value={selectedGoods.join(', ')}
                    readOnly
                />
                <img
                    className='dropdown-button'
                    src='/assets/button/btn_dropdown.svg' 
                />
        </div>
        <GoodsCategoryDialog 
            open={isGoodsOpen} 
            onOpenChange={setIsGoodsOpen}
            onComplete={handleGoodsComplete} 
        />
        <CustomButton className='next-button' text="저장하고 네스팅 시작하기" isValid={isNickNameValid} 
        onClick={gotoHome}/>
        </div>
    )
}

export default PreferenceSetup;