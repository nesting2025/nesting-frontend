import React, { useState } from "react";
import "../../styles/css/ProductCard.css";

export default function ProductCardPrev({ product, toggleLike, isRecommend = false }) {

  const handleLikeClick = (e) => {
    // e.stopPropagation(); // 카드 전체 클릭 이벤트와의 분리.
    // setIsLiked(!isLiked);
  };
  return (
    <div className="product-card">
      <div className="image-wrapper">
        {product.tag.includes("해외") && <span className="tag">해외</span>}

        <img src={product.thumbnail} alt={product.name} />

        {product.soldOut && (
          <div className="soldout-overlay">
            <span>품절</span>
          </div>
        )}

        <div className="like-btn" onClick={handleLikeClick}>
          <img
            src={
              product.isLiked
                ? "/assets/button/like_btn_pressed.svg"
                : "/assets/button/like_btn_default.svg"
            }
            alt="Like button"
            className="like-icon"
          />
        </div>
      </div>

      <div className="info">
        <div className="title-area">
          {product.prefixTag.includes("중고") && <div className="tag-used">중고</div>}
          <div className={isRecommend ? "title recommend" : "title"}>{product.name}</div>
        </div>
        <div className="price-info">
          {product.discountPercent !== null && (
            <span className="discount">{product.discountPercent}%</span>
          )}
          <span className={isRecommend ? "price recommend" : "price"}>{product.price.toLocaleString()}원</span>
        </div>
        {!isRecommend && (
          <div className="likes">
          <img src="/assets/button/icon_like.svg"></img>
          {product.likeCount}
        </div>
        )}
      </div>
    </div>
  );
}
