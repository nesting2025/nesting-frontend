import "../styles/css/ProductCard.css";
import React, { useState } from "react";

const ProductCard = ({ product, screenSize }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = (e) => {
    e.stopPropagation(); // 카드 전체 클릭 이벤트와의 분리.
    setIsLiked(!isLiked);
  };
  return (
    <div className={`product-card ${screenSize}`}>
      <div className="image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="like-btn" onClick={handleLikeClick}>
          <img
            src={
              isLiked
                ? "/assets/button/like_btn_pressed.svg"
                : "/assets/button/like_btn_default.svg"
            }
            alt="Like button"
            className="like-icon"
          />
        </div>
      </div>

      <div className="product-info">
        <div className="product-name">{product.name}</div>
      </div>

      <p className="product-price">{product.price}원</p>
    </div>
  );
};

export default ProductCard;
