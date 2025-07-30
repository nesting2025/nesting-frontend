import React, { useEffect } from 'react';
import '../styles/css/OrderPay.css';
import AddressChange from '../components/AddressChange';
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useMemo } from "react";

const OrderPay = () => {
  const nav = useNavigate();
  const handleAddress = () => {
    if(isFormEmpty) {
      nav("/address-register");
    }
    else {
      SetShowAddBottomSheet(true);
    }
  };
  const [form, setForm] = useState({
    // destination: '집',
    // receiver: '홍길동',
    // phone: '010-1234-5678',
    // address: '서울특별시 중구 퇴계로 265',
    // detailAdd: 'B205',
    // postalCode: '02000',
    // isDefaultAdd: false,
    // selectedOption: '',
    // customDetailRequest: ''
  });
  const isFormEmpty = useMemo(() => {
    const isAnyEmpty = !form.destination || !form.receiver || !form.phone || !form.address || !form.postalCode;
    return isAnyEmpty;
  }, [form])

  // 커스텀 드롭다운 상태 관리
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    '부재 시 경비실에 맡겨주세요',
    '부재 시 문 앞에 놓아주세요',
    '배송 전에 연락주세요',
    '빠른 배송 부탁드려요',
    '보관함에 넣어주세요',
    '무인 택배함에 보관해주세요',
    '직접 입력',
  ];
  const [showAddBottomSheet, SetShowAddBottomSheet] = useState(false);

  const handleSlectAddress = (selectedAddress) => {
    setForm(selectedAddress);
    SetShowAddBottomSheet(false);
  }

  const handleSelectOption = (option) => {
    setForm(prev => ({...prev, selectedOption: option}))
    setIsOpen(false);
  };

  const location = useLocation();
  useEffect(()=> {
    if(location.state) {
      setForm(location.state);
    }
  }, [location.state]);

  return (
    <div className="order-page">
      <div className="order-page-title">주문/결제</div>
{/* {form.isDefaultAdd ? "기본" : "최근"} */}

      {/* 배송지 */}
      <section className="order-section">
        <div className="order-section-title">
          <div className='left-group'>
            <span className='title'>배송지</span>
            <span className='chip'>기본</span>
          </div>
            <span className="order-section-title register" onClick={handleAddress}>{isFormEmpty ? '등록' : '변경'}</span>
        </div>
        {isFormEmpty ? <div className="order-address-box">배송지를 등록해 주세요</div> :
        (
          <div>
            <div className='address-area1'>
              <div className='address-row'>
                <p className='address-title'>유형</p>
                <p className='address-content'>{form.destination}</p>
              </div>
              <div className='address-row'>
                <p className='address-title'>받는 분</p>
                <p className='address-content'>{form.receiver}</p>
              </div>
              <div className='address-row'>
                <p className='address-title'>연락처</p>
                <p className='address-content'>{form.phone}</p>
              </div>
              <div className='address-row'>
                <p className='address-title'>주소</p>
                <p className='address-content'>{`[${form.postalCode}] ${form.address}, ${form.detailAdd}`}</p>
              </div>
            </div>
            <div className={`custom-select ${isOpen ? 'open' : ''}`}>
            <div className={`select-styled ${form.selectedOption ? '' : 'defaultOption'}`} onClick={() => setIsOpen(!isOpen)}>
              <span>{form.selectedOption || '배송 요청사항 (선택)'}</span>
              <img className='arrow' src={isOpen ? '/assets/button/btn_dropup.svg' : '/assets/button/btn_dropdown.svg'} />
            </div>
            {isOpen && (
              <ul className="select-options">
                {options.map((option) => (
                  <li
                    key={option}
                    onClick={() => handleSelectOption(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
            {form.selectedOption==='직접 입력' && 
            <input 
              className='input-address-option' type="text" placeholder="배송 기사님에게 전달돼요 (최대 100자)" 
              value={form.customDetailRequest}
              onChange={(e) => setForm(prev => ({...prev, customDetailRequest: e.target.value}))}/>}
          </div>

          </div>
        )}
        
        
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
      {showAddBottomSheet && 
      <AddressChange 
      onClose={()=>SetShowAddBottomSheet(false)}
      onSelect={handleSlectAddress}
      selectedDestination={form.destination} />}
    </div>
  );
};

export default OrderPay;
