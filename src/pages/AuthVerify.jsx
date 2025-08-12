import React, { useState, useEffect, useRef, use } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import WelcomeDialog from "../components/dialog/WelcomeDialog";
import CustomButton from "../components/CustomButton";
import { useVerifyPhoneSend, useVerifyCodeCheck, useCheckValidPhone, useSignup } from "../hooks/useAuth";
import { useToast } from "../components/common/ToastContext";
import "../styles/css/AuthVerify.css";

export default function AuthVerify() {
  const { checkValidPhone, data: checkValidPhoneData, reset } = useCheckValidPhone();
  const { sendVerifyPhone, data: verifyPhoneSendData } = useVerifyPhoneSend();
  const [verifyPhoneSendDto, setVerifyPhoneSendDto] = useState({
    phone: "",
    purpose: 'SIGN_UP',
  });
  const { verifyCodeCheck, data: verifyCodeCheckData, reset: resetCodeCheck } = useVerifyCodeCheck();
  const { signup, data: signupData } = useSignup();

  // API 응답 data
  useEffect(() => {
    if(verifyPhoneSendData != null) {
      console.log("인증 요청 성공, 받은 authId:", verifyPhoneSendData);
      setForm(prev => ({
        ...prev, authId: verifyPhoneSendData
      }))
    }
  }, [verifyPhoneSendData])
  useEffect(() => {
    if(verifyCodeCheckData != null) {
      console.log("인증번호 동일여부: ", verifyCodeCheckData)
      setIsCodeValid(verifyCodeCheckData)

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
  useEffect(() => {
    if(signupData != null) {
      // 회원가입 진행중인 경우
      localStorage.setItem("accessToken", signupData.tokenInfo.accessToken);
      localStorage.setItem("refreshToken", signupData.tokenInfo.refreshToken);
      setIsOpen(true); 

      // if(localStorage.getItem("returnTo") === "accountInfo") {
      //   localStorage.removeItem("returnTo"); 
      //   nav("/login/account-info?type=found"); // 이메일 찾기 완료화면
      // } else {
      //   localStorage.removeItem("returnTo");
      //   setIsOpen(true);  // 취향등록 화면으로
      // }
    }
  }, [signupData])

  const nav = useNavigate();
  const { showToast } = useToast();
  const location = useLocation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    loginType: "EMAIL",
    termAgreement: {},
    marketingReceiveInfo: {},
    authId: null
  });
  const [code, setCode] = useState("");
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(false);

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [hasSentCodeOnce, setHasSentCodeOnce] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [isCodeValid, setIsCodeValid] = useState(null);
  const isSubmitEnabled = form.name && form.phone && code && isCodeValid;

  const [isOpen, setIsOpen] = useState(false);  // 다이얼로그

  const goBack = () => nav(-1); 

  // 이전 페이지 email, password, agreements 데이터
  useEffect(() => {
    if(location.state) {
      setForm(prev => ({
        ...prev, 
        ...location.state
      }));
    }
  }, [location.state]);


  useEffect(() => {
    setVerifyPhoneSendDto((prev) => ({
      ...prev, phone: form.phone
    }));
    reset();
    setIsCodeSent(false);
    setHasSentCodeOnce(false);
    setIsSendButtonDisabled(false);
  }, [form.phone])

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
      await verifyCodeCheck(form.authId, code);
    } catch (e) {console.log(e);}
  };

  const handleSendCode = async () => {
    if (hasSentCodeOnce) return;

    setCode("");
    setHasSentCodeOnce(true)
    setIsCodeSent(true);
    setTimeLeft(180);
    setIsCodeValid(false);
    showToast("인증번호가 전송되었어요.")

    // 휴대폰 인증번호 전송 API
    try {
      await sendVerifyPhone(verifyPhoneSendDto);
    } catch (e) {console.log(e);}
  };

  // 휴대폰 중복체크 API
  const handleCheckValidPhone = async () => {
    try {
      setHasSentCodeOnce(false);
      await checkValidPhone(form.phone);
      setIsSendButtonDisabled(true);
    } catch (e) {console.log(e);}
  }

  // 회원가입 API
  const signupEmail = async () => {
    try {
      await signup(form);
    } catch (e) {console.log(e);}
  };

  const handleSubmit = () => {
      // if(localStorage.getItem("returnTo") === "accountInfo") {
      //   localStorage.removeItem("returnTo"); 
      //   nav("/login/account-info?type=found"); // 이메일 찾기 완료화면
      // } else {
      //   localStorage.removeItem("returnTo");
      //   setIsOpen(true);  // 취향등록 화면으로
      // }
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
                value={form.name}
                onChange={(e) => setForm(prev => ({
                  ...prev, name: e.target.value
                  }))
                }
            />
            {form.name && (
              <img
                className='x-button'
                src='/assets/button/btn_x2.svg' 
                onClick={() => setForm(prev => ({
                  ...prev, name: ""
                  }))
                }
              />
            )}
        </div>
        
        <div className="phone-row">
          <div className='input-phone-wrapper'>
            <input
                className="input-phone"
                placeholder="휴대폰 번호"
                maxLength={11}
                value={form.phone}
                onChange={(e) => setForm(prev => ({
                  ...prev, phone: e.target.value
                  }))
                }
            />
            {form.phone && (
              <img
                className='x-button'
                src='/assets/button/btn_x2.svg' 
                onClick={() => setForm(prev => ({
                  ...prev, phone: ""
                  }))
                }
              />
            )}
          </div>

          <button 
            disabled={isSendButtonDisabled || form.phone.length !== 11} 
            className={form.phone.length === 11 && !isSendButtonDisabled ? "active" : ""}
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

        <CustomButton className="btn-complete" text="인증 완료" isValid={isSubmitEnabled} onClick={signupEmail} />
      </div>

    </div>
  );
}
