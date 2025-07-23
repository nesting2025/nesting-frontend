import "../styles/css/SelectQuantity.css";

const SelectQuantity = ({ name, quantity, maxQuantity, isMinQuantity, price, onChangeQuantity}) => {
    return (
        <div className="select-quantity-area">
            <div className="title-row">
                <p className={`title-quantity ${!isMinQuantity ? 'name' : ''}`}>
                    {!isMinQuantity ? name : "수량 선택"}
                </p>
                {!isMinQuantity && 
                    <img className="delete-btn" src="/assets/button/btn_x2.svg" onClick={()=>onChangeQuantity(0)} /> 
                }
            </div>
            <div className="select-quantity-row">
                <div className="select-quantity">
                    <button 
                        className={`select-quantity-button ${quantity>1 ? 'active' : ''}`}
                        onClick={()=>{ quantity > 1 && onChangeQuantity(quantity-1)}}
                    >-</button>
                    <p className="quantity">{quantity}</p>
                    <button 
                        className={`select-quantity-button ${quantity<maxQuantity ? 'active' : ''}`}
                        onClick={()=>{ quantity < maxQuantity && onChangeQuantity(quantity+1)}}
                    >+</button>
                </div>
                <p className="price">{Number(price).toLocaleString()}원</p>
            </div>
        </div>
    )
}

export default SelectQuantity;