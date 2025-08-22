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
  const [productList, setProductList] = useState([]);
  const [showProductLength, setShowProductLength] = useState(false);  // 필터바텀시트에서 단순 상품개수 보여주기용, 상품리스트 화면에 렌더링 x
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
    handleGetProductList();
  }, [getProductListDto]);

  const handleGetProductList = async () => {
    try {
      console.log(getProductListDto)
      await getProductList(getProductListDto);
    }  catch (error) { console.log(error); }
  }

  useEffect(() => {
    if(!showProductLength) {
      setProductList(getProductListData?.content || []);
    }
  }, [getProductListData])

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
          <FilterBar 
          sortType={getProductListDto.sortType} 
          listLength={getProductListData?.content.length ?? 0}
          type={getProductListDto.type}
          price={getProductListDto.price}
          onSelectSort={(engSort) => {setGetProductListDto(prev => ({
            ...prev, sortType: engSort
          })); setShowProductLength(false); }}
          onChangeFilter={(joinedPrices, joinedTypes) => { 
            setGetProductListDto(prev => ({
            ...prev, type: joinedTypes, price: joinedPrices
            })); 
            setShowProductLength(false); }}
          onSelectFilter={() => {console.log("onSelectFilter실행"); setShowProductLength(true); }}
          />
        </div>

        {/* 상품 리스트 */}
        <div className="goods-list-area">
          <ProductList 
            products={productList} 
            excludeSoldOut={!getProductListDto.includeSoldOut} 
            onChangeSoldOut={(checked) => setGetProductListDto(prev => ({
              ...prev, includeSoldOut: !checked
            }))}
          />
        </div>

        {/* 푸터 */}
        <Footer screenSize={screenSize} />
      </div>
    </div>
  );
}
