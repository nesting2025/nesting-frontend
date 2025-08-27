import { useState, useRef } from "react";
import ProductCardPrev from "./ProductCardPrev";
import '../../styles/css/ProductSlider.css';

const ProductSlider = ( {productList = [], title1, title2, className=''} ) => {
    const [currentProductIndex, setCurrentProductIndex] = useState(0);
    const productScrollRef = useRef(null);

    const handleScrollProduct = () => {
        const scrollX = productScrollRef.current.scrollLeft;  // 얼마나 스크롤했는지
        const containerWidth = productScrollRef.current.offsetWidth;  // 요소의 보이는 너비
        const index = Math.round(scrollX/containerWidth);
        setCurrentProductIndex(index);
    }

    const goToProductSlide = (index) => {
        if(!productScrollRef.current) return;

        const containerWidth = productScrollRef.current.offsetWidth;

        productScrollRef.current.scrollTo({
            left: index * containerWidth,
            behavior: "smooth"
        });

        setTimeout(() => {
            setCurrentProductIndex(index);
        }, 300);
    }
    const chunkArray = (arr, size) => {
    if (!arr || arr.length === 0) return []; // null 혹은 빈 배열 처리
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
    };
    const slides = chunkArray(productList, 6); 

    return (
        <div className={`product-recommend-area ${className}`}>
            <p className='recommend-title'><span className='title-highlight'>{title1}</span> {title2}</p>
            <div className='recommned-product-list-slide' ref={productScrollRef} onScroll={handleScrollProduct}>
                {slides.map((slide, slideIndex) => (
                    <div key={slideIndex} className='recommned-product-list'>
                    {slide.map(product => (
                        <ProductCardPrev key={product.id} product={product} isRecommend={true} />
                    ))}
                    </div>
                ))}
            </div>


            <div className='btn-indicator'> 
                {slides.map((_, index) => (
                    <button
                        key={index} 
                        className={`recommend-indicator ${currentProductIndex===index ? 'active' : ''}`}
                        onClick={() => goToProductSlide(index)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProductSlider;