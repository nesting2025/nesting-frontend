import "../styles/css/CTAButton.css";
import { useState, useMemo, useEffect } from "react";
import SelectQuantity from "./SelectQuantity";
import { useToast } from "./common/ToastContext";
import { useToggleProductLike } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import PopupDialog from "./dialog/PopupDialog";
import { useAddCart } from "../hooks/useCart";

const CTAButton =( { isSoldout, isOpenBottomSheet=false, onCloseBottomSheet, isLiked, productId, optionGroups, stock, basePrice }) => {
    const { showToast } = useToast();
    const nav = useNavigate();
    const { mutateAsync } = useToggleProductLike();
    const { addCart, data: addCartData } = useAddCart();

    const [isLike, setIsLiked] = useState(isLiked);
    const [isOpen, setIsOpen] = useState(isOpenBottomSheet);
    const [isOpenLoginDialog, setIsOpenLoginDialog] = useState(false);
    const [isDropDownOption, SetIsDropDownOption] = useState(true);
    const [optionList, setOptionList] = useState([]);

    useEffect(() => {
        if(optionGroups?.length > 0) {
            const mappedOptions = optionGroups[0].values.map((item) =>({
                name: item.value,
                maxQuantity: item.stock,
                quantity: 0,
                price: basePrice + item.priceDelta,
                priceDelta: item.priceDelta,
            }));

            setOptionList(mappedOptions);
        } else {
            setOptionList([{
                name: "",
                maxQuantity: stock,
                quantity: 0,
                price: basePrice
            }])
        }
    }, [optionGroups, basePrice])

    const totalPrice = useMemo(() => {
        return optionList.reduce((total, option) => {
            return total + option.price * option.quantity
        }, 0);
    }, [optionList]);

    useEffect(() => {
        setIsLiked(isLiked);
    }, [isLiked]);

    const likeImgSrc = isSoldout ? "/assets/button/like_btn2_disabled.svg"
    : isLike ? "/assets/button/like_btn2_pressed.svg" 
    : "/assets/button/like_btn2_default.svg";

    // 상품 좋아요 토글 API
    const handleLikeClick = async (e) => {
        e.stopPropagation();
        if(isSoldout) return;

        try {
            const result = await mutateAsync(productId);
            setIsLiked(result.data);
        } catch (err) {
            if (err.message === "해당 요청에 대한 권한이 없습니다.") {
                setIsOpenLoginDialog(true);
            }
        }
    };

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

    const addToCart = async () => {
        if(totalPrice === 0) {
            showToast("옵션을 먼저 선택해 주세요");
            return;
        }

        // 장바구니 담기 API 연결
        const addCartDto = {
            productId: productId,
            quantity: optionList?.length > 1 ? null : optionList[0].quantity,
            options: optionList?.length <= 1 
                ? null 
                : optionList
                .filter(opt => opt.quantity > 0)
                .map(opt => ({
                    name: optionGroups?.[0]?.name,
                    value: opt.name,
                    quantity: opt.quantity,
                    priceDelta: opt.priceDelta
                })) 
        };

        try {
            await addCart(addCartDto);
        } catch(e) {
            setIsOpenLoginDialog(true);  // 오류 발생 시 로그인 팝업 띄움
        }
    }
    // API 응답
    useEffect(() => {
        if(addCartData !== null) {
            if(addCartData?.code === "SUCCESS") showToast("장바구니에 상품을 담았어요", "cart");
        }
    }, [addCartData]);

    const buyProduct = () => {
        if(totalPrice === 0) {
            showToast("옵션을 먼저 선택해 주세요");
        }
    }
    
    return (
        <div className="cta-button-area">
            <PopupDialog open={isOpenLoginDialog} onOpenChange={(newOpen) => setIsOpenLoginDialog(newOpen)} titleText={<>로그인이 필요한 서비스입니다.<br/>로그인 하시겠습니까?</>}
            onClickLeftBtn={() => {}} onClickRightBtn={() => nav("/login")}
            />
            {!isOpen && (
                <div className="default-show-cta">
                    <button 
                    onClick={(e) => handleLikeClick(e)}
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
                        disabled={isSoldout}
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
                        {optionGroups.length === 0 && (stock === 1 || stock === null) ? (
                            <p className="buy-info">*재고가 1개인 상품입니다</p>
                        ) : <></>}

                        {optionList.length > 1 ? (
                            <>
                                <div className={`option-header ${isDropDownOption ? "isDropDown" : ""}`}>
                                    <p className={`option-title ${isDropDownOption ? "isDropDown" : ""}`}>{optionGroups?.[0]?.name}</p>
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