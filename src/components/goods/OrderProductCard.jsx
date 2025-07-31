import '../../styles/css/OrderProductCard.css';

const OrderProductCard = ({ productData }) => {
    const { imgSrc, title, originPrice, discountedPrice, quantity, option, isSoldout=false } = productData;
    
    return (
        <div className="order-product-card">
            <div className="order-product">
                <div className='img-wrapper'>
                    <img src={imgSrc} />
                    {isSoldout && <div className='soldout-overlay'><span>품절</span></div>}
                </div>
                <div className="order-product-info" >
                    <div className="order-product-title">{title}</div>
                    <div className="order-product-price" style={{display:'flex',alignItems:'center'}}> 
                    {originPrice !==0 && <span className="order-origin-price">{originPrice?.toLocaleString()}원</span>}
                    <span className="order-sale-price">{discountedPrice?.toLocaleString()}원</span>
                    </div>
                </div>
            </div>
            <div className="order-quantity">
                <p>
                    <span>수량:</span>
                    <span className="order-quantity-count">{quantity}개</span>
                </p>
                {option && (
                    <>
                        <p className='line'>|</p>
                        <p>{option}</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default OrderProductCard;