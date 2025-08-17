import React, { useState } from "react";
import "../../styles/css/ProductList.css";
import ProductCardPrev from "./ProductCardPrev.jsx";
import CustomCheckboxnRadioStyle from "../common/CustomCheckboxRadioStyle.jsx";

export default function ProductList() {
  const initialProducts = [
    {
      id: 1,
      title: "레옹 짱구와 마틸다 힌둥",
      price: 8000,
      discount: 20,
      likes: 1,
      isOverseas: true,
      isSoldOut: false,
      isLiked: false,
      imageUrl: "/assets/sample/sample1.svg",
      isUsed: true,
    },
    {
      id: 2,
      title: "상품명 최대 1줄 노출 길이 테스트",
      price: 8000,
      discount: 0,
      likes: 1,
      isOverseas: false,
      isSoldOut: true,
      isLiked: true,
      imageUrl: "/assets/sample/sample1.svg",
      isUsed: true
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [excludeSoldOut, setExcludeSoldOut] = useState(false);

  const toggleLike = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isLiked: !p.isLiked } : p))
    );
  };

  // 품절 제외 옵션 적용된 리스트
  const displayedProducts = excludeSoldOut
    ? products.filter((p) => !p.isSoldOut)
    : products;

  const total = displayedProducts.length;

  return (
    <div>
      <div className="filter-result-bar">
        <span className="total">{total}개의 결과</span>
        <CustomCheckboxnRadioStyle className='checkbox' label="품절제외" checked={excludeSoldOut} onChange={(e) => setExcludeSoldOut(e.target.checked)} />
      </div>

      <div className="product-list">
        {displayedProducts.map((product) => (
          <ProductCardPrev
            key={product.id}
            product={product}
            toggleLike={toggleLike}
          />
        ))}
      </div>
    </div>
  );
}
