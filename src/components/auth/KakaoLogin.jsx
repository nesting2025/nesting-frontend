import React, { useEffect } from "react"
import { useLoginKakao } from "../../hooks/useAuth";
import { useToast } from "../common/ToastContext";
import { useNavigate } from "react-router-dom";

const KakaoLogin = () => {
    const { showToast } = useToast();
    const nav = useNavigate();
    const { loginKakao, loading, error, data: loginKakaoData, reset } = useLoginKakao();

    useEffect(() => {
        if(window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init('9ef22dd90a15d9901f6fcdab77f0fa2f');
        }
    }, []);

    const handleKakaoLogin = () => {
        if(!window.Kakao) return alert("카카오 SDK가 로드되지 않았습니다.");

        window.Kakao.Auth.authorize({
            redirectUri: `${window.location.origin}/login?platform=kakao`, 
        });
    };

    // 프론트에서 인증 코드 받는 페이지에서 호출
    useEffect(() => {
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        const platform = url.searchParams.get("platform");

        if(platform === "kakao" &&  code) {
            console.log("카카오 코드: ",code);

            // API 호출
            callLoginKakao(code);
        }
    }, []);

    const callLoginKakao = async (code) => {
        try {
            await loginKakao(code);
        } catch(err) { 
            showToast(err.message);
        }
    }

    // API data
    useEffect(() => {
        if(loginKakaoData != null) {
            localStorage.setItem("accessToken", loginKakaoData.data?.tokenInfo.accessToken);
            localStorage.setItem("refreshToken", loginKakaoData.data?.tokenInfo.refreshToken);

            if(loginKakaoData.data?.userInfo.nickname === null) {
                // 취향등록
                nav("/signup/preference");
            }
            else {
                // 홈화면
                nav("/");
            }
        }
    }, [loginKakaoData]);

    
    return (
        <img 
            className="kakao-button"
            src="/assets/login/kakao_login.svg" 
            onClick={handleKakaoLogin}
        />
    )
}

export default KakaoLogin;