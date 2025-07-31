import "../styles/css/CTAButton.css";
import { useState, useMemo } from "react";
import SelectQuantity from "./SelectQuantity";
import { useToast } from "./common/ToastContext";

const CTAButton =( { isSoldout, isOpenBottomSheet=false, onCloseBottomSheet} ) => {
    const { showToast } = useToast();
    const [isLike, setIsLiked] = useState(false);
    const [isOpen, setIsOpen] = useState(isOpenBottomSheet);
    const [isDropDownOption, SetIsDropDownOption] = useState(true);
    const [optionList, setOptionList] = useState([
        {
            name: "선택지 A",
            maxQuantity: 5,
            quantity: 0,
            price: 8000,
        },
        {
            name: "선택지 B",
            maxQuantity: 1,
            quantity: 0,
            price: 8000,
        },
        {
            name: "선택지 C",
            maxQuantity: 0,
            quantity: 0,
            price: 8000,
        },
        {
            name: "선택지 D",
            maxQuantity: 3,
            quantity: 0,
            price: 8000,
        },
        {
            name: "선택지 E",
            maxQuantity: 4,
            quantity: 0,
            price: 8000,
        },
    ]);

    const totalPrice = useMemo(() => {
        return optionList.reduce((total, option) => {
            return total + option.price * option.quantity
        }, 0);
    }, [optionList]);

    const likeImgSrc = isSoldout ? "/assets/button/like_btn2_disabled.svg"
    : isLike ? "/assets/button/like_btn2_pressed.svg" 
    : "/assets/button/like_btn2_default.svg";

    const handleCloseBottomSheet = () => {
        setIsOpen(false);
        setOptionList(prev => prev.map(item => ({...item, quantity:0})));
        SetIsDropDownOption(true);
        onCloseBottomSheet?.();
    }

    const handleOptionClick = (index) => {
        const option = optionList[index];
        if(option.maxQuantity === 0) return;

        if(option.quantity === 0) {
            setOptionList(prev =>
                prev.map((item, i) =>
                i===index ? {...item, quantity:1} : item
                )
            );
        }
    }

    const handleSelectAllOptions = () => {
        setOptionList(prev =>
            prev.map((item) =>
            item.maxQuantity > 0 ? {...item, quantity:1} : item) 
        );
        SetIsDropDownOption(prev => !prev)
    }

    const addToCart = () => {
        if(totalPrice === 0) {
            showToast("옵션을 먼저 선택해 주세요");
            return;
        }

        showToast("장바구니에 상품을 담았어요", "cart");
    }

    const buyProduct = () => {
        if(totalPrice === 0) {
            showToast("옵션을 먼저 선택해 주세요");
        }
    }
    
    return (
        <div className="cta-button-area">
            {!isOpen && (
                <div className="default-show-cta">
                    <button 
                    onClick={() => setIsLiked(prev => !prev)}
                    className="liket-btn"
                    disabled={isSoldout}
                    >
                        <img 
                            className={`like-img ${isSoldout ? "soldout" : ""}`}
                            src={likeImgSrc}
                        />
                    </button>

                    <button 
                        className={`show-buy-bottomsheet ${isSoldout ? "soldout" : ""}`}
                        onClick={()=>setIsOpen(true)}
                    >
                        {isSoldout ? "품절된 상품이에요" : "구매하기"}
                    </button>
                </div>
            )}

            {isOpen && (
                <>
                    <div className="bottom-sheet-overlay"
                    onClick={handleCloseBottomSheet}
                     />
                    <div className="bottom-sheet">
                        <img
                            className="bottom-sheet-down-button" 
                            src="/assets/button/bottom_sheet_down.svg"
                            onClick={handleCloseBottomSheet}
                        />

                        {/* 선택지가 하나이고 최대수량이 1개인 경우 */}
                        {optionList.length === 1  && optionList[0].maxQuantity === 1 ? (
                            <p className="buy-info">*재고가 1개인 상품입니다</p>
                        ) : <></>}

                        {optionList.length > 1 ? (
                            <>
                                <div className={`option-header ${isDropDownOption ? "isDropDown" : ""}`}>
                                    <p className={`option-title ${isDropDownOption ? "isDropDown" : ""}`}>옵션 1</p>
                                    <div className="right-group">
                                        {isDropDownOption && 
                                        <button className="select-all-options" onClick={handleSelectAllOptions}>풀세트 선택하기</button>
                                        }
                                        <img 
                                        className="drop-btn" 
                                        src={isDropDownOption ? "/assets/button/btn_dropup.svg" : "/assets/button/btn_dropdown.svg"} 
                                        onClick={()=>SetIsDropDownOption(prev => !prev)}
                                        />
                                    </div>
                                </div>
                                {isDropDownOption && (
                                    <div className="option-list-area">
                                        {optionList.map((option, index) => (
                                            <div
                                                key={index}
                                                className={`dropdown-option ${option.maxQuantity === 0? 'sold-out' : ''}`}
                                                onClick={() =>{ 
                                                    handleOptionClick(index);
                                                    if(option.maxQuantity > 0) {
                                                        SetIsDropDownOption(prev => !prev);
                                                    }    
                                                }}
                                            >{option.name}
                                            {option.maxQuantity===0 && " (품절)"}
                                            </div>
                                        ))}
                                    </div>
                                )}   
                            </>        
                        ) : (
                            optionList[0].quantity === 0 && handleOptionClick(0)
                        )}             

                        <div className={`selected-area ${optionList.length > 1 ? 'list' : ''}`}>
                            {optionList
                            .map((option, index) => ({option, index}))
                            .filter(({option}) => option.quantity > 0)
                            .map(({option, index}) => (
                                <SelectQuantity
                                key={index}
                                name={option.name}
                                maxQuantity={option.maxQuantity}
                                isMinQuantity={optionList.length === 1}
                                quantity={option.quantity}
                                price={option.price}
                                onChangeQuantity={(newQty) => {
                                    setOptionList(prev => 
                                        prev.map((item, i) =>
                                            i === index ? {...item, quantity: newQty} : item
                                    ))
                                }}
                                />
                            ))}
                        </div>
                        
                        <div className="show-price-row">
                            <p className="title-price">총 결제 금액</p>
                            <p className="price">{totalPrice.toLocaleString()}원</p>
                        </div>
                        <hr/>

                        <div className="bottom-sheet-button-row">
                            <button className="show-buy-bottomsheet cart" onClick={addToCart}>장바구니 담기</button>
                            <button className="show-buy-bottomsheet buy" onClick={buyProduct}>구매하기</button>
                        </div>

                    </div>
                </>
            )}
        </div>
    )
}

export default CTAButton;