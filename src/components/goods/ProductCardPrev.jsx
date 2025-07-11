import React, { useState } from "react";

export default function ProductCardPrev({ product, toggleLike }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = (e) => {
    e.stopPropagation(); // 카드 전체 클릭 이벤트와의 분리.
    setIsLiked(!isLiked);
  };
  return (
    <div className="product-card">
      <div className="image-wrapper">
        {product.isOverseas && <span className="tag">해외</span>}

        <img src={product.imageUrl} alt={product.title} />

        {product.isSoldOut && (
          <div className="soldout-overlay">
            <span>품절</span>
          </div>
        )}

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

      <div className="info">
        <div className="title">{product.title}</div>
        <div className="price-info">
          {product.discount > 0 && (
            <span className="discount">{product.discount}%</span>
          )}
          <span className="price">{product.price.toLocaleString()}원</span>
        </div>
        <div className="likes">
          <img src="/assets/button/icon_like.svg"></img>
          {product.likes}
        </div>
      </div>
    </div>
  );
}
