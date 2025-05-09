import React, { useState } from "react";
import "../../styles/css/CodeInput.css";

export default function CodeInput({
  value,
  onChange,
  timeLeft,
  isError,
  isValid,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.trim() !== "";

  const handleClear = () => {
    onChange("");
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="code-input">
      <div
        className={`code-input__wrapper ${isFocused ? "focused" : ""} ${
          isError ? "error" : ""
        }`}
      >
        <input
          className={`code-input__field ${hasValue ? "filled" : ""}`}
          type="text"
          inputMode="numeric"
          placeholder="인증번호"
          value={value}
          maxLength={6}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* ❌ Clear 버튼 */}
        {hasValue && (
          <button
            className="code-input__clear-btn"
            onClick={handleClear}
            type="button"
          >
            <img
              src="/assets/button/icon_clear.svg"
              alt="지우기"
              className="code-input__clear-btn-icon"
            />
          </button>
        )}

        {/* ✅ 체크 아이콘 */}
        {isValid && (
          <img
            src="/assets/icon_check.svg"
            alt="확인됨"
            className="code-input__check-icon"
          />
        )}

        {/* ⏰ 타이머 */}
        {!isValid && (
          <div
            className="code-input__timer"
            style={{
              color: timeLeft > 0 ? "#666" : "red",
            }}
          >
            {timeLeft > 0 ? `${formatTime(timeLeft)}` : "0:00"}
          </div>
        )}
      </div>

      {/* 🚨 에러 메시지 */}
      {isError && (
        <div className="code-input__error">인증번호를 다시 확인해 주세요.</div>
      )}
    </div>
  );
}
