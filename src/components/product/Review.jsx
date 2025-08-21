import { useState, useRef, useEffect } from "react";
import "../../styles/css/Review.css";

const Review = ({ profileImg, nickname, date, rating, surveyData, content, productImgList}) => {
    const totalStarts = 5;
    const [isMaximize, setIsMaximize] = useState(false);
    const [hasMaximized, setHasMaximized] = useState(false);

    const scrollRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

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

    // useEffect 추가
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
                    <img src={profileImg} />
                    <p>{nickname}</p>
                </div>

                <p className="date">{date}</p>
            </div>

            <div className="rating-area">
                {[...Array(totalStarts)].map((_, index) => (
                    <img 
                    key={index}
                    src={index < rating ?  "/assets/icon/star.svg" : "/assets/icon/star_default.svg"} /> 
                ))}
            </div>

            <div className="tag-area">
                {surveyData.map((data) => (
                    <div className="tag">
                        <p>{data.title}</p>
                        <p>•</p>
                        <p className="tag-label">{data.label}</p>
                    </div>
                ))}
            </div>

            <p className="content-area">{content}</p>

            {productImgList && (
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
                            {productImgList.map((src, index) => (
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
                            <span className='highlight'>{currentIndex + 1}</span> | {productImgList.length}
                        </div>
                    </div>
                ): (
                    <div className="product-img-area-small">
                        {productImgList.map((imgSrc, index) => (
                            <div className="product-one-img">
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