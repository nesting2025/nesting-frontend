import { useRef } from "react";
import ProductCard from "./ProductCard";
import "../styles/ProductRecommendation.css";

const ProductRecommendation = ({ products, screenSize }) => {
  const sliderRef = useRef(null);
  const cardRef = useRef(null);

  const slideLeft = () => {
    if (sliderRef.current && cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth;
      const gap = 24; // 카드 사이 간격
      sliderRef.current.scrollLeft -= cardWidth + gap;
    }
  };

  const slideRight = () => {
    if (sliderRef.current && cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth;
      const gap = 24;
      sliderRef.current.scrollLeft += cardWidth + gap;
    }
  };

  return (
    <section className="product-recommendation">
      <div class={`title-and-buttons ${screenSize}`}>
        <div class="title-block">
          <span class="nesting-badge">네스팅 PICK</span>
          <h2>언제든 내 손 안에🤚 데일리 굿즈</h2>
        </div>

        {screenSize === "large" && (
          <div className={`carousel-buttons ${screenSize}`}>
            <div>
              <img
                src="/assets/round/button-left.svg"
                alt="slide to left"
                className="carousel-btn left"
                onClick={slideLeft}
              />
            </div>
            <div>
              <img
                src="/assets/round/button-right.svg"
                alt="slide to right"
                className="carousel-btn right"
                onClick={slideRight}
              />
            </div>
          </div>
        )}
      </div>

      <div className={`carousel-container ${screenSize}`}>
        <div className="product-list" ref={sliderRef}>
          {products.map((product) => (
            <div ref={cardRef} key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductRecommendation;
