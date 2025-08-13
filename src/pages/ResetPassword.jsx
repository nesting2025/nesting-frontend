import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomButton from "../components/CustomButton";
import '../styles/css/ResetPassword.css';
import { useResetPassword } from "../hooks/useAuth";

const ResetPassword = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { resetPassword, data } = useResetPassword();
  
  const [passwordResetDto, setPasswordResetDto] = useState({
    authId: null,
    email: "",
    password: ""
  })
  const [pwCheck, setPwCheck] = useState("");
  
  const [showPwError, setShowPwError] = useState(false);
  const [showPwMatchError, setShowPwMatchError] = useState(false);
  
  const [showPw, setShowPw] = useState(false);
  const [showPwCheck, setShowPwCheck] = useState(false);

  const isFormValid = passwordResetDto.password && pwCheck && !showPwError && !showPwMatchError;

    // 이전화면에서 email, authId 받아옴
    useEffect(() => {
      if(location.state) {
        const { email, authId } = location.state;

        setPasswordResetDto(prev => ({
          ...prev, email: email, authId: authId
        }));
      }
      else {
        console.log("location.state 없음", location);
      }
    }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const regex = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d!@#$%^&*()_+{}\\[\\]:;<>,.?~/-]{8,16}$");

    if (name === "pw") {
      setPasswordResetDto(prev => ({
        ...prev, password: value
      }))
      setShowPwError(value && !regex.test(value));
      setShowPwMatchError(value && pwCheck && value !== pwCheck);
    }

    if (name === "pwCheck") {
      setPwCheck(value);
      setShowPwMatchError(passwordResetDto.password && value && passwordResetDto.password !== value);
    }
  };

  const togglePwVisibility = () => {
    setShowPw((prev) => !prev);
  };

  const togglePwCheckVisibility = () => {
    setShowPwCheck((prev) => !prev);
  };

  const goBack = () => nav("/login");
  
  const handleSubmit = async () => {
    if (!isFormValid) return;

    // 비밀번호 재설정 API 통신
    try {
      await resetPassword(passwordResetDto);
    } catch (e) {console.log(e);}
  };

  // API 응답
  useEffect(() => {
    if(data?.code === "SUCCESS") {
      nav("/login/nesting");
    }
  }, [data])


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
            value={passwordResetDto.password}
            onChange={handleChange}
          />
          {passwordResetDto.password && (
            <img
              className='show_pw_button'
              src={showPw ? '/assets/button/btn_eye.svg' : '/assets/button/btn_eye_off.svg'}
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
              src={showPwCheck ? '/assets/button/btn_eye.svg' : '/assets/button/btn_eye_off.svg'}
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
