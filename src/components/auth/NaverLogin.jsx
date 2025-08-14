import { useEffect } from "react";
import { useLoginNaver } from "../../hooks/useAuth";
import { useToast } from "../common/ToastContext";
import { useNavigate } from "react-router-dom";

const NaverLogin = () => {
    const NAVER_CLIENT_ID = 'bFykTJoiCevWHDXtcnwH';
    const REDIRECT_URI = `${window.location.origin}/login?platform=naver`;
    const { showToast } = useToast();
    const nav = useNavigate();
    
    const { loginNaver, loading, error, data: loginNaverData, reset } = useLoginNaver();
    
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
        } catch(err) { 
            showToast(err.message);
        }
    }

    // API response
    useEffect(()=> {
        if(loginNaverData != null) {
            localStorage.setItem("accessToken", loginNaverData.data?.tokenInfo.accessToken);
            localStorage.setItem("refreshToken", loginNaverData.data?.tokenInfo.refreshToken);

            if(loginNaverData.data?.userInfo.nickname === null) {
                // 취향등록
                nav("/signup/preference");
            }
            else {
                // 홈화면
                nav("/");
            }
        }
    }, [loginNaverData]);

    return (
        <img 
            className="naver-button"
            src="/assets/login/naver_login.svg" 
            onClick={handleNaverLogin}
        />
    )
    
}

export default NaverLogin;