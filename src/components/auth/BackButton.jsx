import React from "react";
import "../../styles/css/BackButton.css";

export default function BackButton({ onBack }) {
  return (
    <button className="back-button" onClick={onBack}>
      <img
        src="assets/button/btn_back.svg"
        alt="뒤로가기"
        className="back-button__icon"
      />
    </button>
  );
}
