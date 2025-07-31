import { useState, useRef } from "react";
import ProductCardPrev from "./ProductCardPrev";
import '../../styles/css/ProductSlider.css';

const ProductSlider = ( {productList, title1, title2, className=''} ) => {
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

    return (
        <div className={`product-recommend-area ${className}`}>
            <p className='recommend-title'><span className='title-highlight'>{title1}</span> {title2}</p>
            <div 
            className='recommned-product-list-slide'
            ref={productScrollRef}
            onScroll={handleScrollProduct}
            >
                <div className='recommned-product-list'>
                    {productList.slice(0,6).map((product) => (
                        <ProductCardPrev
                            key={product.id}
                            product={product}
                            isRecommend={true}
                        />
                    )) }
                </div>
                <div className='recommned-product-list'>
                    {productList.slice(6,12).map((product) => (
                        <ProductCardPrev
                            key={product.id}
                            product={product}
                            isRecommend={true}
                        />
                    )) }
                </div>
                <div className='recommned-product-list'>
                    {productList.slice(12,18).map((product) => (
                        <ProductCardPrev
                            key={product.id}
                            product={product}
                            isRecommend={true}
                        />
                    )) }
                </div>
            </div>

            <div className='btn-indicator'> 
                {[0,1,2].map((index) => (
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