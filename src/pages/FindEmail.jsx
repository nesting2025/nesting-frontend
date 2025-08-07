import CustomButton from "../components/CustomButton";
import '../styles/css/FindEmail.css';
import { useNavigate } from 'react-router-dom';

const FindEmail = () => {
    const nav = useNavigate();

    const goBack = () => nav(-1);
    const gotoVerify = () => {
        localStorage.setItem("returnTo", "accountInfo");
        nav("/verify");
    }

    return (
        <div className="find-email">
        <img 
            className="back-button"
            src="/assets/button/btn_back.svg" 
            onClick={goBack}
        />
        <div className="content-area">
            <h2>이메일 찾기</h2>
            <p>이메일을 찾기 위해 본인 인증이 필요해요</p>
            <CustomButton 
                className='next-button' 
                text="본인 인증하고 이메일 찾기" 
                isValid={true}
                onClick={gotoVerify} 
            />
        </div>
        </div>
    )
}

export default FindEmail;