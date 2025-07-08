import React, { useState } from "react";
import "../../styles/css/FilterBars.css";
import FilterBottomSheet from "./FilterBottomSheet";

export default function FilterBar() {
  const filterOptions = ["찜 많은 순", "가격", "굿즈 유형"];
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const openFilter = () => setIsFilterOpen(true);
  const closeFilter = () => setIsFilterOpen(false);

  return (
    <>
      <div className="filter-bar">
        <button
          className="filter-btn"
          type="button"
          aria-label="필터 열기"
          onClick={openFilter}
        >
          <img src="/assets/button/icon_filter.svg" alt="Filter Icon" />
        </button>

        <div className="divider"></div>

        <div className="filter-options">
          {filterOptions.map((option) => (
            <button
              key={option}
              type="button"
              className="option"
              onClick={openFilter} // 옵션도 바텀시트 열기
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
        <FilterBottomSheet isOpen={isFilterOpen} onClose={closeFilter} />
      )}
    </>
  );
}
