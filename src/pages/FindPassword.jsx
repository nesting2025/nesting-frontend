import { useEffect, useState } from "react";
import '../styles/css/FindPassword.css';
import CustomButton from "../components/CustomButton";
import { useNavigate, useLocation } from 'react-router-dom';
import { useCheckValidEmail } from "../hooks/useAuth";
import { useToast } from "../components/common/ToastContext";

const FindPassword = () => {
    const { checkValidEmail, data: checkValidEmailData, reset } = useCheckValidEmail();
    const { showToast } = useToast();

    // 이메일 중복체크 API
    const checkEmailValid = async () => {
        try {
            await checkValidEmail(email);
        }   catch (e) {console.log(e);}
    }

    // API data
    useEffect(() => {
        if(checkValidEmailData != null) {
            if(checkValidEmailData === true) {
                showToast("계정을 찾을 수 없습니다. 다시 확인해 주세요.");
                setIsValidEmail(false);
            } else {
                nav("/login/auth-code", { 
                    replace: true,
                    state: {email: email}});
            }
            
        }
    }, [checkValidEmailData])
    
    const location = useLocation();
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    
    useEffect(() => {
        if (location.state?.email) {
            setEmail(location.state.email);
        }
    }, [location.state]);

    const goBack = () => nav(-1);

    useEffect(() => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        setIsValidEmail(isValid);
    }, [email]);

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
    }

    const clearInput = () => {
        setEmail("");
        setIsValidEmail(false);
    }
    
    return (
        <div className="find-password">
        <img 
            className="back-button"
            src="/assets/button/btn_back.svg" 
            onClick={goBack}
        />
        <div className="content-area">
            <h2>비밀번호 찾기</h2>
            <p>이메일로 인증코드를 발송해 드려요</p>
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

            <CustomButton 
                className='next-button' 
                text="이메일로 인증코드 받기" 
                isValid={isValidEmail}
                onClick={checkEmailValid} 
            />
        </div>
        </div>
    )    
}

export default FindPassword;