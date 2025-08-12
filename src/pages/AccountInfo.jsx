import CustomButton from "../components/CustomButton";
import '../styles/css/AccountInfo.css';
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

const AccountInfo = () => {
    const location = useLocation();
    const email = location.state?.email ?? "";
    const nav = useNavigate();
    // type == "connect" or "found"
    const [searchParam] = useSearchParams();
    const type = searchParam.get("type") || "connect";
    const isConnect = type === "connect";

    const goBack = () => nav(-1);
    const gotoNextPage = () => {
        if(isConnect) {
            // 본인인증 화면으로
        }
        else {
            nav("/login/nesting", {replace: true});
        }
    }
    const gotoFindPassword = () => nav("/login/find-password", { state: { email: email } });

    return (
        <div className="account-info">
        <img 
            className="back-button"
            src="/assets/button/btn_back.svg" 
            onClick={goBack}
        />
        <div className="content-area">
            <h2>{isConnect ? (<>이미 가입한 아이디가 있어요.<br/>아이디를 SNS 계정과 연결해 드릴게요!</>) : "회원님의 이메일 아이디를 찾았어요"}</h2>
            <div className="info-area">
                <img 
                    className="profile-img"
                    src="/assets/character=hellokitty, status=small.png"
                />
                <div className="text-area">
                    <p className="email-text">이메일 아이디</p>
                    <p className="email">{email}</p>
                </div>
            </div>

            <CustomButton 
            className='next-button' 
            text={isConnect? "본인 인증하고 연결하기" : "로그인하러 가기"} 
            isValid={true}
            onClick={gotoNextPage} />

            {!isConnect && (
                <p 
                onClick={gotoFindPassword}
                className="find-pw-text">비밀번호 찾기</p>
            )}
        </div>
        </div>
    )
}

export default AccountInfo;