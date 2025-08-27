import React, { useState } from "react";
import "../../styles/css/ProductList.css";
import ProductCardPrev from "./ProductCardPrev.jsx";
import CustomCheckboxnRadioStyle from "../common/CustomCheckboxRadioStyle.jsx";

export default function ProductList({ products, excludeSoldOut, onChangeSoldOut }) {

  return (
    <div>
      <div className="filter-result-bar">
        <span className="total">{products.length}개의 결과</span>
        <CustomCheckboxnRadioStyle className='checkbox' label="품절제외" checked={excludeSoldOut} onChange={(e) => onChangeSoldOut(e.target.checked)} />
      </div>

      <div className="product-list-area">
        {products.map((product) => (
          <ProductCardPrev
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
