import { useEffect, useState } from "react";
import { useLoginNaver } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import WelcomeDialog from "../../components/dialog/WelcomeDialog";

const NaverLogin = () => {
    const NAVER_CLIENT_ID = 'bFykTJoiCevWHDXtcnwH';
    const REDIRECT_URI = `${window.location.origin}/login?platform=naver`;
    const nav = useNavigate();
    const [isOpen, setIsOpen] = useState(false);  // 다이얼로그
    
    const { loginNaver, data: loginNaverData } = useLoginNaver();
    
    useEffect(() => {
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        const state = url.searchParams.get("state");
        const platform = url.searchParams.get("platform");

        if(platform === "naver" && code && state) {
            console.log("네이버 코드:", code);
            console.log("state:", state);

            const savedState = sessionStorage.getItem("naver_state");
            if (state !== savedState) {
                alert("state 불일치 - 보안 경고");
                return;
            }

            // API 호출
            callLoginNaver(code, state);
        }       
    }, []);

    const handleNaverLogin = () => {
        const state = Math.random().toString(36).substring(2) + Date.now().toString(36);
        sessionStorage.setItem("naver_state", state);

        // SDK 초기화
        if(window.naver) {
            const naverLogin = new window.naver.LoginWithNaverId({
                clientId: NAVER_CLIENT_ID,
                callbackUrl: REDIRECT_URI,
                isPopup: false,
                loginButton: null,
                state: state,
            });

            naverLogin.init();
        }

        // 네이버 로그인 페이지 연결
        window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
        )}&state=${state}`;
    };


    const callLoginNaver =  async (code, state) => {
        try {
            await loginNaver(code, state);
        } catch(err) { console.log(err); }
    }

    // API response
    useEffect(()=> {
        if(loginNaverData != null) {
            localStorage.setItem("accessToken", loginNaverData.data?.tokenInfo.accessToken);

            if(loginNaverData.data?.socialId === null) {
                // 일반 계정 존재하지 않는 사람 -> 회원가입 / 로그인 진행
                localStorage.setItem("refreshToken", loginNaverData.data?.tokenInfo.refreshToken);

                if(loginNaverData.data?.userInfo.nickname === null) {
                    //nav("/signup/preference");  // 취향등록
                    setIsOpen(true);
                }
                else {
                    nav("/");  // 홈화면
                }
            }
            else {
                // 일반 계정 존재 -> 연동
                localStorage.setItem("socialId", loginNaverData.data?.socialId);
                localStorage.setItem("socialType", "NAVER");
                localStorage.setItem("socialLinkName", loginNaverData.data?.userInfo.name);
                localStorage.setItem("socialLinkPhone", loginNaverData.data?.userInfo.phone);

                const email = loginNaverData.data?.userInfo.email;
                const type = "connect";

                nav(`/login/account-info?type=${type}`, { state : {email} });
            }
        }
    }, [loginNaverData]);

    return (
        <>
        <img 
            className="naver-button"
            src="/assets/login/naver_login.svg" 
            onClick={handleNaverLogin}
        />
        <WelcomeDialog open={isOpen} onOpenChange={setIsOpen} />
        </>
    )
    
}

export default NaverLogin;