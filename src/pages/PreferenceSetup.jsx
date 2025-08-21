import { useState, useEffect } from "react";
import '../styles/css/PreferenceSetup.css';
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";
import CharacterDialog from "../components/dialog/CharacterDialog";
import GoodsCategoryDialog from "../components/dialog/GoodsCategoryDialog";
import { useCheckNickname } from "../hooks/useAuth";
import { useSetPreference } from "../hooks/useProfile";

const PreferenceSetup = () => {
    const nav = useNavigate();
    const [showNicknameError, SetShowNicknameError] = useState(false); 
    const [isNickNameValid, setIsNickNameValid] = useState(false);  

    const [isCharcterOpen, setIsCharcterOpen] = useState(false);  // 캐릭터 다이얼로그
    const [isGoodsOpen, setIsGoodsOpen] = useState(false);  // 굿즈 다이얼로그

    const [form, setForm] = useState({
        nickname: "",
        profileImg: null,
        characters: [],
        goods: [],
        myCharacters: null,
        myGoods: null
    })

    const goBack = () => nav(-1);

    const onChangeNickName = (e) => {
        const value = e.target.value;
        setForm(prev => ({...prev, nickname: value}));
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
        setForm(prev => ({...prev, nickname: ""}));
        SetShowNicknameError(false);
        setIsNickNameValid(false);
    }

    const handleCharacterComplete = ({ characters, myCharacters }) => {
        setForm(prev => ({...prev, characters: characters, myCharacters: myCharacters}));
    }

    const handleGoodsComplete = ({ goods, myGoods }) => {
        setForm(prev => ({...prev, goods: goods, myGoods: myGoods}));
    }

    const { checkNickname, data: checkNicknameData, reset } = useCheckNickname();
    const { setPreference, data: setPreferenceData} = useSetPreference();

    // 닉네임 중복체크 API
    const handleCheckNickname = async () => {
        try {
            await checkNickname(form.nickname);
        } catch (e) { console.error(e);}
    };

    // 취향등록 API
    const handleSetPreference = async () => {
        try {
            setPreference(form)
        } catch (e) { console.error(e);}
    };


    // API response data
    useEffect(() => {
        if(checkNicknameData != null) {
            if(checkNicknameData == true) {
                setIsNickNameValid(true);
            } else {
                setIsNickNameValid(false);
            }
        }
    }, [checkNicknameData]);

    useEffect(() => {
        if(setPreferenceData?.code === "SUCCESS") {
            nav("/");
        }
    }, [setPreferenceData])

    useEffect(() => {
        reset();
    }, [form.nickname]);

    return (
        <div className="preference-setup">
        <img 
            className="back-button"
            src="/assets/button/btn_back.svg" 
            onClick={goBack}
        />
        <div className="content-area">
            <h2>취향을 알려주시면<br />맞춰서 추천해드릴게요</h2>
            <h5>닉네임*</h5>
            <div className="input-nickname-container">
                <div className='input-nickname-wrapper'>
                    <input
                        className="input-nickname"
                        placeholder="한글, 영문, 숫자 10자 이내"
                        value={form.nickname}
                        onChange={onChangeNickName}
                        maxLength={10}
                    />
                    {form.nickname && (
                        <img
                            className='x-button'
                            src={
                                isNickNameValid
                                ? '/assets/icon/icon_check.svg'
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
            {checkNicknameData === false && (
                <div className='nickname-error-message'>이미 사용 중인 닉네임이에요.</div>
            )}
            <h5>좋아하는 캐릭터</h5>
            <div className='input-category-wrapper'
                onClick={() => setIsCharcterOpen(true)}>
                    <input
                        className="input-category"
                        placeholder="선택하세요"
                        value={[
                            form.characters?.join(', '), 
                            form.myCharacters ? String(form.myCharacters) : null
                        ]
                        .filter(Boolean) 
                        .join(', ')}
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
                        value={[
                            form.goods?.join(', '), 
                            form.myGoods ? String(form.myGoods) : null
                        ]
                        .filter(Boolean) 
                        .join(', ')}
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
            onClick={handleSetPreference}/>
        </div>
        </div>
    )
}

export default PreferenceSetup;