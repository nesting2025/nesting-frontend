import '../styles/css/LoginNesting.css';
import CustomButton from "../components/CustomButton";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginNesting = () => {
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [showEmailError, setShowEmailError] = useState(false);
    const [showPwError, setShowPwError] = useState(false);
    const [showPw, seteShowPw] = useState(false);
    const isFormValid = email && pw && !showEmailError && !showPwError;

    const goBack = () => nav("/login");
    const gotoFindEmail = () => nav("/login/find-email");
    const gotoFindPassword = () => nav("/login/find-password");
    const gotoSignup = () => nav("/signup/nesting");

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

    const handlePwChange = (e) => {
        const value = e.target.value;
        setPw(value);

        const regex = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d!@#$%^&*()_+{}\\[\\]:;<>,.?~/-]{8,16}$");
        const isValidPw = regex.test(value);


        if(value && !isValidPw) {
            setShowPwError(true);
        }
        else {
            setShowPwError(false);
        }
    }

    const togglePwVisibility = () => {
        seteShowPw(prevState => !prevState);
    }

    const login = () => {
        // API 통신
        nav("/");
    }

    return (
        <div className="login-nesting">
        <img 
            className="back-button"
            src="/assets/button/btn_back.svg" 
            onClick={goBack}
        />
        <img 
            className="logo-img"
            src="/assets/logo_nesting_string.svg" 
        />
        <p>최애를 차곡차곡, 네스팅</p>
        <div className='input-email-wrapper'>
            <input
                className="input-email"
                placeholder="이메일"
                value={email}
                onChange={handleEmailChange}
            />
            {email && (
                 <img
                    className='x_button'
                    src='/assets/button/btn_x2.svg' 
                    onClick={clearInput}
                 />
            )}
        </div>
        {showEmailError && (
                <div className='email-error-message'>이메일 형식으로 입력해주세요.</div>
            )}
        <div className='input-pw-wrapper'>
            <input
                className="input-pw"
                placeholder="비밀번호"
                type={showPw ? "text" : "password"}
                value={pw}
                onChange={handlePwChange}
            />
            {pw && (
                <img
                    className='show_pw_button'
                    src={showPw ? '/assets/button/btn_eye_off.svg' : '/assets/button/btn_eye.svg'}
                    onClick={togglePwVisibility} 
                />
            )}
        </div>
        {showPwError && (
            <div className='pw-error-message'>영문 포함,숫자 포함, 8-16자 이내</div>
        )}
        <label className='keep-login'>
            <input type="checkbox" />
            <span className='checkmark' />
            로그인 상태 유지
        </label>
        <div className='link-group'>
            <p
            onClick={gotoFindEmail}>이메일 찾기</p>
            <span>|</span>
            <p
            onClick={gotoFindPassword}>비밀번호 찾기</p>
            <span>|</span>
            <p
            onClick={gotoSignup}>회원가입</p>
        </div>
        <CustomButton 
        text="로그인" 
        isValid={isFormValid}
        onClick={login} />
        </div>
    )
}

export default LoginNesting;