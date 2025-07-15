import "../styles/css/CTAButton.css";
import { useState } from "react";

const CTAButton =( {isSoldout} ) => {
    const [isLike, setIsLiked] = useState(false);
    

    const likeImgSrc = isSoldout ? "/assets/button/like_btn2_disabled.svg"
    : isLike ? "/assets/button/like_btn2_pressed.svg" 
    : "/assets/button/like_btn2_default.svg";
    
    return (
        <div className="cta-button-area">
            <button 
            onClick={() => setIsLiked(prev => !prev)}
            className="liket-btn"
            disabled={isSoldout}
            >
                <img 
                    className={`like-img ${isSoldout ? "soldout" : ""}`}
                    src={likeImgSrc}
                />
            </button>
            <button className={`show-buy-bottomsheet ${isSoldout ? "soldout" : ""}`}>
                {isSoldout ? "품절된 상품이에요" : "구매하기"}
            </button>
        </div>
    )
}

export default CTAButton;