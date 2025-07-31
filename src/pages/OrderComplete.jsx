import { useState } from "react";
import OrderProductCard from "../components/goods/OrderProductCard";
import '../styles/css/OrderComplete.css';

const OrderComplete = () => {
    const nickname = "쫀득물만두"

    const [form, setForm] = useState({
        destination: '집',
        receiver: '홍길동',
        phone: '010-1234-5678',
        address: '서울특별시 중구 퇴계로 265',
        detailAdd: 'B205',
        postalCode: '02000',
        isDefaultAdd: false,
        selectedOption: '',
        customDetailRequest: ''
    });

    const [orderProductList, setOrderProductList] = useState([
        {
          imgSrc: "/assets/sample/dummy_product10.svg",
          title: "상품명1",
          originPrice: 10000,
          discountedPrice: 8000,
          quantity: 1,
          option: "선택지 A/선택지 ①",
        },
        {
          imgSrc: "/assets/sample/dummy_product8.svg",
          title: "상품명2",
          originPrice: 0,
          discountedPrice: 8000,
          quantity: 3,
          option: "",
        },
    ])

    return (
        <div className="order-complete">
            <div className="header">
                <p>주문완료</p>
                <img src="/assets/button/btn_x2.svg" />
            </div>

            <div className="order-complete-info-area">
                <p>주문 완료!<br /><span>{nickname}</span>님의 알이 부화 준비중이에요</p>
                <img src="/assets/icon/ic_order_complete.svg" />
                <div className="button-row">
                    <button className="button1">알의 상태 보러가기</button>
                    <button className="button2">계속 쇼핑하기</button>
                </div>
            </div>

            <div className="diver" />

            <div className="oreder-detail">
                <p className="detail-content1">주문 상세 내역 - 25.07.25</p>
                <p className="detail-content2">주문 번호: 000000000000000000</p>
            </div>

            {/* 배송지 */}
            <section className="order-section">
                <div className="order-section-title destination">
                    <span className='title'>배송지</span>
                   
                    <span className="order-section-title register">변경</span>
                </div>
    
                <div className='address-area1'>
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
            </section>

            <div className="diver" />

            {/* 주문 상품 */}
            <section className="order-section">
                <div className="order-section-title">주문 상품
                    <span className="order-section-title count">{orderProductList.length}건</span>
                </div>

                <div className='order-list-area'>
                {orderProductList.map((item, index) => 
                    <OrderProductCard
                    key={index} 
                    productData={item}
                    />
                )}
                </div>
            </section>

            <div className="diver" />

            {/* 결제 수단 */}
            <section className="order-section">
                <div className="order-section-title">결제 수단</div>

                <div className='pay-row'>
                    <p className='pay-title'>결제 수단</p>
                    <p className='pay-content'>네이버페이-KB카드(일시불)</p>
                </div>
            </section>

            <div className="diver" />

            {/* 결제 금액 */}
            <section className="order-section">
                <div className="order-section-title">결제 금액</div>
                <div className="order-price-row">
                    <span className="order-price-title">상품 금액</span>
                    <span className="order-price-content">10,000원</span>
                </div>
                <div className="order-price-row">
                    <span className="order-price-title">할인 금액</span>
                    <span className="order-price-content red">-2,000원</span>
                </div>
                <div className="order-price-row">
                    <span className="order-price-title">배송비</span>
                    <span className="order-price-content">무료배송</span>
                </div>
                <div className="price-total">
                    <span className="price-total-title">총 결제 금액</span>
                    <span className="price-total-content">8,000원</span>
                </div>
            </section>

        </div>
    )
}

export default OrderComplete;