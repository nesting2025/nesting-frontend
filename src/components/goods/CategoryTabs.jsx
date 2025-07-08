import React, { useState } from "react";
import "../../styles/css/CategoryTabs.css";

export default function CategoryTabs() {
  const mainCategories = [
    "전체",
    "짱구",
    "산리오",
    "포켓몬",
    "리락쿠마",
    "진격의 거인",
    "귀멸의 칼날",
    "디즈니",
  ];
  const subCategories = {
    전체: ["전체"],
    짱구: ["전체", "짱구", "맹구", "기타"],
    산리오: ["전체", "쿠로미", "헬로키티"],
    포켓몬: [
      "전체",
      "피카츄",
      "이브이",
      "꼬부기",
      "파이리",
      "버터플",
      "야도란",
      "피죤투",
      "또가스",
      "이상해씨",
    ],
    리락쿠마: ["전체", "리락쿠마"],
    "진격의 거인": ["전체", "에렌", "미카사", "리바이"],
    "귀멸의 칼날": ["전체", "탄지로", "네즈코", "젠이츠"],
    디즈니: ["전체", "미키마우스", "엘사", "토이스토리"],
  };

  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedSub, setSelectedSub] = useState("전체");

  return (
    <div className="category-tabs w-full">
      {/* 상위 탭 */}
      <div className="main-tabs flex border-b overflow-x-auto">
        {mainCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setSelectedSub("전체");
            }}
            className={`tab ${selectedCategory === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 하위 탭 */}
      {selectedCategory !== "전체" && (
        <div className="sub-tabs flex gap-2 py-3 flex-nowrap overflow-x-auto">
          {subCategories[selectedCategory].map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSub(sub)}
              className={`px-4 py-1 border rounded-full text-sm ${
                selectedSub === sub ? "selected" : ""
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}
      <div className="sub-tabs-bar"></div>
    </div>
  );
}
