import '../styles/css/CTAButtonOrderPay.css';

const CTAButtonOrderPay = ( { totalPrice ,productNum, isEnabled } ) => {
    return(
        <div className='cta-area'>
            <button className={`${isEnabled ? "enabled" : ""}`} disabled={!isEnabled}>
                {productNum !== 0 ? `${totalPrice.toLocaleString()}원 결제하기 ・ 총 ${productNum}건` : "상품을 선택해 주세요"}
            </button>
        </div>
    )
}

export default CTAButtonOrderPay;