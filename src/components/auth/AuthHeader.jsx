import React from "react";
import "../../styles/css/AuthHeader.css";

export default function AuthHeader({ onBack }) {
  return (
    <div className="auth-header">
      <h2 className="auth-header__title">본인 인증</h2>
      <p className="auth-header__subtitle">
        계정 연결을 위해 본인 인증이 필요해요
      </p>
    </div>
  );
}
