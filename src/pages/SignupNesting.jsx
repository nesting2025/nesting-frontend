import '../styles/css/SignupNesting.css';
import CustomButton from "../components/CustomButton";
import { useState, useEffect } from "react";

const SignupNesting = () => {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [pwConfirm, setPwConfirm] = useState("");
    // 이메일, 비번, 비번확인 error
    const [showEmailError, setShowEmailError] = useState(false);
    const [showPwError, setShowPwError] = useState(false);
    const [showPwConfirmError, setPwConfirmError] = useState(false);
    // 비번, 비번확인 visibility
    const [showPw, setShowPw] = useState(false);
    const [showPwConfirm, setShowPwConfirm] = useState(false);

    useEffect(()=> {
        if(pwConfirm) {
            setPwConfirmError(pw !== pwConfirm);
        }
    }, [pw, pwConfirm]);

    const isValid = false


    // 이메일 관련 함수
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        if(value && !isValidEmail) {
            setShowEmailError(true);
        }
        else {
            setShowEmailError(false);
        }
    }

    const clearInput = () => {
        setEmail("");
        setShowEmailError(false);
    }

    // pw 관련 함수
    const handlePwChange = (e) => {
        const value = e.target.value;
        setPw(value);

        const regex = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d!@#$%^&*()_+{}\\[\\]:;<>,.?~/-]{8,16}$");
        const isValidPw = regex.test(value);

        setShowPwError(value && !isValidPw);
    }

    const handlePwConfirmChange = (e) => {
        const value = e.target.value;
        setPwConfirm(value);
    }

    const toggleVisibility = (setter) => {
        setter(prev => !prev);
    }
    const togglePwVisibility = () => toggleVisibility(setShowPw)
    const togglePwConfirmVisibility = () => toggleVisibility(setShowPwConfirm)


    return (
        <div className="signup-nesting">
        <img 
            className="back-button"
            src="/assets/button/btn_back.svg" 
        />
        <h2>회원가입</h2>
        <h5>이메일 주소</h5>
        <div className='input-email-wrapper'>
            <input
                className="input-email"
                placeholder="ex) nesting@nesting.co.kr"
                value={email}
                onChange={handleEmailChange}
            />
            {email && (
                 <img
                    className='x-button'
                    src='/assets/button/btn_x2.svg' 
                    onClick={clearInput}
                 />
            )}
        </div>
        {showEmailError && (
                <div className='email-error-message'>이메일 형식으로 입력해주세요.</div>
            )}
        <h5>비밀번호</h5>
        <div className='input-pw-wrapper'>
            <input
                className="input-pw"
                placeholder="영문, 숫자 조합 8-16자"
                type={showPw ? "text" : "password"}
                value={pw}
                onChange={handlePwChange}
            />
            {pw && (
                <img
                    className='show-pw-button'
                    src={showPw ? '/assets/button/btn_eye_off.svg' : '/assets/button/btn_eye.svg'}
                    onClick={togglePwVisibility} 
                />
            )}
        </div>
        {showPwError && (
            <div className='pw-error-message'>영문 포함,숫자 포함, 8-16자 이내</div>
        )}
        <h5>비밀번호 확인</h5>
        <div className="input-pw-wrapper">
            <input
                className="input-pw-confirm"
                placeholder="영문, 숫자 조합 8-16자"
                type={showPwConfirm ? "text" : "password"}
                value={pwConfirm}
                onChange={handlePwConfirmChange}
            />
            {pwConfirm && (
                <img
                    className='show-pw-button'
                    src={showPwConfirm ? '/assets/button/btn_eye_off.svg' : '/assets/button/btn_eye.svg'}
                    onClick={togglePwConfirmVisibility}
                />
            )}
        </div>
        {showPwConfirmError && (
            <div className="pw-confirm-error-message">비밀번호를 다시 확인해 주세요.</div>
        )}

        <label className='agree-all-checkbox'>
            <input type="checkbox" />
            <span className='checkmark' />
            <div className='agree-text-wrapper'>
                <span className='agree-text-main'>모두 동의합니다.</span>
                <span className='agree-text-sub'>선택 동의 항목 포함</span>
            </div>
        </label>        
        <label className='agree-checkbox'>
            <input type="checkbox" />
            <span className='checkmark' />
            [필수] 이용약관 동의
        </label>
        <label className='agree-checkbox'>
            <input type="checkbox" />
            <span className='checkmark' />
            [필수] 개인 정보 수집 및 이용 동의
        </label>
        <label className='agree-checkbox'>
            <input type="checkbox" />
            <span className='checkmark' />
            [선택] 개인 정보 수집 및 이용 동의
        </label>
        <label className='agree-checkbox'>
            <input type="checkbox" />
            <span className='checkmark' />
            [선택] 쇼핑 정보 수신 모두 동의
        </label>

        <CustomButton className='signup-next-button' text="다음" />
        </div>
    )
}

export default SignupNesting;