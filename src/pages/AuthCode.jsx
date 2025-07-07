import { useRef,useState } from "react";
import '../styles/css/AuthCode.css';
import CustomButton from "../components/CustomButton";
import { useNavigate } from 'react-router-dom';

const AuthCode = () => {
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [isValidCode, setIsValidCode] = useState(false);

    const goBack = () => nav(-1);
    const gotoLoginNesting = () => nav("/login/auth-code", { replace: true });
    const length = 6;
    const [values, setValues] = useState(Array(length).fill(''));
    const inputs = useRef([]);

    const handleChange = (index, e) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만
        if (value) {
          const newValues = [...values];
          newValues[index] = value[0]; // 한자리만 허용
          setValues(newValues);
          // 다음 칸으로 이동
          if (index < length - 1) {
            inputs.current[index + 1].focus();
          }
          if (newValues.every(val => val !== '')) {
            setIsValidCode(true);
          }
        }
      };
    
      const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
          if (values[index]) {
            // 현재 칸 지우기
            const newValues = [...values];
            newValues[index] = '';
            setValues(newValues);
          } else if (index > 0) {
            // 이전 칸으로 이동
            inputs.current[index - 1].focus();
          }
          setIsValidCode(false);
        }
      };
    
    return (
        <div className="auth-code">
        <img 
            className="back-button"
            src="/assets/button/btn_back.svg" 
            onClick={goBack}
        />
        <h2>인증코드 확인</h2>
        <h3>메일로 전송된 인증코드를 입력해 주세요</h3>
        <div className="code-input-container">
        {values.map((value, index) => (
            <input
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength="1"
            value={value}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="code-input"
            />
        ))}
        </div>
        <p className="code-info">*전송된 인증코드는 3분 안에 인증이 만료됩니다</p>
        <p className="code-info">*메일을 받지 못하셨다면 스팸 메일함을 확인해 주세요</p>


        <CustomButton
            className='next-button' 
            text="다음" 
            isValid={isValidCode}
            onClick={gotoLoginNesting}  
        />
        </div>
    )    
}

export default AuthCode;