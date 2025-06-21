import '../styles/css/ProductDetail.css';
import { useState, useRef } from 'react';

const ProductDetail = () => {
    const imgList = [
        "/assets/product/dummy_product.svg",
        "/assets/product/dummy_product.svg",
        "/assets/product/dummy_product.svg"
    ]
    const [isHovered, setIsHovered] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef(null);

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
        </div>
    )
}

export default ProductDetail;