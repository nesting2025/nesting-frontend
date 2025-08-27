import React, { use, useState } from "react";
import "../../styles/css/FilterBars.css";
import FilterBottomSheet from "./FilterBottomSheet";

export default function FilterBar({ sortType, onSelectSort, onChangeFilter, onSelectFilter, listLength, type, price }) {
  const sortTypeMap = {
    LIKE_HIGH : "찜 많은 순",
    LATEST : "신상품순",
    PRICE_LOW : "가격 낮은순",
    PRICE_HIGH : "가격 높은순"
  }

  const filterOptions = [sortTypeMap[sortType], "가격", "굿즈 유형"];
  const [isSort, setIsSort] = useState(false);
  const [activeTab, setActiveTab] = useState("price");

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const reverseSortTypeMap = Object.fromEntries(
    Object.entries(sortTypeMap).map(([key, value]) => [value, key])
  );

  const handleSelectSort = (option) => {
    const engSort = reverseSortTypeMap[option];
    if(engSort) {
      onSelectSort(engSort);
    }
  }

  return (
    <>
      <div className="filter-bar">
        <button
          className="filter-btn"
          type="button"
          aria-label="필터 열기"
          onClick={() => {
            setIsSort(false);
            setIsFilterOpen(true);}}
        >
          <img src="/assets/button/icon_filter.svg" alt="Filter Icon" />
        </button> 

        <div className="divider"></div>

        <div className="filter-options">
          {filterOptions.map((option, index) => (
            <button
              key={option}
              type="button"
              className="option"
              onClick={() => {
                if(index === 0) setIsSort(true);
                else setIsSort(false);
                if(index === 1) setActiveTab("price");
                if(index === 2) setActiveTab("category");
                setIsFilterOpen(true);
              }} // 옵션도 바텀시트 열기
            >
              <span>{option}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="#767676"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {isFilterOpen && (
        <FilterBottomSheet 
          isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} 
          isSort={isSort} selectedSort={sortTypeMap[sortType]} onSelectSort={handleSelectSort} InitialActiveTab={activeTab}
          onChangeFilter={onChangeFilter} 
          onSelectFilter={onSelectFilter}
          listLength={listLength} type={type} price={price}
        />
      )}
    </>
  );
}
