import "../styles/css/Agreement.css";
import { useLocation, useNavigate } from "react-router-dom";
import { agreementText1, agreementText2, 
    agreementPrivacyText1, agreementPrivacyText2, 
    agreementPrivacyText3, agreementPrivacyText4, agreementPrivacyText5  } from "../text";

const Agreement = () => {
    const nav = useNavigate();
    const location = useLocation();
    const type = location.state?.type || "terms";
    console.log(type);

    let title="";
    let content="";

    switch(type) {
        case "terms":
            title = "전자상거래 이용 약관";
            content = agreementText1;
            break;
        case "nesting":
            title = "네스팅 이용 약관";
            content = agreementText2;
            break;
        case "privacy":
            title = "개인정보 처리방침";
            content = "";
            break;
        default:
            title = "전자상거래 이용 약관";
            content = agreementText1;
            break; 
    }

    const goBack = () => nav(-1);

    return (
        <div className="agreement">
            <div className="header">
                <img 
                    className="back-button"
                    src="/assets/button/btn_back.svg" 
                    onClick={goBack}
                />
                <p>{title}</p>
            </div>
            <div className="content-area">
                {content && 
                    <div className="text-area">
                        <p>{content}</p> 
                    </div>
                }
                {type === "privacy" && (
                    <>
                    <p>{agreementPrivacyText1}</p>
                    <div className="line" />
                    <p>{agreementPrivacyText2}</p>
                    <img src="/assets/agreement_img1.svg" />
                    <p>{agreementPrivacyText3}</p>
                    <h3>개인정보 제3자 제공 현황</h3>
                    <img src="/assets/agreement_img2.svg" className="img2" />
                    <p>{agreementPrivacyText4}</p>
                    <img src="/assets/agreement_img3.svg" />
                    <p>{agreementPrivacyText5}</p>
                    </>
                )}
            </div>

        </div>
    )
}

export default Agreement;