import React, { useState } from "react";
import "../../styles/css/PhoneInput.css";

export default function PhoneInput({
  value,
  onChange,
  onSend,
  isCodeSent,
  resendCount,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.trim() !== "";
  const isValidPhone = /^010\d{8}$/.test(value);

  const handleClear = () => {
    onChange("");
  };

  const handleChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw.length <= 11) {
      onChange(raw);
    }
  };

  return (
    <div className="phone-input">
      <div className={`name-input__wrapper ${isFocused ? "focused" : ""}`}>
        <input
          className={`phone-input__field ${hasValue ? "filled" : ""}`}
          type="tel"
          pattern="[0-9]*"
          inputMode="numeric"
          placeholder="휴대폰 번호"
          value={value}
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/\D/g, "");
            if (onlyNums.length <= 11) {
              onChange(onlyNums);
            }
          }}
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
      <button
        className="phone-input__button"
        onClick={onSend}
        disabled={value.length !== 11 || !/^010/.test(value)}
      >
        {isCodeSent ? "재전송" : "인증번호 받기"}
      </button>
    </div>
  );
}
