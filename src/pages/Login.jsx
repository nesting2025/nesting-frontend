import '../styles/css/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const nav = useNavigate();
    
    const goBack = () => nav("/");

    const gotoLoginNesting = () => {
        nav("/login/nesting");
    }

    return (
        <div className='login'>
        <img 
            className="back-button"
            src="/assets/button/btn_back.svg" 
            onClick={goBack}
        />
        <img 
            className="logo-img"
            src="/assets/logo_nesting_string.svg" 
        />
        <p>최애를 차곡차곡, 네스팅</p>
        <img 
            className="kakao-button"
            src="/assets/login/kakao_login.svg" 
        />
        <img 
            className="naver-button"
            src="/assets/login/naver_login.svg" 
        />
        <div className='diver'>
            <hr/>
            <span>또는</span>
        </div>
        <div className='nesting-button' onClick={gotoLoginNesting}>
            <img src='/assets/logo.svg '/>
            <p>네스팅 이메일 계정으로 시작하기</p>
        </div>
        </div>
    )
}

export default Login;