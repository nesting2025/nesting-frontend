import '../styles/css/LoginNesting.css';
import CustomButton from "../components/CustomButton";
import CustomCheckbox from '../components/common/CustomCheckbox';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginEmail } from '../hooks/useAuth';
import { useToast } from '../components/common/ToastContext';

const LoginNesting = () => {
    const { loginEmail, data: loginEmailData } = useLoginEmail(); 
    const nav = useNavigate();
    const { showToast } = useToast();
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const [showEmailError, setShowEmailError] = useState(false);
    const [showPwError, setShowPwError] = useState(false);
    const [showPw, seteShowPw] = useState(false);
    const isFormValid = form.email && form.password && !showEmailError && !showPwError;
    const [keepLogin, setKeepLogin] = useState(false);

    const goBack = () => nav("/login");
    const gotoFindEmail = () => nav("/login/find-email");
    const gotoFindPassword = () => nav("/login/find-password");
    const gotoSignup = () => nav("/signup/nesting");

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setForm((prev) => ({
            ...prev, email: value
        }));

        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        if(value && !isValidEmail) {
            setShowEmailError(true);
        }
        else {
            setShowEmailError(false);
        }
    }

    const clearInput = () => {
        setForm((prev) => ({
            ...prev, email: ""
        }));
        setShowEmailError(false);
    }

    const handlePwChange = (e) => {
        const value = e.target.value;
        setForm((prev) => ({
            ...prev, password: value
        }));

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

    // 이메일 로그인 API
    const login = async () => {
        try {
            await loginEmail(form);
        } catch (error) {
            console.log(error);
            if(error.message === "유효하지 않은 이메일/패스워드 값입니다.") {
                showToast("아이디 또는 비밀번호를 다시 확인해 주세요.");
            }
        }
    }
    // API 응답
    useEffect(() => {
        if(loginEmailData != null) {
            localStorage.setItem("accessToken", loginEmailData.tokenInfo.accessToken);
            localStorage.setItem("refreshToken", loginEmailData.tokenInfo.refreshToken);
            nav("/");
        }
    }, [loginEmailData])

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
        <div className='content-area'>
            <div className='input-email-wrapper'>
            <input
                className="input-email"
                placeholder="이메일"
                value={form.email}
                onChange={handleEmailChange}
            />
            {form.email && (
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
                    value={form.password}
                    onChange={handlePwChange}
                />
                {form.password && (
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

            <div className='checkbox-area'>
                <CustomCheckbox
                    label="로그인 상태 유지"
                    checked={keepLogin}
                    onChange={(e) => setKeepLogin(e.target.checked)}
                    name="keep-login"
                />
            </div>
            
            <div className='link-group'>
                <div className="link-item"
                onClick={gotoFindEmail}>이메일 찾기</div>
                <span>|</span>
                <div className="link-item"
                onClick={gotoFindPassword}>비밀번호 찾기</div>
                <span>|</span>
                <div className="link-item"
                onClick={gotoSignup}>회원가입</div>
            </div>
            <CustomButton 
            text="로그인" 
            isValid={isFormValid}
            onClick={login}
            className='login-btn' />
            </div>
        </div>
    )
}

export default LoginNesting;