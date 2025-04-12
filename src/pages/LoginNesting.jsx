import '../styles/css/LoginNesting.css';
import CustomButton from "../components/CustomButton";

const LoginNesting = () => {
    return (
        <div className="login-nesting">
        <img 
            className="back-button"
            src="/assets/button/btn_back.svg" 
        />
        <img 
            className="logo-img"
            src="/assets/logo_nesting_string.svg" 
        />
        <p>최애를 차곡차곡, 네스팅</p>
        <input
            className="input-email"
            placeholder="이메일"
        />
        <input
            className="input-pw"
            placeholder="비밀번호"
        />
        <label className='keep-login'>
            <input type="checkbox" />
            <span className='checkmark' />
            로그인 상태 유지
        </label>
        <div className='link-group'>
            <p>이메일 찾기</p>
            <span>|</span>
            <p>비밀번호 찾기</p>
            <span>|</span>
            <p>회원가입</p>
        </div>
        <CustomButton text="로그인" />
        </div>
    )
}

export default LoginNesting;