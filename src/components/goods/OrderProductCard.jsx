import '../../styles/css/OrderProductCard.css';

const OrderProductCard = ({ productData }) => {
    const { imgSrc, title, originPrice, discountedPrice, option, isSoldout=false, isUnableOrder = false } = productData;
    
    return (
        <div className="order-product-card">
            <div className="order-product">
                <div className='img-wrapper'>
                    <img src={imgSrc} />
                    {(isUnableOrder || isSoldout) && <div className='soldout-overlay'><span>{isUnableOrder ? "주문불가" : "품절"}</span></div>}
                </div>
                <div className="order-product-info" >
                    <div className="order-product-title">{title}</div>
                    <div className="order-product-price" style={{display:'flex',alignItems:'center'}}> 
                    {originPrice !== discountedPrice && <span className="order-origin-price">{originPrice?.toLocaleString()}원</span>}
                    <span className="order-sale-price">{discountedPrice?.toLocaleString()}원</span>
                    </div>
                </div>
            </div>
            {option.map((option, i) => (
                <div className="order-quantity" key={i}>
                    <p>
                        <span>수량:</span>
                        <span className="order-quantity-count">{option.quantityOption}개</span>
                    </p>
                    {option.textOption && (
                        <>
                            <p className='line'>|</p>
                            <p>{option.textOption}</p>
                        </>
                    )}
                </div>
            )) }
        </div>
    )
}

export default OrderProductCard;