import React, { useState, useEffect, useRef, use } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeDialog from "../components/dialog/WelcomeDialog";
import CustomButton from "../components/CustomButton";
import { useVerifyPhoneSend, useVerifyCodeCheck, useCheckValidPhone } from "../hooks/useAuth";
import "../styles/css/Toast.css";
import "../styles/css/AuthVerify.css";

export default function AuthVerify() {
  const { checkValidPhone, data: checkValidPhoneData, reset } = useCheckValidPhone();
  const { sendVerifyPhone, data: verifyPhoneSendData } = useVerifyPhoneSend();
  const [verifyPhoneSendDto, setVerifyPhoneSendDto] = useState({
    phone: "",
    purpose: 'SIGN_UP',
  });
  const { verifyCodeCheck, data: verifyCodeCheckData, reset: resetCodeCheck } = useVerifyCodeCheck();

  // API 응답 data
  useEffect(() => {
    if(verifyPhoneSendData != null) {
      console.log("인증 요청 성공, 받은 authId:", verifyPhoneSendData);
      setAuthId(verifyPhoneSendData)
    }
  }, [verifyPhoneSendData])

  useEffect(() => {
    if(verifyCodeCheckData != null) {
      console.log("인증번호 동일여부: ", verifyCodeCheckData)
      setIsCodeValid(verifyCodeCheckData)
      setIsCodeError(!verifyCodeCheckData)

      if(!verifyCodeCheckData) {
        setIsSendButtonDisabled(false);
      }
      else {
         setIsSendButtonDisabled(true);
      }
    }
  }, [verifyCodeCheckData])

  useEffect(() => {
    if(checkValidPhoneData === true) {
      handleSendCode();
    }
  }, [checkValidPhoneData])

  const nav = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [authId, setAuthId] = useState(null);
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(false);

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [hasSentCodeOnce, setHasSentCodeOnce] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [isCodeValid, setIsCodeValid] = useState(null);
  const [isCodeError, setIsCodeError] = useState(null);
  const isSubmitEnabled = name && phone && code && isCodeValid;
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [isOpen, setIsOpen] = useState(false);  // 다이얼로그

  const goBack = () => nav(-1);

  useEffect(() => {
    setVerifyPhoneSendDto((prev) => ({
      ...prev, phone: phone
    }));
    reset();
    setIsCodeSent(false);
    setHasSentCodeOnce(false);
    setIsSendButtonDisabled(false);
  }, [phone])

  useEffect(() => {
    resetCodeCheck();
  }, [code])

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

  // 휴대폰 인증번호 검증 API
  const handleCodeCheck = async () => { 
    try {
      await verifyCodeCheck(authId, code);
    } catch (e) {console.log(e);}
  };

  const handleSendCode = async () => {
    if (hasSentCodeOnce) return;

    setCode("");
    setHasSentCodeOnce(true)
    setIsCodeSent(true);
    setTimeLeft(180);
    setIsCodeValid(false);
    setIsCodeError(false);
    showToastMessage("인증번호가 전송되었어요.");

    // 휴대폰 인증번호 전송 API
    try {
      await sendVerifyPhone(verifyPhoneSendDto);
    } catch (e) {console.log(e);}
  };

  // 휴대폰 중복체크 API
  const handleCheckValidPhone = async () => {
    try {
      setHasSentCodeOnce(false);
      await checkValidPhone(phone);
      setIsSendButtonDisabled(true);
    } catch (e) {console.log(e);}
  }

  const handleSubmit = () => {
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
          onClick={goBack}
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
            disabled={isSendButtonDisabled || phone.length !== 11} 
            className={phone.length === 11 && !isSendButtonDisabled ? "active" : ""}
            onClick={handleCheckValidPhone}
          >
            {verifyCodeCheckData===false || hasSentCodeOnce ? "재전송" : "인증번호 받기"}
          </button>
        </div>
        {checkValidPhoneData === false && (
          <div className="code-input-error">이미 가입한 번호예요.</div>
        )}

        {isCodeSent && (
          <>
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
            disabled={code.length !== 6 || isCodeValid === true} 
            className={code.length === 6 && isCodeValid !== true ? "active" : ""}
            onClick={handleCodeCheck}>확인</button>
          </div>

          {verifyCodeCheckData === false && (
          <div className="code-input-error">인증번호를 다시 확인해 주세요.</div>
          )}
          </>
        )}

        <CustomButton className="btn-complete" text="인증 완료" isValid={isSubmitEnabled} onClick={handleSubmit} />
        {showToast && <div className="toast">{toastMessage}</div>}
      </div>

    </div>
  );
}
