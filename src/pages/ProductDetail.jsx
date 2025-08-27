import '../styles/css/ProductDetail.css';
import ProductReview from '../components/ProductReview';
import ProductSlider from '../components/goods/ProductSlider';
import useScreenSize from '../hooks/useScreenSize';
import Footer from '../components/layout/Footer';
import CTAButton from '../components/CTAButton';
import { useState, useRef, useEffect, use } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import {
  shippingPolicyText1,
  shippingPolicyText2,
  shippingPolicyText3,

  returnPolicyText1,
  returnPolicyText2,
  returnPolicyText3,
  returnPolicyText4,
  returnPolicyText5,

  transactionInfoText1,
  transactionInfoText2
} from '../text';
import { useGetProductDetail, useGetProductList, usePostProductView } from '../hooks/useProducts';
import { useGetReviewsProduct, useGetReviewsProxy } from '../hooks/useReviews';

const ProductDetail = ( ) => {
    const { getProductDetail, data: getProductDetailData } = useGetProductDetail();
    const { postProductView, data: postProductViewData } = usePostProductView();
    const { getProductList, data: getProductListData} = useGetProductList();
    const { getReviewsProxy, data: getReviewsProxyData } = useGetReviewsProxy();
    const { getReviewsProduct, data: getReviewsProductData } = useGetReviewsProduct();

    const nav = useNavigate();
    const location = useLocation();
    const {screenSize} = useScreenSize();

    const [productInfo, setProductInfo] = useState({
        isOverseas: null,
        shipping: null,
        shippingInfo: null,
        reviewTitle: null,
        reviewCounts: null,
        reviews: null
    })

    const [getProductListDto, setGetProductListDto] = useState({
        page: "0",
        size: "18",
        sortType: "LIKE_HIGH",
        includeSoldOut: true,
        category: null,
        type: null,
        price: null,
        search: null,
    });
    
    const [getReviewsDto, setGetReviewsDto] = useState({
        productId: null,
        page: 0,
        size: 10,
        onlyPhoto: false,
        sortType: "RECOMMEND"
    })
    

    useEffect(() => {
        window.scrollTo(0,0);
        const productId = location.state?.productId;
        if(productId) {
            handleGetProductDetail(productId);
            handlePostProductView(productId);
        }
    }, [location.state?.productId]);

    // 상품 상세 조회 API
    const handleGetProductDetail = async (id) => {
        try {
            await getProductDetail(id);
        } catch(e) { console.log(e); }
    }
    // 상품 조회 로그 저장 API
    const handlePostProductView = async (id) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            if(!accessToken) return; // 로그인한 회원인 경우에만 API 호출 

            await postProductView(id);
        } catch(e) { console.log(e); }
    }
    // API 응답
    useEffect(() => {
        if(getProductDetailData !== null) {
            setProductInfo(prev => ({
                ...prev, isOverseas: getProductDetailData.sourceType === "PROXY",
                shipping: getProductDetailData.sourceType === "PROXY" ? "해외배송・롯데택배" : "국내배송・로젠택배",
                shippingInfo: getProductDetailData.sourceType === "PROXY" ? <>네스팅의 평균 해외배송 기간은 <span>9일 이내</span>입니다.</> : <>네스팅의 평균 국내배송 기간은 <span>3일 이내</span>입니다.</>,
                reviewTitle: getProductDetailData.sourceType === "PROXY" ? "네스터들의 해외구매 리뷰" : "이 상품의 리뷰"
            }));

            console.log(getProductDetailData.category
                    ?.filter(cat => cat !== "산리오")  // 일단은 서브 카테고리가 존재하는 메인카테고리는 산리오밖에 없음 (서브카테고리가 있는 경우 메인카테고리를 제외하고 category 지정)
                    .join(",") );

            setGetProductListDto(prev => ({
                ...prev, category: getProductDetailData.category
                    ?.filter(cat => cat !== "산리오")  // 일단은 서브 카테고리가 존재하는 메인카테고리는 산리오밖에 없음 (서브카테고리가 있는 경우 메인카테고리를 제외하고 category 지정)
                    .join(",") 
            }));

            setGetReviewsDto(prev => ({
                ...prev, productId: getProductDetailData.id
            }))
        }
    }, [getProductDetailData]);

    useEffect(() => {
        if(getReviewsProxyData !== null) {
            setProductInfo(prev => ({
                ...prev, reviewCounts: getReviewsProxyData.numberOfElements,
                reviews: getReviewsProxyData.content
            }));
        } 
        if(getReviewsProductData !== null) {
            setProductInfo(prev => ({
                ...prev, reviewCounts: getReviewsProductData.numberOfElements,
                reviews: getReviewsProductData.content
            }));
        }
    }, [getReviewsProxyData, getReviewsProductData])

    useEffect(() => {
        // 연관 상품 리스트 조회 API
        if(getProductListDto.category !== null) {
            getProductList(getProductListDto);
        }
        
        // 리뷰 조회 API
        if(getProductDetailData?.sourceType === "PROXY") {
            console.log(getReviewsDto);
            getReviewsProxy(getReviewsDto);
        } else if (getProductDetailData?.sourceType === "STOCKED" && getReviewsDto.productId !== null) {
            console.log(getReviewsDto);
            getReviewsProduct(getReviewsDto);
        }
    }, [getProductListDto, getReviewsDto])


    // 해외인지 국내인지에 따라 다르게 변수 매핑
    const productDetialInfo = [
        {label: '굿즈 유형', value: getProductDetailData?.type},
        {label: '상품 상태', value: getProductDetailData?.condition},
        {label: '수량', value: getProductDetailData?.stock},
    ]
    const localProductDetialInfo = [
        {label: '굿즈 유형', value: getProductDetailData?.type},
        {label: '상품 상태', value: getProductDetailData?.condition},
        {label: '크기', value: getProductDetailData?.size},
        {label: '제조사', value: getProductDetailData?.manufacturer}
    ]

    // const reviews = [
    //     {
    //         rating: 2,
    //         nickname: "닉네임뒤세글자",
    //         content: "흠냐..글쎄용.",
    //         photo: "/assets/sample/dummy_product2.svg"
    //     },
    //     {
    //         rating: 5,
    //         nickname: "닉네임뒤세글자",
    //         content: "사진 그대로예요. 보자마자 살 걸 후회했네여! 완전 레어한 아이템이라 너무 좋아요-리뷰 텍스트 영역은 마찬가지로 최대 3줄 노출합니다라라라라라",
    //         photo: ""
    //     },
    //     {
    //         rating: 5,
    //         nickname: "닉네임뒤세글자",
    //         content: "사진 그대로예요. 보자마자 살 걸 후회했네여! 완전 레어한 아이템이라 너무 좋아요-리뷰 최대 3줄 노출합니다",
    //         photo: "/assets/sample/dummy_product2.svg"
    //     },
    // ]

    const tabList = ['제품 상세', `리뷰 ${productInfo?.reviewCounts?.toLocaleString() ?? 0}`, '상품 구매 안내']

    const RecommendedProducts = [
        {
        id: 1,
        title: "레옹 짱구와 마틸다 힌둥",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: false,
        imageUrl: "/assets/sample/dummy_product2.svg",
        },
        {
        id: 2,
        title: "짱구2-상품명은무조건한줄처리",
        price: 8000,
        discount: 0,
        isOverseas: false,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product3.svg",
        },
        {
        id: 3,
        title: "짱구2-상품명은무조건한줄처리",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product4.svg",
        },
        {
        id: 4,
        title: "짱구2-상품명은무조건한줄처리",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product5.svg",
        },
        {
        id: 5,
        title: "상품명 최대 1줄 노출 길이 테스트",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product6.svg",
        },
        {
        id: 6,
        title: "상품명 최대 1줄 노출 길이 테스트",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product7.svg",
        },
        {
        id: 7,
        title: "레옹 짱구와 마틸다 힌둥",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: false,
        imageUrl: "/assets/sample/dummy_product2.svg",
        },
        {
        id: 8,
        title: "짱구2-상품명은무조건한줄처리",
        price: 8000,
        discount: 0,
        isOverseas: false,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product3.svg",
        },
        {
        id: 9,
        title: "짱구2-상품명은무조건한줄처리",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product4.svg",
        },
        {
        id: 10,
        title: "짱구2-상품명은무조건한줄처리",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product5.svg",
        },
        {
        id: 11,
        title: "상품명 최대 1줄 노출 길이 테스트",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product6.svg",
        },
        {
        id: 12,
        title: "상품명 최대 1줄 노출 길이 테스트",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product7.svg",
        },
        {
        id: 13,
        title: "레옹 짱구와 마틸다 힌둥",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: false,
        imageUrl: "/assets/sample/dummy_product2.svg",
        },
        {
        id: 14,
        title: "짱구2-상품명은무조건한줄처리",
        price: 8000,
        discount: 0,
        isOverseas: false,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product3.svg",
        },
        {
        id: 15,
        title: "짱구2-상품명은무조건한줄처리",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product4.svg",
        },
        {
        id: 16,
        title: "짱구2-상품명은무조건한줄처리",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product5.svg",
        },
        {
        id: 17,
        title: "상품명 최대 1줄 노출 길이 테스트",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product6.svg",
        },
        {
        id: 18,
        title: "상품명 최대 1줄 노출 길이 테스트",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product7.svg",
        },
    ];

    const [isHovered, setIsHovered] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef(null);

    const [currentProductIndex, setCurrentProductIndex] = useState(0);
    const productScrollRef = useRef(null);

    const [showMoreDeliveryInfo, setShowMoreDeliveryInfo] = useState(false);
    const [showReturnPolicy, setShowReturnPolicy] = useState(false);
    const [showTransactionInfo, setShowTransactionInfo] = useState(false);
    const [showProductInfo, setShowProductInfo] = useState(false);

    const imgWrapperRef = useRef(null);
    const [showAllImages, setShowAllImages] = useState(false);

    const [activeTab, setActiveTab] = useState(0);
    const sectionRefs = [
        useRef(null),
        useRef(null),
        useRef(null)
    ]
    const tabRef = useRef(null);
    const stopStickyRef = useRef(null);
    const [isStickyOff, setIsStickyOff] = useState(false);
    const isStickyOffRef = useRef(false);

    const handleNavigate = () => {
        nav(`/product/review?type=${productInfo.isOverseas ? "overseas" : "domestic"}&id=${getProductDetailData?.id}`);
    } 


    useEffect(() => {
        // 사용자가 스크롤할 때 현재 탭을 업데이트
        const handleScrollTab = () => {
            const scrollY = window.scrollY;
            
            sectionRefs.forEach((ref, index) => {
                const offsetTop = ref.current.offsetTop;
                const offsetHeight = ref.current.offsetHeight;

                if(scrollY >= offsetTop - 96 && scrollY < offsetTop + offsetHeight - 96) {
                    setActiveTab(index);
                }
            })

            
            // 스티키 해제 관련 코드
            if(!tabRef.current || !stopStickyRef.current) return;

            const stopOffsetTop = stopStickyRef.current.offsetTop;
            const threshold = 4;
            const scrollPlusHeader = window.scrollY + 96; // 헤더 높이 보정값

            const shouldBeOff = scrollPlusHeader >= stopOffsetTop - threshold;

            if (shouldBeOff !== isStickyOffRef.current) {
                setIsStickyOff(shouldBeOff);
                isStickyOffRef.current = shouldBeOff;
            }
        }

        window.addEventListener('scroll', handleScrollTab);

        return () => {
            window.removeEventListener('scroll', handleScrollTab);
        };
    }, []);

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

    // const handleScrollProduct = () => {
    //     const scrollX = productScrollRef.current.scrollLeft;  // 얼마나 스크롤했는지
    //     const containerWidth = productScrollRef.current.offsetWidth;  // 요소의 보이는 너비
    //     const index = Math.round(scrollX/containerWidth);
    //     setCurrentProductIndex(index);
    // }

    // const goToProductSlide = (index) => {
    //     if(!productScrollRef.current) return;

    //     const containerWidth = productScrollRef.current.offsetWidth;

    //     productScrollRef.current.scrollTo({
    //         left: index * containerWidth,
    //         behavior: "smooth"
    //     });

    //     setTimeout(() => {
    //         setCurrentProductIndex(index);
    //     }, 300);
    // }

    // 사용자가 탭을 클릭했을 때 해당 섹션으로 스크롤
    const handleScrollToArea = (index) => {
        const offsetTop = sectionRefs[index].current.offsetTop;
        
        window.scrollTo({
            top: offsetTop - 96,
            behavior: 'smooth'
        });
    }

    const handleToggleImages = () => {
        if(showAllImages) {
            // 이미지 열린상태에서 접기
            const top = imgWrapperRef.current?.offsetTop || 0;
            window.scrollTo({top: top-100, behavior: 'smooth'});

            setTimeout(() => setShowAllImages(false), 200);
        } else {
            setShowAllImages(true); // 이미지 펼치기
        }
    }

    return (
        <div className="product-detail">
            <div className="header">
                <div className='left-button'>
                    <img 
                    className="back-button"
                    src="/assets/button/btn_back2.svg" 
                    />
                </div>
                <div className='right-buttons'>
                    <img 
                    className="search-button"
                    src="/assets/size=24, type=search.svg"
                    />
                    <img 
                    className="cart-button"
                    src="/assets/size=24, type=cart.svg"
                    />
                </div>
            </div>

            {/* 대표이미지 영역 */}
            <div 
                className="product-img-area"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div
                    className="product-img-scroll"
                    ref={scrollRef}
                    onScroll={handleScrollImg}
                >
                    {getProductDetailData?.imageUrl?.map((src, index) => (
                        <img
                        key={index}
                        className="product-img"
                        src={src} />
                    ))}

                </div>
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
                {getProductDetailData?.soldOut && (
                <div className="soldout-overlay">
                    <span>품절</span>
                </div>
                )}
                <div
                    className='img-indicator'>
                    <span className='highlight'>{currentIndex + 1}</span> | {getProductDetailData?.imageUrl?.length}
                </div>
            </div>

            {/* 타이틀 정보 영역 */}
            <div className='title-area-product-detail'>
                <div className='top-row'>
                    <h3 className='prouct-title'>{getProductDetailData?.name}</h3>
                    <img className='share-button' src='/assets/button/btn_share.svg' />
                </div>
                <p className={(getProductDetailData?.discountPercent===null) ? 'product-price big' : 'product-price small'}>
                    {getProductDetailData?.price.toLocaleString()}
                    {getProductDetailData?.discountPercent===null ? '원' : ''}
                </p>
                {getProductDetailData?.discountPercent !== null && (
                    <div className='discount-row'>
                        <p className='discount-rate'>{getProductDetailData?.discountPercent}%</p>
                        <p className='discounted-price'>{getProductDetailData?.discountedPrice.toLocaleString()}원
                        </p>
                    </div>
                )}

                {productInfo.isOverseas ? (
                    <p className='price-info'>해외 배송비, 관부가세, 수수료가 모두 포함된 가격</p>
                ) : (
                    <div className='rating-star-row title'>
                        <img className='star-img title' src='/assets/icon/star.svg' />
                        <p className='review-top-content title'>4.8</p>
                        <p 
                            className='review-top-counts'
                            onClick={()=>handleScrollToArea(1)}
                        >
                            {productInfo.reviewCounts?.toLocaleString() ?? 0}개의 리뷰 보기</p>
                    </div>
                )}
            </div>

            <div className='diving-line'/>

            {/* 배송안내 영역 */}
            <div className='delivery-area'>
                <div className='delivery-row'>
                    <p className='delivery-info1'>배송</p>
                    <p className='delivery-info2'>{productInfo.shipping}</p>
                </div>
                <div className='delivery-fee-row'>
                    <p className='delivery-info1'>배송비</p>
                    <p className='delivery-info2'>{getProductDetailData?.deliveryFee === 0 ? "무료" : `${getProductDetailData?.deliveryFee.toLocaleString()}원`}<br />(제주 3,000원 / 도서산간 5,000원 추가)</p>
                </div>

                {productInfo.isOverseas && (
                    <div className='overseas-shipping-info-area'>
                        <div className='overseas-shipping-top-row'>
                            <img className='icon' src='/assets/icon/plane.svg' />
                            <h4 className='overseas-shipping-title'>해외직배송 상품 안내 필독</h4>
                        </div>
                        <p className='overseas-shipping-info'>이 상품은 해외에서 국내로 배송되는 상품으로 배송・반품・교환이 일반적인 국내 배송 상품과 다를 수 있습니다.</p>
                        <p 
                            className='show-more'
                            onClick={()=> setShowMoreDeliveryInfo(prev => !prev)}
                        >{showMoreDeliveryInfo ? '접기' : '자세히 보기'}</p>

                        {showMoreDeliveryInfo && (
                            <div className='show-more-area'>
                                <div className='diving-line2' />
                                <div className='shipping-rows'>
                                    <div className='shipping-row'>
                                        <p className='show-more-shipping-title'>배송정보</p>
                                        <p className='show-more-shipping-contents'>{shippingPolicyText1}</p>
                                    </div>
                                    <div className='shipping-row'>
                                        <p className='show-more-shipping-title'>교환/반품</p>
                                        <p className='show-more-shipping-contents'>{shippingPolicyText2}</p>
                                    </div>
                                    <div className='shipping-row'>
                                        <p className='show-more-shipping-title'>확인사항</p>
                                        <p className='show-more-shipping-contents'>{shippingPolicyText3}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                
                <div className='overseas-shipping-info-area'>
                    <div className='overseas-shipping-top-row'>
                        <img className='icon' src='/assets/icon/package.svg' />
                        <h4 className='overseas-shipping-title'>{productInfo.shippingInfo}</h4>
                    </div>
                    <p className='overseas-shipping-info'>주말/공휴일 제외한 영업일 기준</p>
                </div>
            </div>

            {/* 상품출처 영역 */}
            {productInfo.isOverseas && (
                <>
                    <div className='diving-area' />
                    <div className='product-origin-area'>
                        <img className='origin-img' src='/assets/icon/product_origin_mercari.svg' />
                        <div className='origin-info-area'>
                            <p className='origin'>메루카리(mercari)</p>
                            <p className='origin-info'>일본 현지에서 가장 인기 있는 중고 거래 플랫폼</p>
                        </div>
                    </div>
                </>
            )}

            <div className='diving-area' />

            {/* 탭 영역 */}
            <div 
                ref={tabRef}
                className={`tab-wrapper ${isStickyOff ? 'static' : 'sticky'}`}
            >
                {tabList.map((tab, index) => (
                    <button
                    key={index}
                    className={`tab ${activeTab===index ? 'active': ''}`}
                    onClick={()=> {
                        setActiveTab(index);
                        handleScrollToArea(index);}}
                    >
                        {tab}
                    </button>
                ))}

            </div>

            {/* 제품상세 영역 */}
            <div ref={sectionRefs[0]} className='product-detail-area'>
                <div className='product-detail-info'>
                    {!productInfo.isOverseas && localProductDetialInfo.map(({ label , value }) => (
                        <div key={label} className='product-detail-row'>
                            <p className='product-detail-label'>{label}</p>
                            <p className='product-detail-value'>{value}</p>
                        </div>
                    ))}
                    {productInfo.isOverseas && productDetialInfo.map(({ label , value }) => (
                        <div key={label} className='product-detail-row'>
                            <p className='product-detail-label'>{label}</p>
                            <p className='product-detail-value'>{value}</p>
                        </div>
                    ))}
                </div>
                <div className='diving-line full'/>

                {productInfo.isOverseas ? (
                    <div className='translated-area'>
                        <p className='translate-info'>*일본 메루카리 판매자가 작성한 글을 자동으로 번역했어요</p>
                        <p className='translated-product-info' style={{ whiteSpace: 'pre-line' }}>{getProductDetailData?.description}</p>
                    </div>
                ) : (
                    <>
                        <div className={`product-detail-images ${showAllImages ? 'expanded' : ''}`}
                            ref={imgWrapperRef}>
                            {getProductDetailData?.imageUrl?.map((src, index) => (
                                <React.Fragment key={index}>
                                    <img
                                    className="product-img"
                                    src={src} />
                                    {index < getProductDetailData?.imageUrl?.length-1 && <div className='diving-area weak' />}
                                </React.Fragment>
                            ))}
                        </div>
                        <button 
                            onClick={handleToggleImages}
                            className='review-button show-img'>
                            {showAllImages ? '상품 상세 접기' : '상품 상세 더보기'}
                        </button>
                    </>
                )}
            </div>

            <div className='diving-area' />

            {/* 리뷰 영역 */}
            <div ref={sectionRefs[1]} className='review-area'>
                <h3 className='review-title'>{productInfo.reviewTitle}</h3>
                {productInfo.reviews?.length > 0 ? (
                    <>
                        <div className='review-top-area'>
                            <div>
                                <p className='review-top-title'>평균 별점</p>
                                <div className='rating-star-row'>
                                    <img className='star-img' src='/assets/icon/star.svg' />
                                    <p className='review-top-content'>4.8</p>
                                </div>
                            </div>
                            <div className='diving-line3'></div>
                            <div>
                                <p className='review-top-title'>리뷰 건수</p>
                                <p className='review-top-content'>{productInfo.reviewCounts.toLocaleString()}건</p>
                            </div>
                        </div>

                        <div className='review-statistics-area'>
                            <p>만족도</p>
                            <p>•</p>
                            <p className='text-statistics1'>기대 이상이에요</p>
                            <p>•</p>
                            <p className='text-statistics2'>90%</p>
                        </div>

                        {/* 리뷰 컴포넌트 */}
                        <div className='reivew-components-area'>
                            {productInfo.reviews.map((review, index) => (
                                <ProductReview
                                    key={index}
                                    review={review}
                                />
                            ))}
                        </div>
                        <button className='review-button' onClick={handleNavigate}>네스터들의 리뷰 전체보기</button>
                    </>
                ): (
                    <button className='review-button no-review'>아직 작성된 리뷰가 없어요</button>
                )}
                
            </div>

            <div className='diving-area' />

            {/* 상품구매안내 영역 */}
            <div ref={sectionRefs[2]} className='buy-info-area'>
                <div>
                    <div className='buy-info-row'>
                        <h4 className='buy-info-row-title'>취소/교환/반품 안내</h4>
                        <img 
                            className='buy-info-row-img' 
                            src={showReturnPolicy ? '/assets/button/btn_dropup.svg' : '/assets/button/btn_dropdown.svg'}
                            onClick={() => setShowReturnPolicy(prev => !prev)} 
                        />
                    </div>
                    {showReturnPolicy && (
                        <div className='buy-info-detail-area'>
                            <div>
                                <p className='buy-info-title'>취소 가능 시점</p>
                                <p className='buy-info-content'>{returnPolicyText1}</p>
                            </div>
                            <div>
                                <p className='buy-info-title'>취소 방법</p>
                                <p className='buy-info-content'>{returnPolicyText2}</p>
                            </div>
                            <div>
                                <p className='buy-info-title'>품절로 인한 자동 취소</p>
                                <p className='buy-info-content'>{returnPolicyText3}</p>
                            </div>
                            <div>
                                <p className='buy-info-title'>반품/교환 안내</p>
                                <div className='shipping-rows ver2'>
                                    <div className='shipping-row'>
                                        <p className='show-more-shipping-title ver2'>판매자 지정 택배사</p>
                                        <p className='show-more-shipping-contents ver2'>롯데 택배</p>
                                    </div>
                                    <div className='shipping-row'>
                                        <p className='show-more-shipping-title ver2'>반품배송비</p>
                                        <p className='show-more-shipping-contents ver2'>편도 20,000원 (최초 배송비 무료인 경우 40,000원 부과)</p>
                                    </div>
                                    <div className='shipping-row'>
                                        <p className='show-more-shipping-title ver2'>교환배송비</p>
                                        <p className='show-more-shipping-contents ver2'>40,000원</p>
                                    </div>
                                    <div className='shipping-row'>
                                        <p className='show-more-shipping-title ver2'>보내실 곳</p>
                                        <p className='show-more-shipping-contents ver2'>서울특별시 성북구 삼선교로6길 20 102호 (우: 02865)</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className='buy-info-title'>반품/교환 사유에 따른 요청 가능 시간</p>
                                <p className='buy-info-content'>{returnPolicyText4}</p>
                            </div>
                            <div>
                                <p className='buy-info-title'>반품/교환 불가능 사유</p>
                                <p className='buy-info-content'>{returnPolicyText5}</p>
                            </div>
                        </div>
                    )}
                    
                </div>
                <div>
                    <div className='buy-info-row'>
                        <h4 className='buy-info-row-title'>거래조건에 관한 정보</h4>
                        <img 
                            className='buy-info-row-img' 
                            src={showTransactionInfo ? '/assets/button/btn_dropup.svg' : '/assets/button/btn_dropdown.svg'}
                            onClick={() => setShowTransactionInfo(prev => !prev)}  
                        />
                    </div>
                    {showTransactionInfo && (
                        <div className='buy-info-detail-area'>
                            <div>
                                <p className='buy-info-title'>A/S 안내</p>
                                <div className='shipping-rows ver2'>
                                    <div className='shipping-row'>
                                        <p className='show-more-shipping-title ver2'>A/S 책임자와 전화번호</p>
                                        <p className='show-more-shipping-contents ver2'>상품 상세 참조 (07079544117)</p>
                                    </div>
                                    <div className='shipping-row'>
                                        <p className='show-more-shipping-title ver2'>재화 등의 A/S 관련 전화번호</p>
                                        <p className='show-more-shipping-contents ver2'>07079544117</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className='buy-info-title'>청약 철회 안내</p>
                                <p className='buy-info-content'>{transactionInfoText1}</p>
                            </div>
                            <div>
                                <p className='buy-info-title'>그 외 안내</p>
                                <p className='buy-info-content'>{transactionInfoText2}</p>
                            </div>
                        </div>
                    )}
                </div>
                {!productInfo.isOverseas && (
                    <div>
                        <div className='buy-info-row'>
                            <h4 className='buy-info-row-title'>상품정보 제공고시</h4>
                            <img 
                                className='buy-info-row-img' 
                                src={showProductInfo ? '/assets/button/btn_dropup.svg' : '/assets/button/btn_dropdown.svg'}
                                onClick={() => setShowProductInfo(prev => !prev)}  
                            />
                        </div>
                        {showProductInfo && (
                            <div className='buy-info-detail-area'>
                                <div className='shipping-rows ver2'>
                                    <div className='shipping-row'>
                                        <p className='show-more-shipping-title ver2'>원산지</p>
                                        <p className='show-more-shipping-contents ver2'>해외</p>
                                    </div>
                                    <div className='shipping-row'>
                                        <p className='show-more-shipping-title ver2'>소재</p>
                                        <p className='show-more-shipping-contents ver2'>상품 상세 참조</p>
                                    </div>
                                    <div className='shipping-row'>
                                        <p className='show-more-shipping-title ver2'>취급시 주의사항</p>
                                        <p className='show-more-shipping-contents ver2'>상품 상세 참조</p>
                                    </div>
                                    <div className='shipping-row'>
                                        <p className='show-more-shipping-title ver2'>품질보증기준</p>
                                        <p className='show-more-shipping-contents ver2'>상품 상세 참조</p>
                                    </div>
                                    <div className='shipping-row'>
                                        <p className='show-more-shipping-title ver2'>법에 의한 인증・허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항</p>
                                        <p className='show-more-shipping-contents ver2'>해당사항 없음</p>
                                    </div>
                                    <div className='shipping-row'>
                                        <p className='show-more-shipping-title ver2'>결제 수단</p>
                                        <p className='show-more-shipping-contents ver2'>신용카드, 체크카드, 무통장입금, 간편결제(네이버페이/카카오페이 등)</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className='diving-area' />
            <div ref={stopStickyRef}></div>

            {/* 연관상품 추천 영역 */}
            <ProductSlider
                className='white'
                productList={getProductListData?.content?.filter(product => product.id !== getProductDetailData?.id)}  // 현재 보는 상품 제외하고 추천영역에 보여줌
                title1={getProductDetailData?.category?.length > 2 ? getProductDetailData?.category[0] : getProductDetailData?.category[1]}
                title2=" 러버들의 Pick"
            />

            <div className='diving-area' />

            {/* 문의하기 영역 */}
            <div className='inquiry-area'>
                <p>1:1 문의하기</p>
                <img src='/assets/button/inquiry_btn.svg' onClick={()=> {window.open("http://pf.kakao.com/_Xexkxen", "_blank")}}/>
            </div>

            <Footer className='footer' screenSize={screenSize} />

            <CTAButton className='cta-button-area' 
                isSoldout={getProductDetailData?.soldOut} 
                isLiked={getProductDetailData?.isLiked}
                productId={getProductDetailData?.id} 
            />

        </div>
    )
}

export default ProductDetail;