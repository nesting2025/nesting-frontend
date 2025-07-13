import React from 'react';
import '../styles/css/OrderPay.css';

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const OrderPay = () => {
    const nav = useNavigate();
    const gotoAddressRegisterPage = () => nav("/address-register");

  return (
    <div className="order-page">
      <div className="order-page-title">주문/결제</div>

      {/* 배송지 */}
      <section className="order-section">
        <div className="order-section-title" style={{justifyContent:'space-between'}}>배송지
            <span className="order-section-title register" onClick={gotoAddressRegisterPage}>등록</span>
        </div>
        <div className="order-address-box">배송지를 등록해 주세요</div>
      </section>

      {/* 개인통관고유부호 */}
      <section className="order-section">
        <div className="order-section-title" style={{justifyContent:'space-between'}}>개인통관고유부호
            <button className="order-lookup-btn">10초만에 조회하기</button>
        </div>
        <div className="order-customs-code">
          <input type="text" placeholder="P로 시작하는 13자리" maxLength={13}/>
        </div>
      </section>

      {/* 주문 상품 */}
      <section className="order-section">
        <div className="order-section-title">주문 상품
            <span className="order-section-title count">1건</span>
        </div>
    
        <div className="order-product">
          <img src="https://via.placeholder.com/60" alt="order-product" />
          <div className="order-product-info" >
            <div className="order-product-title">상품명은 최대 1줄 노출상품명은 최대 1줄 노출상품명은 최대 1줄 노출asdfasdfasdfasdf</div>
            <div className="order-product-price" style={{display:'flex',alignItems:'center'}}> 
              <span className="order-origin-price">10,000원</span>
              <span className="order-sale-price">8,000원</span>
            </div>
          </div>
        </div>
        <div className="order-quantity">
            수량:&nbsp;
            <span className="order-quantity count">1개</span>
        </div>

      </section>

      {/* 결제 수단 */}
      <section className="order-section">
        <div className="order-section-title">결제 수단</div>
        <div className="order-payment-methods">
          <button>신용카드</button>
          <button>체크카드</button>
          <button>무통장 입금</button>
          <button>네이버페이</button>
          <button>카카오페이</button>
        </div>
      </section>

      {/* 결제 금액 */}
      <section className="order-section">
        <div className="order-section-title">결제 금액</div>
        <div className="order-price-row"><span className="order-price-row left">상품 금액</span><span className="order-price-row right">10,000원</span></div>
        <div className="order-price-row"><span className="order-price-row left">할인 금액</span><span className="order-price-row right red">-2,000원</span></div>
        <div className="order-price-row"><span className="order-price-row left">배송비</span><span>-</span></div>
        <div className="order-price-row-total"><span className="order-price-row-total left">총 결제 금액</span><span className="order-price-row-total right">8,000원</span></div>
      </section>

      {/* 동의 체크 */}
      <div className="order-agreement">
        <input className="order-checkbox" type="checkbox" />
        <div>[필수] 주문한 상품의 결제, 배송, 주문정보를 확인하였으며 이에 동의합니다.</div>
      </div>
    </div>
  );
};

export default OrderPay;
