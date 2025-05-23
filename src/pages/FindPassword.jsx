import { useState } from "react";
import '../styles/css/FindPassword.css';
import CustomButton from "../components/CustomButton";

const FindPassword = () => {
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);

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
        />
        <h2>비밀번호 찾기</h2>
        <p>본인 인증 완료 후, 이메일로 임시 비밀번호를 발송해 드려요</p>
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

        <CustomButton className='next-button' text="이메일로 임시 비밀번호 받기" isValid={isValidEmail} />
        </div>
    )    
}

export default FindPassword;