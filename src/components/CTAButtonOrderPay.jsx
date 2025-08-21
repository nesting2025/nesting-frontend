import '../styles/css/CTAButtonOrderPay.css';

const CTAButtonOrderPay = ( { totalPrice ,productNum, isEnabled, type="pay" } ) => {
    let btnText;
    if(type === "pay") {
        btnText = productNum !== 0 ? `${totalPrice.toLocaleString()}원 결제하기 ・ 총 ${productNum}건` : "상품을 선택해 주세요"
    } else if(type === "next") {
        btnText = "다음"
    } else if(type === "product-request") {
        btnText = "장바구니에 담고 견적 확인하기"
    }

    return(
        <div className={`cta-area ${type}`}>
            <button className={`${isEnabled ? "enabled" : ""}`} disabled={!isEnabled}>
                {btnText}
            </button>

            {type === "product-request" && <span>페이지를 나가시면 작성하신 상품 정보가 사라질 수 있어요. <br />저장을 원하신다면 장바구니에 먼저 담아주세요!</span>}
        </div>
    )
}

export default CTAButtonOrderPay;