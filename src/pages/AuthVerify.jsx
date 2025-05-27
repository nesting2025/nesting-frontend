import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../components/auth/AuthHeader";
import NameInput from "../components/auth/NameInput";
import PhoneInput from "../components/auth/PhoneInput";
import CodeInput from "../components/auth/CodeInput";
import SubmitButton from "../components/auth/SubmitButton";
import BackButton from "../components/auth/BackButton";
import WelcomeDialog from "../components/dialog/WelcomeDialog";

import "../styles/css/Toast.css";

export default function AuthVerify() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isCodeError, setIsCodeError] = useState(false);
  const isSubmitEnabled = code.length === 6 && isCodeValid;
  const MAX_RESEND_COUNT = 3;
  const [resendCount, setResendCount] = useState(0);

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [isOpen, setIsOpen] = useState(false);  // 다이얼로그

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

  const handleCodeCheck = () => {
    if (code.length === 6) {
      if (code === "123123") {
        setIsCodeValid(true);
        setIsCodeError(false);
      } else {
        setIsCodeValid(false);
        setIsCodeError(true);
      }
    }
  };

  const handleSendCode = () => {
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
  };

  const handleSubmit = () => {
    if (code === "123123") {
      setIsCodeValid(true);
      setIsCodeError(false);

      if(localStorage.getItem("returnTo") === "accountInfo") {
        localStorage.removeItem("returnTo"); 
        nav("/login/account-info?type=found"); // 이메일 찾기 완료화면
      } else {
        localStorage.removeItem("returnTo");
        setIsOpen(true);  // 취향등록 화면으로
      }

    } else {
      setIsCodeValid(false);
      setIsCodeError(true);
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
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "0 auto",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <WelcomeDialog open={isOpen} onOpenChange={setIsOpen} />
      <BackButton onBack={() => window.history.back()} />
      <AuthHeader />
      <NameInput value={name} onChange={setName} />
      <PhoneInput
        value={phone}
        onChange={setPhone}
        onSend={handleSendCode}
        isCodeSent={isCodeSent}
        resendCount={resendCount}
      />

      {isCodeSent && (
        <CodeInput
          value={code}
          onChange={(val) => {
            setCode(val);
            setIsCodeError(false);
          }}
          timeLeft={timeLeft}
          isError={isCodeError}
          isValid={isCodeValid}
          onCheckCode={handleCodeCheck}
        />
      )}

      <SubmitButton onClick={handleSubmit} disabled={!isSubmitEnabled} />
      {showToast && <div className="toast">{toastMessage}</div>}
    </div>
  );
}
