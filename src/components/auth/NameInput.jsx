import React, { useState } from "react";
import "../../styles/css/NameInput.css";

export default function NameInput({ value, onChange }) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.trim() !== "";

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="name-input">
      <div className={`name-input__wrapper ${isFocused ? "focused" : ""}`}>
        <input
          className={`name-input__field ${hasValue ? "filled" : ""}`}
          type="text"
          placeholder="이름"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {hasValue && (
          <button
            className="name-input__clear-btn"
            onClick={handleClear}
            type="button"
          >
            <img
              src="/assets/button/icon_clear.svg"
              alt="지우기"
              className="name-input__clear-btn-icon"
            />
          </button>
        )}
      </div>
    </div>
  );
}
