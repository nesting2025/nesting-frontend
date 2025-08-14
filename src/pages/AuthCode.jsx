import { use, useEffect, useRef,useState } from "react";
import '../styles/css/AuthCode.css';
import CustomButton from "../components/CustomButton";
import { useNavigate, useLocation } from 'react-router-dom';
import Timer from "../components/common/Timer";
import { useVerifyEmailSend, useVerifyCodeCheck } from "../hooks/useAuth";
import { useToast } from "../components/common/ToastContext";

const AuthCode = () => {
    const { sendVerifyEmail, data: sendVerifyEmailData } = useVerifyEmailSend();
    const { verifyCodeCheck, data: verifyCodeCheckData, reset: resetCodeCheck } = useVerifyCodeCheck(); 

    // API 응답 data
    useEffect(() => {
      if(sendVerifyEmailData != null) {
        setAuthId(sendVerifyEmailData)
      }
    }, [sendVerifyEmailData])

    useEffect(() => {
      if(verifyCodeCheckData === true) {
        console.log("인증번호 동일여부: ", verifyCodeCheckData)
        nav("/login/reset-password", { 
          state: { email: sendVerifyEmailDto.email, authId: authId }
        });
      }
    }, [verifyCodeCheckData])

    const nav = useNavigate();
    const location = useLocation();
    const { showToast } = useToast();

    const [sendVerifyEmailDto, setSendVerifyEmailDto] = useState({
      email: "",
      purpose: 'FIND_PW',
    })
    const [authId, setAuthId] = useState();
    const [isFilledCode, setIsFilledCode] = useState(false);
    const [code, setCode] = useState("");

    const [timeOut, setTimeOut] = useState(false);
    const [timerKey, setTimerKey] = useState(0);
    const [codeTimeOut, setCodeTimeOut] = useState(false);
    const [codeTimerKey, setCodeTimerKey] = useState(0);

    const goBack = () => nav(-1);
    const length = 6;
    const [values, setValues] = useState(Array(length).fill(''));
    const inputs = useRef([]);
 
    // 이전화면에서 email 받아옴
    useEffect(() => {
      const emailState = location.state?.email
      if(emailState) {
        setSendVerifyEmailDto(prev => ({
          ...prev, email: emailState
        }));
      }
    }, [location.state]);

    // email에 값 들어왔을 시 sendEmail
    useEffect(() => {
      if(sendVerifyEmailDto.email) {
        sendEmail();
      }
    }, [sendVerifyEmailDto]);

    // 이메일 전송 API
    const sendEmail = async () => {
      try {
        await sendVerifyEmail(sendVerifyEmailDto); 
        showToast("인증코드를 전송했어요. 메일함을 확인해 주세요.");
      } catch (e) {console.log(e);}
    };

    // 이메일 인증번호 확인 API
    const checkEmail = async () => {
      if(codeTimeOut === false) {
        try {
          await verifyCodeCheck(authId, code)
        } catch (e) {console.log(e);}
      } 
      else {
        showToast("인증 코드가 만료되었습니다.");
      }
    };

    useEffect(() => {
      setIsFilledCode(values.every(val => val!=''));
      setCode(values.join(''));
      resetCodeCheck();
    }, [values])

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
        }
      };


      const handleResend = () => {
        setTimeOut(false);
        setTimerKey((prev) => prev + 1);
        sendEmail();
        setCodeTimeOut(false);
        setCodeTimerKey((prev) => prev + 1);
      };
    
    return (
        <div className="auth-code">
        <img 
            className="back-button"
            src="/assets/button/btn_back.svg" 
            onClick={goBack}
        />
        <div className='content-area'>
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
          <div className='content-info'>
            <p className="code-info">*전송된 인증코드는 3분 안에 인증이 만료됩니다</p>
            <p className="code-info">*메일을 받지 못하셨다면 스팸 메일함을 확인해 주세요</p>
            {verifyCodeCheckData === false && (
              <p className="code-error">*인증코드를 다시 확인해 주세요</p>
            )}
          </div>

          <CustomButton
              className='next-button' 
              text="다음" 
              isValid={isFilledCode}
              onClick={checkEmail}  
          />
          <div className="timer-container">
              <Timer className="timer" key={timerKey} initialSeconds={30} onTimeout={() => setTimeOut(true)} />
              
              <span className={`resend-button ${timeOut ? 'active' : 'disabled'}`}
                      onClick={timeOut ? handleResend : null}>
              재전송
              </span>
          </div>
          <p style={{ textAlign: 'center', marginTop:'80px'}}>*인증코드 확인 과정에 문제가 생기셨나요?
              <span onClick={() => window.open("http://pf.kakao.com/_Xexkxen", "_blank")}>문의하기</span>
          </p>
          <Timer className="hidden-timer" key={codeTimerKey} initialSeconds={180} onTimeout={() => setCodeTimeOut(true)} />
        </div>
        </div>
    )    
}

export default AuthCode;