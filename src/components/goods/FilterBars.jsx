import React, { use, useState } from "react";
import "../../styles/css/FilterBars.css";
import FilterBottomSheet from "./FilterBottomSheet";

export default function FilterBar() {
  const [selectedSort, setSelectedSort] = useState("찜 많은 순");
  const filterOptions = [selectedSort, "가격", "굿즈 유형"];
  const [isSort, setIsSort] = useState(false);
  const [activeTab, setActiveTab] = useState("price");

  const [isFilterOpen, setIsFilterOpen] = useState(false);


  return (
    <>
      <div className="filter-bar">
        <button
          className="filter-btn"
          type="button"
          aria-label="필터 열기"
          onClick={() => setIsFilterOpen(true)}
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
        <FilterBottomSheet isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} 
        isSort={isSort} selectedSort={selectedSort} onSelectSort={setSelectedSort} InitialActiveTab={activeTab}/>
      )}
    </>
  );
}
