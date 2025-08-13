import React from "react";
import StickyHeader from "../components/layout/StickyHeader";
import CategoryTabs from "../components/goods/CategoryTabs.jsx";
import FilterBar from "../components/goods/FilterBars";
import ProductList from "../components/goods/ProductList";
import Footer from "../components/layout/Footer";
import useScreensize from "../hooks/useScreensize.jsx";
import "../styles/css/GoodsList.css";

export default function GoodsList() {
  const {screenSize} = useScreensize();

  return (
    <div className="page-bg">
      <div className="container">
        {/* ✅ 스티키 헤더 */}
        <StickyHeader />

        {/* ✅ 카테고리 탭 */}
        <div className="sticky top-[60px] z-10 bg-white shadow-sm">
          <CategoryTabs />
        </div>

        {/* ✅ 필터 바 */}
        <div className="px-4 py-2 border-b border-gray-200 bg-white">
          <FilterBar />
        </div>

        {/* ✅ 상품 리스트 */}
        <div className="flex-1 px-4 py-4">
          <ProductList />
        </div>

        {/* ✅ 푸터 */}
        <Footer screenSize={screenSize} />
      </div>
    </div>
  );
}
