import React, { useEffect, useState } from "react";
import "../../styles/css/CategoryTabs.css";

export default function CategoryTabs({ onChangeCategory }) {
  const mainCategories = [
    "전체",
    "산리오",
    "짱구",
    "포켓몬",
    "리락쿠마",
    "치이카와",
  ];
  const subCategories = {
    전체: ["전체"],
    산리오: ["전체", "한교동", "헬로키티", "쿠로미", "포차코", "시나모롤", "마이멜로디", "폼폼푸린", "배드바츠마루", "리틀트윈스타", "턱시도샘", "우사하나"],
    짱구: ["전체"],
    포켓몬: ["전체"],
    리락쿠마: ["전체"],
    치이카와: ["전체"]
  };

  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedSub, setSelectedSub] = useState("전체");
  const [category, setCategory] = useState("전체");

  useEffect(() => {
    const subs = subCategories[selectedCategory] || ["전체"];

    if(subs.length === 1) {
      setCategory(selectedCategory);
    }
    else {

      if(selectedSub === "전체") {
        // const allSubs = subs.filter(s => s !== "전체").join(",");
        const allSubs = selectedCategory;
        setCategory(allSubs);
      } else {
        setCategory(selectedSub);
      }
    }

  }, [selectedCategory, selectedSub]);


  useEffect(() => {
    onChangeCategory(category);
  }, [category]);

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
