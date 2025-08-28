import '../../styles/css/OrderProductCard.css';

const OrderProductCard = ({ productData }) => {
    const { productThumbnail, productName, totalPrice, totalDiscountedPrice, quantity, option, options, soldOut=false, status } = productData;
    
    return (
        <div className="order-product-card">
            <div className="order-product">
                <div className='img-wrapper'>
                    <img src={productThumbnail} />
                    {(status === "REJECTED" || soldOut) && <div className='soldout-overlay'><span>{status === "REJECTED" ? "주문불가" : "품절"}</span></div>}
                </div>
                <div className="order-product-info" >
                    <div className="order-product-title">{productName}</div>
                    <div className="order-product-price" style={{display:'flex',alignItems:'center'}}> 
                    {totalDiscountedPrice && <span className="order-origin-price">{totalPrice?.toLocaleString()}원</span>}
                    <span className="order-sale-price">{(totalDiscountedPrice ? totalDiscountedPrice : totalPrice)?.toLocaleString()}원</span>
                    </div>
                </div>
            </div>
            {!options && (
                <div className="order-quantity">
                    <p>
                        <span>수량:</span>
                        <span className="order-quantity-count">{option ? option.quantity : quantity}개</span>
                    </p>
                    {option && option.value && (
                        <>
                            <p className='line'>|</p>
                            <p>{option.value}</p>
                        </>
                    )}
                </div>
            )}
            {options && options.map((option, i) => (
                <div className="order-quantity" key={i}>
                    <p>
                        <span>수량:</span>
                        <span className="order-quantity-count">{option.quantity}개</span>
                    </p>
                    {option.value && (
                        <>
                            <p className='line'>|</p>
                            <p>{option.value}</p>
                        </>
                    )}
                </div>
            )) }
        </div>
    )
}

export default OrderProductCard;