import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from "../components/CustomButton";
import '../styles/css/ResetPassword.css';

const ResetPassword = () => {
  const nav = useNavigate();
  
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  
  const [showPwError, setShowPwError] = useState(false);
  const [showPwMatchError, setShowPwMatchError] = useState(false);
  
  const [showPw, setShowPw] = useState(false);
  const [showPwCheck, setShowPwCheck] = useState(false);

  const isFormValid = pw && pwCheck && !showPwError && !showPwMatchError;

  const handleChange = (e) => {
    const { name, value } = e.target;

    const regex = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d!@#$%^&*()_+{}\\[\\]:;<>,.?~/-]{8,16}$");

    if (name === "pw") {
      setPw(value);
      setShowPwError(value && !regex.test(value));
      setShowPwMatchError(value && pwCheck && value !== pwCheck);
    }

    if (name === "pwCheck") {
      setPwCheck(value);
      setShowPwMatchError(pw && value && pw !== value);
    }
  };

  const togglePwVisibility = () => {
    setShowPw((prev) => !prev);
  };

  const togglePwCheckVisibility = () => {
    setShowPwCheck((prev) => !prev);
  };

  const goBack = () => nav("/login");
  
  const handleSubmit = () => {
    if (!isFormValid) return;

    // 비밀번호 재설정 API 통신
    console.log('비밀번호 재설정 완료');
    nav("/");
  };

  return (
    <div className="reset-password">
      <img
        className="back-button"
        src="/assets/button/btn_back.svg"
        onClick={goBack}
      />
      <div className='content-area'>
        <h2>비밀번호 재설정</h2>

        <h5>비밀번호</h5>
        <div className='input-pw-wrapper'>
          <input
            name="pw"
            className="input-pw"
            placeholder="비밀번호"
            type={showPw ? "text" : "password"}
            value={pw}
            onChange={handleChange}
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
          <div className='pw-error-message'>영문 포함, 숫자 포함, 8-16자 이내</div>
        )}

        <h5>비밀번호 확인</h5>
        <div className='input-pw-wrapper'>
          <input
            name="pwCheck"
            className="input-pw-check"
            placeholder="비밀번호 확인"
            type={showPwCheck ? "text" : "password"}
            value={pwCheck}
            onChange={handleChange}
          />
          {pwCheck && (
            <img
              className='show_pw_button'
              src={showPwCheck ? '/assets/button/btn_eye_off.svg' : '/assets/button/btn_eye.svg'}
              onClick={togglePwCheckVisibility}
            />
          )}
        </div>

        {showPwMatchError && (
          <div className='pw-check-error-message'>비밀번호가 일치하지 않습니다</div>
        )}

        <CustomButton
          className='reset-button'
          text="설정 완료"
          isValid={isFormValid}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ResetPassword;
