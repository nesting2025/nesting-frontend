import React, { useEffect, useState } from "react"
import { useLoginKakao } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import WelcomeDialog from "../../components/dialog/WelcomeDialog";

const KakaoLogin = () => {
    const nav = useNavigate();
    const { loginKakao, data: loginKakaoData } = useLoginKakao();
    const [isOpen, setIsOpen] = useState(false);  // 다이얼로그

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
        } catch(err) { console.log(err); }
    }

    // API data
    useEffect(() => {
        if(loginKakaoData != null) {
            localStorage.setItem("accessToken", loginKakaoData.data?.tokenInfo.accessToken);

            if(loginKakaoData.data?.socialId === null) {
                // 일반 계정 존재하지 않는 사람 -> 회원가입 / 로그인 진행
                localStorage.setItem("refreshToken", loginKakaoData.data?.tokenInfo.refreshToken);

                if(loginKakaoData.data?.userInfo.nickname === null) {
                    //nav("/signup/preference");  // 취향등록
                    setIsOpen(true);
                }
                else {
                    nav("/");  // 홈화면
                }
            }
            else {
                // 일반 계정 존재 -> 연동
                localStorage.setItem("socialId", loginKakaoData.data?.socialId);
                localStorage.setItem("socialType", "KAKAO");
                localStorage.setItem("socialLinkName", loginKakaoData.data?.userInfo.name);
                localStorage.setItem("socialLinkPhone", loginKakaoData.data?.userInfo.phone);

                const email = loginKakaoData.data?.userInfo.email;
                const type = "connect";

                nav(`/login/account-info?type=${type}`, { state : {email} });
            }
        }
    }, [loginKakaoData]);

    
    return (
        <>
        <img 
            className="kakao-button"
            src="/assets/login/kakao_login.svg" 
            onClick={handleKakaoLogin}
        />
        <WelcomeDialog open={isOpen} onOpenChange={setIsOpen} />
        </>
    )
}

export default KakaoLogin;