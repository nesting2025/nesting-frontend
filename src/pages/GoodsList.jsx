import React, { useEffect, useState } from "react";
import StickyHeader from "../components/layout/StickyHeader";
import CategoryTabs from "../components/goods/CategoryTabs.jsx";
import FilterBar from "../components/goods/FilterBars";
import ProductList from "../components/goods/ProductList";
import Footer from "../components/layout/Footer";
import useScreenSize from "../hooks/useScreenSize";
import "../styles/css/GoodsList.css";
import { useGetProductList } from "../hooks/useProducts.ts";

export default function GoodsList() {
  const {screenSize} = useScreenSize();
  const { getProductList, data: getProductListData } = useGetProductList();
  const [getProductListDto, setGetProductListDto] = useState({
    page: "0",
    size: "10",
    sortType: "LIKE_HIGH",
    includeSoldOut: true,
    category: null,
    type: null,
    price: null,
    search: null,
  });

  useEffect(() => {
    // 상품리스트 조회 API
    getProductList(getProductListDto);
  }, []);

  return (
    <div className="page-bg">
      <div className="container">
        {/* 스티키 헤더 */}
        <StickyHeader />

        {/* 카테고리 탭 */}
        <div>
          <CategoryTabs />
        </div>

        {/* 필터 바 */}
        <div>
          <FilterBar />
        </div>

        {/* 상품 리스트 */}
        <div className="goods-list-area">
          <ProductList products={getProductListData?.content || []}/>
        </div>

        {/* 푸터 */}
        <Footer screenSize={screenSize} />
      </div>
    </div>
  );
}
