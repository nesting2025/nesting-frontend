import '../styles/css/SignupNesting.css';
import CustomButton from "../components/CustomButton";
import CustomCheckbox from '../components/common/CustomCheckbox';
import CustomCheckOnly from '../components/common/CustomCheckOnly';
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useCheckValidEmail } from '../hooks/useAuth';
import debounce from 'lodash.debounce';

const SignupNesting = () => {
    const { checkValidEmail, data: checkValidEmailData, reset } = useCheckValidEmail();

    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const prevEmail = useRef("");
    const [pw, setPw] = useState("");
    const [pwConfirm, setPwConfirm] = useState("");
    
    // 이메일, 비번, 비번확인 error
    const [showEmailError, setShowEmailError] = useState(false);
    const [showPwError, setShowPwError] = useState(false);
    const [showPwConfirmError, setPwConfirmError] = useState(false);

    // 비번, 비번확인 visibility
    const [showPw, setShowPw] = useState(false);
    const [showPwConfirm, setShowPwConfirm] = useState(false);

    // 이용약관
    const [allChecked, setAllChecked] = useState(false);
    const [agreements, setAgreements] = useState([
        {id: 1, label: (<>만 14세 이상, <span className='underline' onClick={() => nav("/signup/nesting/agreement", { state: { type: "nesting" } })}>이용약관</span> 동의 (필수)</>), 
        required: true, checked: false},
        {id: 2, label: (<><span className='underline' onClick={() => nav("/signup/nesting/agreement", { state: { type: "terms" } })}>전자상거래 이용 약관</span> 동의 (필수)</>), 
            required: true, checked: false},
        {id: 3, label: (<><span className='underline' onClick={() => nav("/signup/nesting/agreement", { state: { type: "privacy" } })}>개인정보 수집 및 이용</span> 동의 (필수)</>), 
            required: true, checked: false},
        {id: 4, label: (<><span className='underline' onClick={() => nav("/signup/nesting/agreement", { state: { type: "marketing" } })}>마케팅 목적의 개인정보 수집 및 이용</span> 동의 (선택)</>)
            ,required:false, checked: false
        },
        {id: 5, label: (<><span className='underline' onClick={() => nav("/signup/nesting/agreement", { state: { type: "marketingReceiveInfo" } })}>마케팅 수신</span> 동의 (선택)</>), 
            required:false, checked: false,
            children: [
                {type: "sms", label: "SMS", checked: false},
                {type: "email", label: "이메일", checked: false}
            ]
        }
    ])

    const goBack = () => nav(-1);
    const gotoVerify = () => nav("/verify");

    // 이메일 중복 체크 API
    const checkEmailDuplicate = async (email) => {
        try {
            await checkValidEmail(email);
        } catch (e) {console.log(e);}
    }

    const debouncedCheck = useCallback(
        debounce((email) => {
            if(email.includes("@") && email.includes(".com") && !showEmailError) {
                checkEmailDuplicate(email);
            }
        }, 500), [checkEmailDuplicate]
    );

    useEffect(() => {
        reset(); 
        if(!email) return;
        if(prevEmail.current === email) return;

        debouncedCheck(email);
        prevEmail.current = email;

        return () => {
            debouncedCheck.cancel();
        };
    }, [email]);

    // 댜음 버튼 활성화
    const isFormValid = useMemo(() => {
        const requiredChecked = agreements
            .filter(item => item.required)
            .every(item => item.checked);

        return (
            !showEmailError && !showPwError && !showPwConfirmError &&
            email && pw && pwConfirm && requiredChecked && checkValidEmailData
        );
    }, [showEmailError, showPwError, showPwConfirmError, email, pw, pwConfirm, agreements, checkValidEmailData]);
    

    useEffect(()=> {
        if(pwConfirm) {
            setPwConfirmError(pw !== pwConfirm);
        }
    }, [pw, pwConfirm]);


    // 이메일 관련 함수
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        if(value && !isValidEmail) {
            setShowEmailError(true);
        }
        else {
            setShowEmailError(false);
        }
    }

    const clearInput = () => {
        setEmail("");
        setShowEmailError(false);
        reset();
    }

    // pw 관련 함수
    const handlePwChange = (e) => {
        const value = e.target.value;
        setPw(value);

        const regex = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d!@#$%^&*()_+{}\\[\\]:;<>,.?~/-]{8,16}$");
        const isValidPw = regex.test(value);

        setShowPwError(value && !isValidPw);
    }

    const handlePwConfirmChange = (e) => {
        const value = e.target.value;
        setPwConfirm(value);
    }

    const toggleVisibility = (setter) => {
        setter(prev => !prev);
    }
    const togglePwVisibility = () => toggleVisibility(setShowPw)
    const togglePwConfirmVisibility = () => toggleVisibility(setShowPwConfirm)

    // 이용약관 관련 함수
    const handleAllChange = (e) => {
        const checked = e.target.checked;;
        setAllChecked(checked);
        setAgreements(prev => 
            prev.map(item => ({
            ...item,
            checked: checked,
            children: item.children
                ? item.children.map(child => ({
                    ...child,
                    checked: checked
                }))
                : undefined
        }))
        );
    };

    const handleSingleChange = (id) => (e) => {
        const checked = e.target.checked;
        setAgreements(prev =>
            prev.map(item => {
                if(item.id === id) {
                    if(item.children) {
                        return {
                            ...item,
                            checked: checked,
                            children: item.children.map(child =>({...child, checked: checked}))
                        };
                    }
                    return {
                        ...item, checked: checked
                    };
                }
                return item;
            })
        );
    };

    const handleChildChange = (type) => (e) => {
        const isChecked = e.target.checked;

        setAgreements(prev =>
            prev.map(item => {
                if(item.id !== 5) return item;

                const updatedChildren = item.children.map(c =>
                    c.type === type ? {...c, checked: isChecked} : c
                );

                const hasAnyChecked = updatedChildren?.some(c => c.checked);

                return {
                    ...item,
                    checked: hasAnyChecked,
                    children: updatedChildren
                }
            })
        )
    }

    useEffect(() => {
        const all = agreements.every(item => item.checked);
        setAllChecked(all);
    }, [agreements]);


    return (
        <div className="signup-nesting">
        <img 
            className="back-button"
            src="/assets/button/btn_back.svg" 
            onClick={goBack}
        />
        <div className='content-area'>
            <h2>회원가입</h2>
            <h5>이메일 주소</h5>
            <div className='input-wrapper'>
                <input
                    className="input-email"
                    placeholder="ex) nesting@nesting.co.kr"
                    value={email}
                    onChange={handleEmailChange}
                />
                {email && (
                    <img
                        className='input-button'
                        src='/assets/button/btn_x2.svg' 
                        onClick={clearInput}
                    />
                )}
            </div>
            {showEmailError && (
                    <div className='email-error-message'>이메일 형식으로 입력해주세요.</div>
                )}
            {email && checkValidEmailData === false && (
                <div className='email-error-message duplicate'>이미 가입한 계정입니다. 로그인을 진행해 주세요.</div>
            )}
            <h5>비밀번호</h5>
            <div className='input-wrapper'>
                <input
                    className="input-pw"
                    placeholder="영문, 숫자 조합 8-16자"
                    type={showPw ? "text" : "password"}
                    value={pw}
                    onChange={handlePwChange}
                />
                {pw && (
                    <img
                        className='input-button'
                        src={showPw ? '/assets/button/btn_eye_off.svg' : '/assets/button/btn_eye.svg'}
                        onClick={togglePwVisibility} 
                    />
                )}
            </div>
            {showPwError && (
                <div className='pw-error-message'>영문 포함,숫자 포함, 8-16자 이내</div>
            )}
            <h5>비밀번호 확인</h5>
            <div className="input-wrapper">
                <input
                    className="input-pw-confirm"
                    placeholder="영문, 숫자 조합 8-16자"
                    type={showPwConfirm ? "text" : "password"}
                    value={pwConfirm}
                    onChange={handlePwConfirmChange}
                />
                {pwConfirm && (
                    <img
                        className='input-button'
                        src={showPwConfirm ? '/assets/button/btn_eye_off.svg' : '/assets/button/btn_eye.svg'}
                        onClick={togglePwConfirmVisibility}
                    />
                )}
            </div>
            {showPwConfirmError && (
                <div className="pw-confirm-error-message">비밀번호를 다시 확인해 주세요.</div>
            )}

            <div className='agree-all-checkbox'>
                <CustomCheckbox 
                    label={<>모두 동의합니다.<br/><span className='text-light'>선택 동의 항목 포함</span></>}
                    checked={allChecked}
                    onChange={handleAllChange}
                    className='agree-all' 
                    />
            </div>

            <div className='agree-list'>
                {agreements.map((item, index) => (
                    <CustomCheckbox
                    key={index}
                    label={item.label}
                    checked={item.checked}
                    onChange={handleSingleChange(item.id)}
                    className='agree-checkbox' 
                    />
                ))}
            </div>
            <div className='marketing-receive-area'>
                <CustomCheckOnly 
                    label={agreements[4].children[0].label}
                    checked={agreements[4].children[0].checked}
                    onChange={handleChildChange("sms")} 
                />
                <CustomCheckOnly 
                    label={agreements[4].children[1].label}
                    checked={agreements[4].children[1].checked}
                    onChange={handleChildChange("email")} 
                />
            </div>
            
            <CustomButton 
                className='signup-next-button' 
                text="다음" 
                isValid={isFormValid}
                onClick={gotoVerify} 
            />
        </div>
        </div>
    )
}

export default SignupNesting;