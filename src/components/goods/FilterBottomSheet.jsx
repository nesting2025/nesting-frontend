import React, { useState, useEffect, useRef } from "react";
import "../../styles/css/FilterBottomSheet.css";
import { useGetFilterPrices, useGetFilterTypes } from "../../hooks/useProducts";

export default function FilterBottomSheet(
  { isOpen, onClose, isSort, selectedSort, onSelectSort, InitialActiveTab, onChangeFilter, onSelectFilter, 
    listLength, type, price }) {
  const { getFilterPrices, data: getFilterPricesData } = useGetFilterPrices();
  const { getFilterTypes, data: getFilterTypesData } = useGetFilterTypes();

  const [minPrice, setMinPrice] = useState(() => {
    if (!price) return "";
    const minVal = Number(price.split(",")[0].trim());
    return isNaN(minVal) ? "" : minVal.toLocaleString();
  });
  const [maxPrice, setMaxPrice] = useState(() => {
    if (!price) return "";
    const maxVal = Number(price.split(",")[1].trim());
    return isNaN(maxVal) ? "" : maxVal.toLocaleString();
  });

  const serverMinPrice = getFilterPricesData?.minPrice ?? 0; 
  const serverMaxPrice = getFilterPricesData?.maxPrice ?? 0;

  const [activeTab, setActiveTab] = useState(InitialActiveTab);

  const [selectedTags, setSelectedTags] = useState(() => {
    if (!type) return [];
    const typeList = type.split(",").map(t => t.trim()).filter(Boolean);
    return [...typeList];
  });

  const sortOptions = ["찜 많은 순", "신상품순", "가격 낮은순", "가격 높은순"];
  const categoryOptions = [
    { name: "인형", count: getFilterTypesData?.[0]?.count ?? 0 },
    { name: "피규어", count: getFilterTypesData?.[1]?.count ?? 0 },
    { name: "가챠", count: getFilterTypesData?.[2]?.count ?? 0 },
    { name: "문구류", count: getFilterTypesData?.[3]?.count ?? 0 },
    { name: "카드", count: getFilterTypesData?.[4]?.count ?? 0 },
    { name: "키링", count: getFilterTypesData?.[5]?.count ?? 0 },
    { name: "의류", count: getFilterTypesData?.[6]?.count ?? 0 },
    { name: "화장품", count: getFilterTypesData?.[7]?.count ?? 0 },
    { name: "케이스", count: getFilterTypesData?.[8]?.count ?? 0 },
    { name: "식기류", count: getFilterTypesData?.[9]?.count ?? 0 },
    { name: "기타", count: getFilterTypesData?.[10]?.count ?? 0 },
  ];

  useEffect(() => {
    // 상품 최대/최소 가격 조회 API
    // 상품 유형별 개수 조회 API
    if(!isSort) {
      getFilterPrices();
      getFilterTypes();
    }
  }, []);

  useEffect(() => {
    if(!isSort) {
      handleFilter();
      onSelectFilter();  // 상품 개수 보여주기 용
    }
  }, [selectedTags])

  // 옵션 toggle
  const toggleTag = (option) => {
    const name = typeof option === "string" ? option : option.name;

    setSelectedTags((prevTags) =>
      prevTags.includes(name)
        ? prevTags.filter((tag) => tag !== name)
        : [...prevTags, name]
    );
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
    if(minPrice === "" && maxPrice === "") {
      setSelectedTags((prev) => prev.filter(tag => !tag.includes("원")));
      return;
    }

    const priceTagMin = minPrice === "" ?  serverMinPrice : Number(minPrice.replace(/,/g, ""));
    const priceTagMax = maxPrice === "" ?  serverMaxPrice : Number(maxPrice.replace(/,/g, ""));

    const priceTag = `${Number(priceTagMin).toLocaleString()}~${Number(priceTagMax).toLocaleString()}원`;
    if (!selectedTags.includes(priceTag)) {
      // 기존 가격 범위 태그는 하나만 유지
      setSelectedTags((prev) => [
        ...prev.filter((tag) => !tag.includes("원")),
        priceTag,
      ]);
    }
  }, [minPrice, maxPrice]);

  const formatNumber = (value) => {
    if(!value) return "";

    const numericNum = value.replace(/\D/g, "");
    return numericNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleClose = () => {
    onClose();
  }

  const handleFilter = () => {
    const priceTags = selectedTags.filter(tag => tag.includes("원"));
    const joinedPrices = priceTags.length > 0 
    ? priceTags
        .map(tag => tag.replace(/,/g, "").replace("원", "")) 
        .map(tag => tag.split("~").join(","))        
        .join(",")                                      
    : null;

    const joinedTypes = selectedTags.filter(tag => !tag.includes("원")).length > 0
    ? selectedTags.filter(tag => !tag.includes("원")).join(",")
    : null;

    onChangeFilter(joinedPrices, joinedTypes);
  }

  return (
    <>
    {isOpen && <div className="filter-overlay" onClick={handleClose} />}
    <div className={`filter-sheet ${isSort ? "sort" : ""}`}>
      {/* === 헤더 === */}
      <div className="sheet-header">
        <div className="title">
          <img
            src={isSort ? "/assets/button/icon_sort.svg" : "/assets/button/icon_filter.svg"}
            alt="filter icon"
            className="filter-icon"
          />
          {isSort ? "정렬" : "필터"}
        </div>
        <button className="close-btn" onClick={handleClose}>
          ✕
        </button>
      </div>

      {/* === 탭 === */}
      {!isSort && <div className="sheet-tabs">
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
      </div>}

      {/* === 탭 내용 === */}
      {isSort ? (
        <div className="sheet-content sort">
          <div className="options">
            {sortOptions.map((option) => (
              <button
                key={option}
                className={selectedSort === option? "selected" : ""}
                onClick={() => {
                  onSelectSort(option);
                  handleClose();
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>) : (
        <div className="sheet-content">
          <h3>
            {activeTab === "price"
              ? "가격"
              : "굿즈 유형"}
          </h3>

          {activeTab === "price" ? (
            <div className="price-inputs">
              <div className="price-box">
                <div className="label">최저</div>
                <div className="input-area">
                  <input placeholder={serverMinPrice.toLocaleString()} value={minPrice} 
                  onChange={(e) => setMinPrice(formatNumber(e.target.value))}/>
                  <span className="unit">원</span>
                </div>
              </div>
              <span className="tilde">~</span>
              <div className="price-box">
                <div className="label">최고</div>
                <div className="input-area">
                  <input placeholder={serverMaxPrice.toLocaleString()} value={maxPrice}  
                  onChange={(e) => setMaxPrice(formatNumber(e.target.value))}/>
                  <span className="unit">원</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="options">
              {categoryOptions.map((option) => (
                <button
                  key={option.name}
                  className={`${selectedTags.includes(option.name) ? "selected" : ""} ${option.count === 0 ? "disabled" : ""}`}
                  disabled={option.count === 0}
                  onClick={() => option.count !== 0 && toggleTag(option)}
                >
                  {option.name}
                  {activeTab === "category" && ` · ${option.count}`}
                </button>
              ))}
            </div>
          )}
        </div>
      )} 

      {/* === 선택된 태그 === */}
      {!isSort && ( 
        <>
        {selectedTags.length > 0 && (
          <div className="sheet-tags">
            {selectedTags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
                <img
                  className="remove-btn"
                  onClick={() => removeTag(tag)}
                  aria-label="선택 삭제"
                  src="/assets/button/icon_close.svg"
                />
              </span>
            ))}
          </div>
        )}
        </>
      )}

      {/* === 하단 버튼 === */}
      {!isSort && 
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
          <button className="apply-btn" onClick={() => {handleFilter(); onClose();}}>
            {`${listLength}개의 상품 보기`}
          </button>
        </div>
      }

    </div>
  </>
  );
}