import React, { useEffect } from 'react';
import '../styles/css/OrderPay.css';
import AddressChange from '../components/AddressChange';
import OrderProductCard from '../components/goods/OrderProductCard';
import CustomCheckbox from '../components/common/CustomCheckbox';
import CTAButtonOrderPay from '../components/CTAButtonOrderPay';
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
  const [orderProductDomesticList, setOrderProductDomesticList] = useState([
    {
      imgSrc: "/assets/sample/dummy_product10.svg",
      title: "상품명1",
      originPrice: 10000,  // 수량 포함된 가격
      discountedPrice: 8000,  // 수량 포함된 가격
      quantity: 1,
      option: "선택지 A/선택지 ①",
      deliveryFee: 0,
    },
    {
      imgSrc: "/assets/sample/dummy_product8.svg",
      title: "상품명2",
      originPrice: 8000,
      discountedPrice: 8000,
      quantity: 3,
      option: "",
      deliveryFee: 0,
    },
      {
      imgSrc: "/assets/sample/dummy_product4.svg",
      title: "상품명3",
      originPrice: 20000,
      discountedPrice: 16000,
      quantity: 3,
      option: "",
      deliveryFee: 3000,
    },
  ])

  const [orderProductOverseasList, setOrderProductOverseasList] = useState([
    {
      imgSrc: "/assets/sample/dummy_product7.svg",
      title: "상품명입니다릴라라랄리라",
      originPrice: 8000,
      discountedPrice: 5000,
      quantity: 1,
      option: "",
      deliveryFee: 0,
    },
  ])

  const paymentOptions = ["신용카드", "체크카드", "무통장 입금", "네이버페이", "카카오페이"];
  const [selectedMethod, setSelectedMethod] = useState("신용카드");
  const [isCheckbox, setIsCheckbox] = useState(false);

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

  const getCustomNumber = () => {
    window.open('https://unipass.customs.go.kr/csp/persIndexRectOnslCrtf.do?qryIssTp=1');
  }
  const [customNum, setCustomNum] = useState("");

  const isEnabled = useMemo(()=> {
    return !isFormEmpty && !!customNum && (orderProductDomesticList.length > 0 || orderProductOverseasList.length > 0) && isCheckbox;
  }, [isFormEmpty, customNum, orderProductDomesticList, orderProductOverseasList, isCheckbox])

  const priceSummary = useMemo(() => {
    const allProducts = [...orderProductDomesticList, ...orderProductOverseasList];
        const summary = allProducts.reduce(
            (acc, product) => {
                acc.totalOriginPrice += product.originPrice;
                acc.totalDiscountedPrice += product.discountedPrice;
                acc.totalDeliveryFee += product.deliveryFee;    
                return acc;
            },
            {
                totalOriginPrice: 0,
                totalDiscountedPrice: 0,
                totalDeliveryFee: 0
            }
        );
        const result = {
            ...summary,
            totalDiscount: summary.totalOriginPrice - summary.totalDiscountedPrice,
            totalPrice: summary.totalDiscountedPrice + summary.totalDeliveryFee
        };
        return result;
    }, [orderProductDomesticList, orderProductOverseasList]);

  return (
    <div className="order-page">
      <div className="order-page-title">
        <img src='assets/button/btn_back2.svg' />
        <p>주문/결제</p>
      </div>

      {/* 배송지 */}
      <section className="order-section">
        <div className="order-section-title destination">
          <div className='left-group'>
            <span className='title'>배송지</span>
            {form.isDefaultAdd !== undefined && <span className='chip'>{form.isDefaultAdd ? "기본" : "최근"} </span>}
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
                <p className='address-content'>{`[${form.postalCode}] ${form.address}${form.detailAdd ? `, ${form.detailAdd}` : ''}`}</p>
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
            <button className="order-lookup-btn" onClick={getCustomNumber}>10초만에 조회하기</button>
        </div>
        <div className="order-customs-code">
          <input 
            type="text" 
            placeholder="P로 시작하는 13자리" 
            maxLength={13}
            value={customNum}
            onChange={(e)=>setCustomNum(e.target.value)}
          />
        </div>
      </section>

      {/* 주문 상품 */}
      <section className="order-section">
        {orderProductDomesticList.length > 0 && (
          <div>
            <div className="order-section-title">국내배송 상품
              <span className="order-section-title count">{orderProductDomesticList.length}건</span>
            </div>
            <div className='order-list-area'>
              {orderProductDomesticList.map((item, index) => 
                <OrderProductCard
                  key={index} 
                  productData={item}
                />
              )}
            </div>
          </div>
        )}
        
        {orderProductDomesticList.length > 0 && orderProductOverseasList.length > 0 && <div className='diver' />}
        
        {orderProductOverseasList.length > 0 && (
          <div>
            <div className="order-section-title">해외배송 상품
              <span className="order-section-title count">{orderProductOverseasList.length}건</span>
            </div>
            <div className='order-list-area'>
              {orderProductOverseasList.map((item, index) => 
                <OrderProductCard
                  key={index} 
                  productData={item}
                />
              )}
            </div>
          </div>
        )}
      </section>

      {/* 결제 수단 */}
      <section className="order-section">
        <div className="order-section-title">결제 수단</div>
        <div className="order-payment-methods">
          {paymentOptions.map((method) =>
            <button
              key={method}
              onClick={() => setSelectedMethod(method)}
              className={selectedMethod === method ? "selected" : ""}
            >{method}</button>
          )}
        </div>
      </section>

      {/* 결제 금액 */}
      <section className="order-section">
        <div className="order-section-title">결제 금액</div>
        <div className="order-price-row">
          <span className="order-price-row left">상품 금액</span>
          <span className="order-price-row right">{priceSummary.totalOriginPrice.toLocaleString()}원</span>
        </div>
        <div className="order-price-row">
          <span className="order-price-row left">할인 금액</span>
          <span className="order-price-row right red">-{priceSummary.totalDiscount.toLocaleString()}원</span>
        </div>
        <div className="order-price-row">
          <span className="order-price-row left">배송비</span>
          <span>{priceSummary.totalDeliveryFee === 0 ? "무료배송": `${priceSummary.totalDeliveryFee.toLocaleString()}원`}</span>
        </div>
        <div className="order-price-row-total">
          <span className="order-price-row-total left">총 결제 금액</span>
          <span className="order-price-row-total right">{priceSummary.totalPrice.toLocaleString()}원</span>
        </div>
      </section>

      {/* 동의 체크 */}
      <div className="order-agreement">
        <CustomCheckbox 
          label="[필수] 주문한 상품의 결제, 배송, 주문정보를 확인하였으며 이에 동의합니다."
          checked={isCheckbox}
          onChange={()=>setIsCheckbox(prev => !prev)}
        />
      </div>
      
      {showAddBottomSheet && 
        <AddressChange 
        onClose={()=>SetShowAddBottomSheet(false)}
        onSelect={handleSlectAddress}
        selectedDestination={form.destination} />}

      <CTAButtonOrderPay totalPrice={priceSummary.totalPrice} productNum={orderProductDomesticList.length + orderProductOverseasList.length} isEnabled={isEnabled}/>
    </div>
  );
};

export default OrderPay;
