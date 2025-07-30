import '../styles/css/CTAButtonOrderPay.css';

const CTAButtonOrderPay = ( { totalPrice ,productNum, isEnabled } ) => {
    return(
        <div className='cta-area'>
            <button className={`${isEnabled ? "enabled" : ""}`} disabled={!isEnabled}>{totalPrice.toLocaleString()}원 결제하기 ・ 총 {productNum}건</button>
        </div>
    )
}

export default CTAButtonOrderPay;