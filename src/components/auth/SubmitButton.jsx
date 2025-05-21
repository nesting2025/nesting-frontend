import React from "react";
import "../../styles/css/SubmitButton.css";

export default function SubmitButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      className={`submit-button ${disabled ? "disabled" : ""}`}
      disabled={disabled}
    >
      <span className="submit-button-text">인증 완료</span>
    </button>
  );
}
