import { useState, useRef, useEffect } from "react";
import "../../styles/css/Review.css";

const Review = ({ review }) => {
    const totalStarts = 5;
    const [isMaximize, setIsMaximize] = useState(false);
    const [hasMaximized, setHasMaximized] = useState(false);

    const scrollRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const yy = date.getFullYear().toString().slice(-2);
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");

        return `${yy}.${mm}.${dd}`
    }

    const surveyTitleMap = {
        satisfaction: "만족도",
        originalComparison: "실물 비교",
        recommend: "추천 의향",
    }

    const surveryLabelMap = {
        satisfaction: {
            EXCELLENT: "기대 이상이에요",
            GOOD: "만족해요",
            NORMAL: "기대보다 평범해요",
        },
        originalComparison: {
            SAME: "똑같아요",
            DIFFERENT: "조금 달라요",
            GOOD: "실물이 더 좋아요",
        },
        recommend: {
            RECOMMEND: "적극 추천해요",
            NORMAL: "보통이에요",
            SOSO: "잘 모르겠어요",
        },
    }

    const handleScrollImg = () => {
        const scrollX = scrollRef.current.scrollLeft;  // 얼마나 스크롤했는지
        const containerWidth = scrollRef.current.offsetWidth;  // 요소의 보이는 너비
        const index = Math.round(scrollX/containerWidth);
        setCurrentIndex(index);
    }

    const handelScrollLeftImg = () => {
        if(scrollRef.current) {
            const containerWidth = scrollRef.current.offsetWidth;
            scrollRef.current.scrollBy({ left: -containerWidth, behavior: "smooth"});
        }
    }

    const handelScrollRightImg = () => {
        if(scrollRef.current) {
            const containerWidth = scrollRef.current.offsetWidth;
            scrollRef.current.scrollBy({ left: containerWidth, behavior: "smooth"});
        }
    }

    useEffect(() => {
        if (isMaximize && !hasMaximized && scrollRef.current) {
            const imgWidth = scrollRef.current.firstChild.offsetWidth;
            scrollRef.current.scrollTo({
                left: imgWidth * currentIndex,
                behavior: "instant", // 처음 크게 띄울 때는 즉시
            });
            setHasMaximized(true);
        }
    }, [isMaximize, currentIndex, hasMaximized]);
    
    return (
        <div className="review">
            <div className="top-row">
                <div className="user-info">
                    <img src={review.userInfo.profileImg ?? "/assets/icon/icon_default_profile.svg"} />
                    <p>{review.userInfo.nickname}</p>
                </div>

                <p className="date">{formatDate(review.createdAt)}</p>
            </div>

            <div className="rating-area">
                {[...Array(totalStarts)].map((_, index) => (
                    <img 
                    key={index}
                    src={index < review.score ?  "/assets/icon/star.svg" : "/assets/icon/star_default.svg"} /> 
                ))}
            </div>

            <div className="tag-area">
                {review.reviewSurveyInfo && Object.entries(review.reviewSurveyInfo).map(([key, value], index) => (
                    <div className="tag" key={index}>
                        <p>{surveyTitleMap[key]}</p>
                        <p>•</p>
                        <p className="tag-label">{surveryLabelMap[key][value]}</p>
                    </div>
                ))}
            </div>

            <p className="content-area">{review.content}</p>

            {review.imageUrl.length > 0 && (
                <>
                {isMaximize ? (
                    <div 
                        className="product-img-area-large"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}>
                        <div
                            className="product-img-scroll"
                            ref={scrollRef}
                            onScroll={handleScrollImg}>
                            {review.imageUrl.map((src, index) => (
                                <img
                                key={index}
                                className="product-img"
                                src={src} />
                            ))}

                        </div>
                        <img className="minimize-btn" src="/assets/icon/icon_minimize_img.svg" 
                        onClick={() =>{ 
                            setIsMaximize(false);
                            setHasMaximized(false);
                        }}/>
                        {isHovered && (
                            <>
                            <img 
                                className='scroll-button left' 
                                src='/assets/button/btn_left_transparent.svg'
                                onClick={handelScrollLeftImg} 
                            />
                            <img 
                                className='scroll-button right' 
                                src='/assets/button/btn_right_transparent.svg'
                                onClick={handelScrollRightImg} 
                            />
                            </>
                        )}
                        <div
                            className='img-indicator'>
                            <span className='highlight'>{currentIndex + 1}</span> | {review.imageUrl.length}
                        </div>
                    </div>
                ): (
                    <div className="product-img-area-small">
                        {review.imageUrl.map((imgSrc, index) => (
                            <div className="product-one-img" key={index}>
                                <img className="product-img" src={imgSrc} />
                                <img className="maximize-btn" src="/assets/icon/icon_maximize_img.svg" 
                                onClick={() => {
                                    setCurrentIndex(index)
                                    setIsMaximize(true)}
                                    } /> 
                            </div> 
                        ))}
                    </div>
                )}
                </>
            )}
        </div>
    )
}

export default Review;