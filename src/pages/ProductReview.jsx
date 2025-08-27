import { useState, useRef, useEffect, use } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../styles/css/ProductReviewPage.css";
import CustomCheckbox from "../components/common/CustomCheckbox";
import Review from "../components/product/Review";
import { useGetReviewsProduct, useGetReviewsProxy, useGetReviewStatisticsProduct, useGetReviewStatisticsProxy } from "../hooks/useReviews";

const ProductReview = () => {
    const { getReviewsProxy, data: getReviewsProxyData } = useGetReviewsProxy();
    const { getReviewsProduct, data: getReviewsProductData } = useGetReviewsProduct();
    const { getReviewStatisticsProxy, data: getReviewStatisticsProxyData } = useGetReviewStatisticsProxy();
    const { getReviewStatisticsProduct, data: getReviewStatisticsProductData } = useGetReviewStatisticsProduct();

    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");
    const nav = useNavigate();
    const [openStatistics, setOpenStatistics] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortRef = useRef();

    const [getReviewsDto, setGetReviewsDto] = useState({
        productId: searchParams.get("id"),
        page: 0,
        size: 10,
        onlyPhoto: false,
        sortType: "RECOMMEND"
    })

    const [reviewsData, setReviewsData] = useState({
        reviewCounts: null,
        averageScore: null,
        reviews: null,
        surveyData: {
            satisfaction : [
                {label: "기대 이상이에요", percent: 0},
                {label: "만족해요", percent: 0},
                {label: "기대보다 평범해요", percent: 0},
            ],
            originalComparison: [
                {label: "실물이 더 좋아요", percent: 0},
                {label: "똑같아요", percent: 0},
                {label: "조금 달라요", percent: 0},
            ],
            recommend: [
                {label: "적극 추천해요", percent: 0},
                {label: "보통이에요", percent: 0},
                {label: "잘 모르겠어요", percent: 0},
            ]
        }
    });

    const surveyLabelMap = {
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

    const transformSurveyStatistics = (surveyStatistics) => {
        setReviewsData(prev => {
            const newSurveyData = {};

            Object.entries(prev.surveyData).forEach(([localKey, defaultItems]) => {
            const serverValues = surveyStatistics?.[localKey] || {};

            const items = defaultItems.map(item => {
                const serverLabelKey = Object.entries(surveyLabelMap[localKey] || {}).find(
                ([k, v]) => v === item.label
                )?.[0];

                const percent = serverLabelKey && serverValues[serverLabelKey] != null
                ? serverValues[serverLabelKey]
                : 0;

                return { label: item.label, percent };
            });

            // 내림차순 정렬 + 기본 순서 유지
            items.sort(
                (a, b) =>
                b.percent - a.percent ||
                defaultItems.findIndex(d => d.label === a.label) -
                defaultItems.findIndex(d => d.label === b.label)
            );

            newSurveyData[localKey] = items;
            });

            return { ...prev, surveyData: newSurveyData };
        });
    };

    // 리뷰 리스트 조회, 리뷰 통계 API
    useEffect(() => {
        if(type === "overseas") {
            getReviewsProxy(getReviewsDto);
            getReviewStatisticsProxy();
        } else if(type === "domestic") {
            getReviewsProduct(getReviewsDto);
            getReviewStatisticsProduct(getReviewsDto.productId);
        }
    }, [getReviewsDto])

    // API 응답
    useEffect(() => {
        if(getReviewsProxyData !== null) {
            setReviewsData(prev => ({...prev, 
                reviews: getReviewsProxyData.content}));
        }
        if(getReviewsProductData !== null) {
            setReviewsData(prev => ({...prev, 
                reviews: getReviewsProductData.content}));
        }
        if(getReviewStatisticsProxyData !== null) {
            setReviewsData(prev => ({...prev, 
                reviewCounts: getReviewStatisticsProxyData.totalCount, 
                averageScore: getReviewStatisticsProxyData.averageScore.toFixed(1)}),
            );
            transformSurveyStatistics(getReviewStatisticsProxyData.surveyStatistics);
        }
        if(getReviewStatisticsProductData !== null) {
            setReviewsData(prev => ({...prev, 
                reviewCounts: getReviewStatisticsProductData.totalCount,
                averageScore: getReviewStatisticsProductData.averageScore.toFixed(1)})
            );
            transformSurveyStatistics(getReviewStatisticsProductData.surveyStatistics);
        }
    }, [getReviewsProxyData, getReviewsProductData, getReviewStatisticsProxyData, getReviewStatisticsProductData])

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
                        <p className='review-top-content'>{reviewsData.averageScore}</p>
                    </div>
                </div>
                <div className='diving-line3'></div>
                <div className="top-area">
                    <p className='review-top-title'>리뷰 건수</p>
                    <p className='review-top-content'>{reviewsData.reviewCounts?.toLocaleString()}건</p>
                </div>
            </div>

            {/* 만족도, 실물비교, 추천의향 */}
            <div className="review-statistics-area">
                <div className="survey-area">
                    <div className="row">
                        <p className="title">만족도</p>
                        <ReviewPercent label={reviewsData.surveyData.satisfaction?.[0]?.label} percent={reviewsData.surveyData.satisfaction?.[0]?.percent} />
                    </div>
                    {openStatistics && (
                        <>
                        <div className="row">
                            <p className="title" />
                            <ReviewPercent label={reviewsData.surveyData.satisfaction?.[1]?.label} percent={reviewsData.surveyData.satisfaction?.[1]?.percent} />
                        </div>
                        <div className="row">
                            <p className="title" />
                            <ReviewPercent label={reviewsData.surveyData.satisfaction?.[2]?.label} percent={reviewsData.surveyData.satisfaction?.[2]?.percent} />
                        </div>
                        </>
                    )}
                </div>
                <div className="survey-area">
                    <div className="row">
                        <p className="title">실물비교</p>
                        <ReviewPercent label={reviewsData.surveyData.originalComparison?.[0]?.label} percent={reviewsData.surveyData.originalComparison?.[0]?.percent} />
                    </div>
                    {openStatistics && (
                        <>
                        <div className="row">
                            <p className="title" />
                            <ReviewPercent label={reviewsData.surveyData.originalComparison?.[1]?.label} percent={reviewsData.surveyData.originalComparison?.[1]?.percent} />
                        </div>
                        <div className="row">
                            <p className="title" />
                            <ReviewPercent label={reviewsData.surveyData.originalComparison?.[2]?.label} percent={reviewsData.surveyData.originalComparison?.[2]?.percent} />
                        </div>
                        </>
                    )}
                </div>
                <div className="survey-area">
                    <div className="row">
                        <p className="title">추천의향</p>
                        <ReviewPercent label={reviewsData.surveyData.recommend?.[0]?.label} percent={reviewsData.surveyData.recommend?.[0]?.percent} />
                    </div>
                    {openStatistics && (
                        <>
                        <div className="row">
                            <p className="title" />
                            <ReviewPercent label={reviewsData.surveyData.recommend?.[1]?.label} percent={reviewsData.surveyData.recommend?.[1]?.percent} />
                        </div>
                        <div className="row">
                            <p className="title" />
                            <ReviewPercent label={reviewsData.surveyData.recommend?.[2]?.label} percent={reviewsData.surveyData.recommend?.[2]?.percent} />
                        </div>
                        </>
                    )}
                </div>
                <p className="show-btn" onClick={() => setOpenStatistics(prev => !prev)}>{openStatistics ? "접기" : "자세히 보기"}</p>
            </div>

            <div className="diver" />

            {/* 리뷰 필터 */}
            <div className="filter-area">
                <CustomCheckbox label="포토 리뷰" checkbox={getReviewsDto.onlyPhoto} onChange={() => setGetReviewsDto(prev => ({...prev, onlyPhoto: !prev.onlyPhoto}))} className="photo-review" />
                <button  onClick={() => setIsSortOpen(prev => !prev)} >
                    <p>{getReviewsDto.sortType === "RECOMMEND" ? "추천순" : "최신순"}</p>
                    <img src="/assets/button/icon_arrow_down.svg"/>
                </button>
                {isSortOpen && 
                <div className="select-sort" ref={sortRef}>
                    <button className={getReviewsDto.sortType === "RECOMMEND" ? "selected" : ""}
                        onClick={() => { setGetReviewsDto(prev => ({...prev, sortType: "RECOMMEND"})); setIsSortOpen(false); }}>
                        추천순</button>
                    <div className="diver-sort" />
                    <button className={getReviewsDto.sortType === "LATEST" ? "selected" : ""}
                        onClick={() => { setGetReviewsDto(prev => ({...prev, sortType: "LATEST"})); setIsSortOpen(false); }}>
                        최신순</button>
                </div> }
                
            </div>

            {/* 리뷰 영역 */}
            <div className="reviews-area">
                {reviewsData.reviews?.length > 0 ? (
                    <>
                    {reviewsData.reviews.map((review, index) => (
                        <Review key={index} review={review} />
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