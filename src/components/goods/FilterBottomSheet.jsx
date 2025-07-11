import React, { useState, useEffect } from "react";
import "../../styles/css/FilterBottomSheet.css";

export default function FilterBottomSheet({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("sort");
  const [selectedTags, setSelectedTags] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const sortOptions = ["찜 많은 순", "신상품순", "가격 낮은순", "가격 높은순"];
  const categoryOptions = [
    { name: "인형", count: 1 },
    { name: "피규어", count: 2 },
    { name: "가챠", count: 0 },
    { name: "문구류", count: 1 },
    { name: "카드", count: 0 },
    { name: "키링", count: 1 },
    { name: "의류", count: 1 },
    { name: "화장품", count: 0 },
    { name: "케이스", count: 0 },
    { name: "식기류", count: 2 },
    { name: "기타", count: 0 },
  ];

  // 옵션 toggle
  const toggleTag = (option) => {
    const name = typeof option === "string" ? option : option.name;
    if (selectedTags.includes(name)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== name));
    } else {
      setSelectedTags([...selectedTags, name]);
    }
  };

  // 선택된 태그 삭제
  const removeTag = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
    // 가격 태그 제거 시 인풋도 초기화
    if (tag.includes("원")) {
      setMinPrice("");
      setMaxPrice("");
    }
  };

  // 가격 변경 시 자동으로 선택된 태그에 추가
  useEffect(() => {
    if (minPrice && maxPrice) {
      const priceTag = `${minPrice}~${maxPrice}원`;
      if (!selectedTags.includes(priceTag)) {
        // 기존 가격 범위 태그는 하나만 유지
        setSelectedTags((prev) => [
          ...prev.filter((tag) => !tag.includes("원")),
          priceTag,
        ]);
      }
    }
  }, [minPrice, maxPrice]);

  // 탭별 옵션 가져오기
  const getOptions = () => {
    if (activeTab === "sort") return sortOptions.map((name) => ({ name }));
    if (activeTab === "category") return categoryOptions;
    return [];
  };

  return (
    <div className={`filter-sheet ${isOpen ? "open" : ""}`}>
      {/* === 헤더 === */}
      <div className="sheet-header">
        <div className="title">
          <img
            src={"/assets/button/icon_filter_bottomsheet.svg"}
            alt="filter icon"
            className="filter-icon"
          />
          필터
        </div>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      {/* === 탭 === */}
      <div className="sheet-tabs">
        <button
          className={activeTab === "sort" ? "active" : ""}
          onClick={() => setActiveTab("sort")}
        >
          정렬
        </button>
        <button
          className={activeTab === "price" ? "active" : ""}
          onClick={() => setActiveTab("price")}
        >
          가격
        </button>
        <button
          className={activeTab === "category" ? "active" : ""}
          onClick={() => setActiveTab("category")}
        >
          굿즈 유형
        </button>
      </div>

      {/* === 탭 내용 === */}
      <div className="sheet-content">
        <h3>
          {activeTab === "sort"
            ? "정렬"
            : activeTab === "price"
            ? "가격"
            : "굿즈 유형"}
        </h3>

        {activeTab === "price" ? (
          <div className="price-inputs">
            <div className="price-box">
              <div className="label">최저</div>
              <input type="number" placeholder="0" />
              <span className="unit">원</span>
            </div>
            <span className="tilde">~</span>
            <div className="price-box">
              <div className="label">최고</div>
              <input type="number" placeholder="0" />
              <span className="unit">원</span>
            </div>
          </div>
        ) : (
          <div className="options">
            {getOptions().map((option) => (
              <button
                key={option.name}
                className={selectedTags.includes(option.name) ? "selected" : ""}
                onClick={() => toggleTag(option)}
              >
                {option.name}
                {activeTab === "category" && ` · ${option.count}`}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* === 선택된 태그 === */}
      {selectedTags.length > 0 && (
        <div className="sheet-tags">
          {selectedTags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
              <button
                className="remove-btn"
                onClick={() => removeTag(tag)}
                aria-label="선택 삭제"
              >
                <img src={"/assets/button/icon_close.svg"} alt="삭제" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* === 하단 버튼 === */}
      <div className="sheet-actions">
        <button
          className="reset-btn"
          onClick={() => {
            setSelectedTags([]);
            setMinPrice("");
            setMaxPrice("");
          }}
        >
          초기화
        </button>
        <button className="apply-btn">
          {`${selectedTags.length}개의 상품 보기`}
        </button>
      </div>
    </div>
  );
}
