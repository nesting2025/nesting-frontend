import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeDialog from "../components/dialog/WelcomeDialog";
import CustomButton from "../components/CustomButton";
import { useVerifyPhoneSend } from "../hooks/useAuth";
import "../styles/css/Toast.css";
import "../styles/css/AuthVerify.css";

export default function AuthVerify() {
  const { sendVerifyPhone, loading, error, data } = useVerifyPhoneSend();
  const [verifyPhoneSendDto, setVerifyPhoneSendDto] = useState({
    phone: "",
    purpose: 'SIGN_UP',
  });

  const nav = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isCodeError, setIsCodeError] = useState(false);
  const isSubmitEnabled = name && phone && code && isCodeValid;
  const MAX_RESEND_COUNT = 3;
  const [resendCount, setResendCount] = useState(0);

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [isOpen, setIsOpen] = useState(false);  // 다이얼로그

  useEffect(() => {
    setVerifyPhoneSendDto((prev) => ({
      ...prev, phone: phone
    }));
  }, [phone])

  // 타이머 작동
  useEffect(() => {
    let timer;
    if (isCodeSent && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCodeSent, timeLeft]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };


  const handleCodeCheck = () => { 
      if (code === "123123") {
        setIsCodeValid(true);
        setIsCodeError(false);
      } else {
        setIsCodeValid(false);
        setIsCodeError(true);
      }
    
  };

  const handleSendCode = async () => {
    if (resendCount > MAX_RESEND_COUNT) {
      showToastMessage("인증번호 전송 가능 횟수를 초과했어요.");
      return;
    }
    setIsCodeSent(true);
    setTimeLeft(180);
    setIsCodeValid(false);
    setIsCodeError(false);
    setResendCount((prev) => prev + 1);
    if (resendCount == 0) {
      showToastMessage("인증번호가 전송되었어요.");
    } else {
      showToastMessage(
        `인증번호가 재전송되었어요. ${
          MAX_RESEND_COUNT - resendCount
        }번 더 재전송이 가능해요.`
      );
    }

    // API 연결 부분
    try {
      await sendVerifyPhone(verifyPhoneSendDto);
    } catch (e) {
      // 에러 처리
      console.error(e);
    }
  };

  const handleSubmit = () => {
      setIsCodeValid(true);
      setIsCodeError(false);

      if(localStorage.getItem("returnTo") === "accountInfo") {
        localStorage.removeItem("returnTo"); 
        nav("/login/account-info?type=found"); // 이메일 찾기 완료화면
      } else {
        localStorage.removeItem("returnTo");
        setIsOpen(true);  // 취향등록 화면으로
      }


  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className='auth-verify'>
      <WelcomeDialog open={isOpen} onOpenChange={setIsOpen} />

      <img 
          className="back-button"
          src="/assets/button/btn_back.svg" 
      />
      <div className="content-area">
        <h2>본인 인증</h2>
        <h5>계정 연결을 위해 본인 인증이 필요해요</h5>
        <div className='input-name-wrapper'>
            <input
                className="input-name"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {name && (
              <img
                className='x-button'
                src='/assets/button/btn_x2.svg' 
                onClick={() => setName("")}
              />
            )}
        </div>
        
        <div className="phone-row">
          <div className='input-phone-wrapper'>
            <input
                className="input-phone"
                placeholder="휴대폰 번호"
                maxLength={11}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            {phone && (
              <img
                className='x-button'
                src='/assets/button/btn_x2.svg' 
                onClick={() => setPhone("")}
              />
            )}
          </div>

          <button 
          disabled={!phone} className={phone !== "" ? "active" : ""}
          onClick={handleSendCode}>인증번호 받기</button>
        </div>

        {isCodeSent && (
          <div className="code-row">
            <div className='input-code-wrapper'>
              <input
                  className="input-code"
                  placeholder="인증번호"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
              />
              {isCodeValid ? (
                <img src="/assets/icon/icon_check.svg" className="ic-check" />
              ) : (
                <>
                  {code && (
                    <img
                      className='x-button'
                      src='/assets/button/btn_x2.svg' 
                      onClick={() => setCode("")}
                    />
                  )}
                  <p className="timer">{timeLeft > 0 ? `${formatTime(timeLeft)}` : "0:00"}</p>
                </>
              )}
              
            </div>
            <button
            disabled={!code} 
            className={code !== "" ? "active" : ""}
            onClick={handleCodeCheck}>확인</button>
          </div>
        )}

        {isCodeError && (
          <div className="code-input-error">인증번호를 다시 확인해 주세요.</div>
        )}

        <CustomButton className="btn-complete" text="인증 완료" isValid={isSubmitEnabled} onClick={handleSubmit} />
        {showToast && <div className="toast">{toastMessage}</div>}
      </div>

    </div>
  );
}
