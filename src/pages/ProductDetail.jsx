import '../styles/css/ProductDetail.css';
import { useState, useRef, use } from 'react';
import {
  shippingPolicyText1,
  shippingPolicyText2,
  shippingPolicyText3,
} from '../text';

const ProductDetail = () => {
    const imgList = [
        "/assets/product/dummy_product.svg",
        "/assets/product/dummy_product.svg",
        "/assets/product/dummy_product.svg"
    ]
    const price = 10000;
    const discountRate = 20;
    const discountedPrice = 8000;


    const [isHovered, setIsHovered] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef(null);
    const [showMoreDeliveryInfo, setShowMoreDeliveryInfo] = useState(false);

    const handleScroll = () => {
        const scrollX = scrollRef.current.scrollLeft;  // 얼마나 스크롤했는지
        const containerWidth = scrollRef.current.offsetWidth;  // 요소의 보이는 너비
        const index = Math.round(scrollX/containerWidth);
        setCurrentIndex(index);
    }

    const handelScrollLeft = () => {
        if(scrollRef.current) {
            const containerWidth = scrollRef.current.offsetWidth;
            scrollRef.current.scrollBy({ left: -containerWidth, behavior: "smooth"});
        }
    }

    const handelScrollRight = () => {
        if(scrollRef.current) {
            const containerWidth = scrollRef.current.offsetWidth;
            scrollRef.current.scrollBy({ left: containerWidth, behavior: "smooth"});
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
                    onScroll={handleScroll}
                >
                    {imgList.map((src, index) => (
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
                        onClick={handelScrollLeft} 
                    />
                    <img 
                        className='scroll-button right' 
                        src='/assets/button/btn_right_transparent.svg'
                        onClick={handelScrollRight} 
                    />
                    </>
                )}
                <div
                    className='img-indicator'>
                    <span className='highlight'>{currentIndex + 1}</span> | {imgList.length}
                </div>
            </div>

            {/* 타이틀 정보 영역 */}
            <div className='title-area'>
                <div className='top-row'>
                    <h3 className='prouct-title'>레옹 짱구와 마틸다 흰둥이 피규어-상품명 전부 노출-레옹 짱구와 마틸다 흰둥이 피규어</h3>
                    <img className='share-button' src='/assets/button/btn_share.svg' />
                </div>
                <p className={discountRate===0 ? 'product-price big' : 'product-price small'}>
                    {price.toLocaleString()}
                    {discountRate===0 ? '원' : ''}
                </p>
                <div className='discount-row'>
                    <p className='discount-rate'>{discountRate}%</p>
                    <p className='discounted-price'>{discountedPrice.toLocaleString()}
                        {discountRate===0? '' : '원'}
                    </p>
                </div>

                <p className='price-info'>해외 배송비, 관부가세, 수수료가 모두 포함된 가격</p>
            </div>

            <div className='diving-line'/>

            {/* 배송안내 영역 */}
            <div className='delivery-area'>
                <div className='delivery-row'>
                    <p className='delivery-info1'>배송</p>
                    <p className='delivery-info2'>해외직배송・롯데택배</p>
                </div>
                <div className='delivery-fee-row'>
                    <p className='delivery-info1'>배송비</p>
                    <p className='delivery-info2'>무료<br />(제주 3,000원 / 도서산간 5,000원 추가)</p>
                </div>

                <div className='overseas-shipping-info-area'>
                    <div className='overseas-shipping-top-row'>
                        <img className='plane-icon' src='/assets/icon/plane.svg' />
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
                                <p className='show-more-shipping-contents bottom'>{shippingPolicyText3}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className='diving-area' />

            {/* 상품출처 영역 */}
            <div className='product-origin-area'>
                <img className='origin-img' src='/assets/icon/product_origin_mercari.svg' />
                <div className='origin-info-area'>
                    <p className='origin'>메루카리(mercari)</p>
                    <p className='origin-info'>일본 현지에서 가장 인기 있는 중고 거래 플랫폼</p>
                </div>
            </div>

            <div className='diving-area' />

        </div>
    )
}

export default ProductDetail;