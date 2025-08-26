import React, { useEffect, useState } from "react";
import "../../styles/css/ProductCard.css";
import { useToggleProductLike } from "../../hooks/useProducts";
import PopupDialog from "../dialog/PopupDialog";
import { useNavigate } from "react-router-dom";

export default function ProductCardPrev({ product, isRecommend = false }) {
  const { toggleProductLike, data: toggleProductLikeData } = useToggleProductLike();

  const [isLiked, setIsLiked] = useState(product.isLiked);
  const [isOpen, setIsOpen] = useState(false);
  const nav = useNavigate();

  // 상품 좋아요 토글 API
  const handleLikeClick = async (e) => {
    e.stopPropagation();
    try {
      await toggleProductLike(product.id);
    } catch(e) { 
      console.log(e); 
      if(e.message === "해당 요청에 대한 권한이 없습니다.") {
        // 로그인 팝업
        setIsOpen(true);
      }
    }
  };

  // API 응답
  useEffect(() => {
    
    if(toggleProductLikeData !== null && toggleProductLikeData.code === "SUCCESS") {
      setIsLiked(toggleProductLikeData.data);
    }
  }, [toggleProductLikeData]);


  return (
    <div className="product-card" onClick={() => nav("/product/detail", { state: { productId: product.id } })}>
      <div className="image-wrapper">
        {product.tag?.includes("해외") && <span className="tag">해외</span>}

        <img src={product.thumbnail} alt={product.name} />

        {product.soldOut && (
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
        <div className="title-area">
          {product.prefixTag?.includes("중고") && <div className="tag-used">중고</div>}
          <div className={isRecommend ? "title recommend" : "title"}>{product.name}</div>
        </div>
        <div className="price-info">
          {product.discountPercent !== null && (
            <span className="discount">{product.discountPercent}%</span>
          )}
          <span className={isRecommend ? "price recommend" : "price"}>{product.discountPercent === null ? product.price.toLocaleString() : product.discountedPrice.toLocaleString()}원</span>
        </div>
        {!isRecommend && (
          <div className="likes">
          <img src="/assets/button/icon_like.svg"></img>
          {product.likeCount}
        </div>
        )}
      </div>
      <PopupDialog open={isOpen} onOpenChange={(newOpen) => setIsOpen(newOpen)} titleText={<>로그인이 필요한 서비스입니다.<br/>로그인 하시겠습니까?</>}
      onClickLeftBtn={() => {}} onClickRightBtn={() => nav("/login")}
       />
    </div>
  );
}
