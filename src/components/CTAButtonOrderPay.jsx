import '../styles/css/CTAButtonOrderPay.css';

const CTAButtonOrderPay = ( { totalPrice ,productNum, isEnabled, type="pay" } ) => {
    let btnText;
    if(type === "pay") {
        btnText = productNum !== 0 ? `${totalPrice.toLocaleString()}원 결제하기 ・ 총 ${productNum}건` : "상품을 선택해 주세요"
    } else if(type === "next") {
        btnText = "다음"
    }
    return(
        <div className='cta-area'>
            <button className={`${isEnabled ? "enabled" : ""}`} disabled={!isEnabled}>
                {btnText}
            </button>
        </div>
    )
}

export default CTAButtonOrderPay;