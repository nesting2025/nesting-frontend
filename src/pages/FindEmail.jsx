import CustomButton from "../components/CustomButton";
import '../styles/css/FindEmail.css';

const FindEmail = () => {
    return (
        <div className="find-email">
        <img 
            className="back-button"
            src="/assets/button/btn_back.svg" 
        />
        <h2>이메일 찾기</h2>
        <p>이메일을 찾기 위해 본인 인증이 필요해요</p>
        <CustomButton className='next-button' text="본인 인증하고 이메일 찾기" isValid={true} />
        </div>
    )
}

export default FindEmail;