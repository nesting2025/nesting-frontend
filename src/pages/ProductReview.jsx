import { useState, useRef, useEffect, use } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../styles/css/ProductReviewPage.css";
import CustomCheckbox from "../components/common/CustomCheckbox";
import Review from "../components/product/Review";

const ProductReview = () => {
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");
    const nav = useNavigate();

    const reviewCounts = 1996;
    const [openStatistics, setOpenStatistics] = useState(false); 
    const [photoReviewChecked, setPhotoReviewChecked] = useState(false);
    const [sort, setSort] = useState("추천순");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortRef = useRef();


    const [surveyData, setSurveyData] = useState({
        satisfaction : [
            {label: "기대 이상이에요", percent: 85},
            {label: "만족해요", percent: 3},
            {label: "기대보다 평범해요", percent: 2},
        ],
        realComparison: [
            {label: "실물이 더 좋아요", percent: 56},
            {label: "똑같아요", percent: 24},
            {label: "조금 달라요", percent: 20},
        ],
        recommend: [
            {label: "적극 추천해요", percent: 40},
            {label: "보통이에요", percent: 30},
            {label: "잘 모르겠어요", percent: 30},
        ]
    })

    const [reviews, setReviews] = useState([
        {
            profileImg: "/assets/icon/icon_default_profile.svg",
            nickname: "닉넴입니다아",
            date: "25.07.28",
            rating: 4,
            surveyData: [
                {title: "만족도", label: "기대 이상이에요"},
                {title: "실물비교", label: "실물이 더 좋아요"},
                {title: "추천의향", label: "적극 추천해요"},
            ],
            content: "사진 그대로예요. 보자마자 살 걸 후회했네여! 완전 레어한 아이템이라 너무 좋아요. 사진 그대로예요. 보자마자 살 걸 후회했네여! 완전 레어한 아이템이라 너무 좋아요",
            productImgList: ["/assets/sample/dummy_product.svg", "/assets/sample/dummy_product2.svg", "/assets/sample/dummy_product3.svg", "/assets/sample/dummy_product4.svg", "/assets/sample/dummy_product5.svg",]
        },
        {
            profileImg: "/assets/icon/icon_default_profile.svg",
            nickname: "닉네임전체노출",
            date: "25.07.28",
            rating: 5,
            surveyData: [
                {title: "만족도", label: "기대 이상이에요"},
                {title: "실물비교", label: "실물이 더 좋아요"},
                {title: "추천의향", label: "적극 추천해요"},
            ],
            content: "사진 그대로예요. 보자마자 살 걸 후회했네여! 완전 레어한 아이템이라 너무 좋아요. 사진 그대로예요. 보자마자 살 걸 후회했네여! 완전 레어한 아이템이라 너무 좋아요",
            productImgList: ""
        },
        {
            profileImg: "/assets/icon/icon_default_profile.svg",
            nickname: "닉네임전체노출222222",
            date: "25.07.28",
            rating: 1,
            surveyData: [
                {title: "만족도", label: "기대 이상이에요"},
                {title: "실물비교", label: "실물이 더 좋아요"},
                {title: "추천의향", label: "적극 추천해요"},
            ],
            content: "사진 그대로예요. 보자마자 살 걸 후회했네여! 완전 레어한 아이템이라 너무 좋아요. 사진 그대로예요. 보자마자 살 걸 후회했네여! 완전 레어한 아이템이라 너무 좋아요",
            productImgList: ["/assets/sample/dummy_product.svg", "/assets/sample/dummy_product2.svg", "/assets/sample/dummy_product3.svg"]
        },
    ])

    const filteredReviews = photoReviewChecked
        ? reviews.filter(review => review.productImgList && review.productImgList.length > 0)
        : reviews

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="product-review-page">
            <div className="header">
                <img 
                    className="back-button"
                    src="/assets/button/btn_back2.svg" 
                    onClick={() => nav(-1)}
                />
                <p>{type === "overseas" ? "네스터들의 해외구매 리뷰" : "이 상품의 리뷰"}</p>
            </div>

            {/* 평균 별점, 리뷰 건수 */}
            <div className='review-top-area'>
                <div className="top-area">
                    <p className='review-top-title'>평균 별점</p>
                    <div className='rating-star-row'>
                        <img className='star-img' src='/assets/icon/star.svg' />
                        <p className='review-top-content'>4.8</p>
                    </div>
                </div>
                <div className='diving-line3'></div>
                <div className="top-area">
                    <p className='review-top-title'>리뷰 건수</p>
                    <p className='review-top-content'>{reviewCounts.toLocaleString()}건</p>
                </div>
            </div>

            {/* 만족도, 실물비교, 추천의향 */}
            <div className="review-statistics-area">
                <div className="survey-area">
                    <div className="row">
                        <p className="title">만족도</p>
                        <ReviewPercent label={surveyData.satisfaction[0].label} percent={surveyData.satisfaction[0].percent} />
                    </div>
                    {openStatistics && (
                        <>
                        <div className="row">
                            <p className="title" />
                            <ReviewPercent label={surveyData.satisfaction[1].label} percent={surveyData.satisfaction[1].percent} />
                        </div>
                        <div className="row">
                            <p className="title" />
                            <ReviewPercent label={surveyData.satisfaction[2].label} percent={surveyData.satisfaction[2].percent} />
                        </div>
                        </>
                    )}
                </div>
                <div className="survey-area">
                    <div className="row">
                        <p className="title">실물비교</p>
                        <ReviewPercent label={surveyData.realComparison[0].label} percent={surveyData.realComparison[0].percent} />
                    </div>
                    {openStatistics && (
                        <>
                        <div className="row">
                            <p className="title" />
                            <ReviewPercent label={surveyData.realComparison[1].label} percent={surveyData.realComparison[1].percent} />
                        </div>
                        <div className="row">
                            <p className="title" />
                            <ReviewPercent label={surveyData.realComparison[2].label} percent={surveyData.realComparison[2].percent} />
                        </div>
                        </>
                    )}
                </div>
                <div className="survey-area">
                    <div className="row">
                        <p className="title">추천의향</p>
                        <ReviewPercent label={surveyData.recommend[0].label} percent={surveyData.recommend[0].percent} />
                    </div>
                    {openStatistics && (
                        <>
                        <div className="row">
                            <p className="title" />
                            <ReviewPercent label={surveyData.recommend[1].label} percent={surveyData.recommend[1].percent} />
                        </div>
                        <div className="row">
                            <p className="title" />
                            <ReviewPercent label={surveyData.recommend[2].label} percent={surveyData.recommend[2].percent} />
                        </div>
                        </>
                    )}
                </div>
                <p className="show-btn" onClick={() => setOpenStatistics(prev => !prev)}>{openStatistics ? "접기" : "자세히 보기"}</p>
            </div>

            <div className="diver" />

            {/* 리뷰 필터 */}
            <div className="filter-area">
                <CustomCheckbox label="포토 리뷰" checkbox={photoReviewChecked} onChange={() => setPhotoReviewChecked(prev => !prev)} className="photo-review" />
                <button  onClick={() => setIsSortOpen(prev => !prev)} >
                    <p>{sort}</p>
                    <img src="/assets/button/icon_arrow_down.svg"/>
                </button>
                {isSortOpen && 
                <div className="select-sort" ref={sortRef}>
                    <button className={sort === "추천순" ? "selected" : ""}
                        onClick={() => { setSort("추천순"); setIsSortOpen(false); }}>
                        추천순</button>
                    <div className="diver-sort" />
                    <button className={sort === "최신순" ? "selected" : ""}
                        onClick={() => { setSort("최신순"); setIsSortOpen(false); }}>
                        최신순</button>
                </div> }
                
            </div>

            {/* 리뷰 영역 */}
            <div className="reviews-area">
                {filteredReviews.length > 0 ? (
                    <>
                    {filteredReviews.map((review, index) => (
                        <Review profileImg={review.profileImg} nickname={review.nickname} date={review.date}
                        rating={review.rating} surveyData={review.surveyData} content={review.content} productImgList={review.productImgList} />
                    ))}
                    </>
                ) : (
                    <button className="no-photo-reviews">아직 작성된 포토 리뷰가 없어요</button>
                )}
                
            </div>

        </div>
    )
}

export default ProductReview;

const ReviewPercent = ( {label, percent }) => {
    return (
        <div className="review-percent">
            <p className="label">{label}</p>
            <div className="percent-bar-bg">
                <div className="percent-bar" style={{width: `${percent}%`}} />
            </div>
            <p className="percent">{percent}%</p>
        </div>
    )
}