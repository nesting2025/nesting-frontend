import { useState } from "react";
import '../styles/css/FindPassword.css';
import CustomButton from "../components/CustomButton";
import { useNavigate } from 'react-router-dom';

const FindPassword = () => {
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);

    const goBack = () => nav(-1);
    const gotoAuthCode = () => nav("/login/auth-code", { 
        replace: true,
        state: {email: email}
    });

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        setIsValidEmail(isValid);
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
                onClick={gotoAuthCode} 
            />
        </div>
        </div>
    )    
}

export default FindPassword;