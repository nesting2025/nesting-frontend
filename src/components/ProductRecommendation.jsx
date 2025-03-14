import { useRef } from "react";
import ProductCard from "./ProductCard";
import "../styles/ProductRecommendation.css";

const ProductRecommendation = ({ products }) => {
  const sliderRef = useRef(null);

  // 슬라이드 왼쪽 이동
  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 300;
    }
  };

  // 슬라이드 오른쪽 이동
  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 300;
    }
  };

  return (
    <section className="product-recommendation">
      <h2>네스터들을 위한 추천</h2>

      {/* 오른쪽 정렬된 버튼 */}
      <div className="carousel-buttons">
        <button className="carousel-btn left" onClick={slideLeft}>
          &lt;
        </button>
        <button className="carousel-btn right" onClick={slideRight}>
          &gt;
        </button>
      </div>

      {/* 상품 리스트 */}
      <div className="carousel-container">
        <div className="product-list" ref={sliderRef}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductRecommendation;
