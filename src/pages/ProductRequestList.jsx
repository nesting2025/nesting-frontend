import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../styles/css/ProductRequestList.css";
import CustomCheckbox from "../components/common/CustomCheckbox";
import OrderProductCard from "../components/goods/OrderProductCard";
import { useToast } from "../components/common/ToastContext";
import CTAButtonOrderPay from "../components/CTAButtonOrderPay";

const ProductRequestList = () => {
    const nav = useNavigate();
    const { showToast } = useToast();
    const [productDomain, setProductDomain] = useState("");

    const [requestedProductList, setRequestedProductLis] = useState([
        {
            link: "http://어쩌고",
            status: "loading",
            productData: null,
            checked: false,
            requestedDate: "8월 4일",
            option: []
        },
        {
            link: "http://어쩌고",
            status: "success",
            productData: {
                imgSrc: "/assets/sample/dummy_product.svg",
                title: "상품명은 최대 1줄 노출 상품명은 최대 1줄 노출 길어지면 말줄임",
                originPrice: 8000,
                discountedPrice: 8000,
                quantity: 1,
                option: "",
                isSoldout: false
            },
            checked: false,
            requestedDate: "8월 4일",
            option: []
        },
        {
            link: "http://어쩌고222",
            status: "success",
            productData: {
                imgSrc: "/assets/sample/dummy_product2.svg",
                title: "2222상품명은 최대 1줄 노출 상품명은 최대 1줄 노출 길어지면 말줄임",
                originPrice: 8000,
                discountedPrice: 8000,
                quantity: 1,
                option: "",
                isSoldout: true
            },
            checked: false,
            requestedDate: "8월 4일",
            option: []
        },
        {
            link: "http://어쩌고333",
            status: "error",
            productData: null,
            checked: false,
            requestedDate: "8월 4일",
            option: [
                { textOption: "", quantityOption: 1 }
            ]
        },
    ]);

    const getProduct = () => {
        if(!productDomain) {
            showToast("원하는 상품의 링크(URL)를 입력해 주세요 ");
            return;
        }

        const newItem = {
            link: productDomain,
            status: "loading",
            productDomain: null,
            requestedDate: new Date().toLocaleDateString("ko-KR", {
            month: "long",
            day: "numeric",
            }),
            option: null
        };
        setRequestedProductLis((prev) => [newItem, ...prev]);
        setProductDomain("");

        // 잘못된 도메인인 경우
        // window.alert("상품을 불러오지 못했어요. 입력하신 링크가 맞는지 확인해 주세요.");
    }

    const handleChangeQuantity = (productIndex, optionIndex, newQuantity) => {
        setRequestedProductLis((prev) =>
            prev.map((item, i) => {
            if (i !== productIndex) return item;
            return {
                ...item,
                option: item.option.map((opt, j) =>
                j === optionIndex ? { ...opt, quantityOption: newQuantity } : opt
                )
            };
            })
        );
    };

    const handleChangeTextOption = (productIndex, optionIndex, newText) => {
        setRequestedProductLis(prev =>
            prev.map((item, i) => {
            if (i !== productIndex) return item;
            return {
                ...item,
                option: item.option.map((opt, j) =>
                j === optionIndex ? { ...opt, textOption: newText } : opt
                )
            };
            })
        );
    };

    const handleAddOption = (productIndex) => {
        setRequestedProductLis(prev =>
            prev.map((item, i) =>
            i === productIndex
                ? {
                    ...item,
                    option: [...(item.option || []), { textOption: "", quantityOption: 1 }]
                }
                : item
            )
        );
    }

    const handleRemoveProduct = (productIndex) => {
        setRequestedProductLis(prev => 
            prev.filter((_, i) => i !== productIndex)
        );
    };

    const handleToggleChecked = (productIndex) => {
        setRequestedProductLis(prev =>
            prev.map((item, i) =>
                i === productIndex ? {...item, checked: !item.checked} : item
            )
        );
    };

    return(
        <div className="product-request-list">
            <div className="header">
                <img 
                    className="back-button"
                    src="/assets/button/btn_back2.svg" 
                    onClick={() => nav(-1)}
                />
                <p>구매대행 요청하기</p>
            </div>

            <div className="add-product-area">
                <h3>상품 추가</h3>
                <div className="input-area">
                    <img src="/assets/icon/icon_link.svg" />
                    <input placeholder="원하는 상품의 링크(URL)를 입력해 주세요 " value={productDomain} onChange={(e) => setProductDomain(e.target.value)}/>
                </div>

                <button onClick={getProduct}>불러오기</button>
            </div>

            <div className="diver" />

            {requestedProductList.map((item, index) => (
                <React.Fragment key={index}>
                    <RequestedProduct
                        link={item.link}
                        status={item.status}
                        productData={item.productData}
                        requestedDate={item.requestedDate}
                        option={item.option}
                        onChangeQuantity={(optionIdx, newQuantity) => handleChangeQuantity(index, optionIdx, newQuantity)}
                        onChangeTextOption={(optionIdx, value) => handleChangeTextOption(index, optionIdx, value)}
                        onAddOption={() => handleAddOption(index)}
                        onRemove={() => handleRemoveProduct(index)}
                        onToggleCheck={() => handleToggleChecked(index)}
                    />
                    {index !== requestedProductList.length - 1 && <div className="diver" />}
                </React.Fragment>
            ))}
            <CTAButtonOrderPay type="product-request" isEnabled={requestedProductList.some(item => item.checked)}/>

        </div>
    )
}

export default ProductRequestList;

const RequestedProduct = ({ link, status, productData, checked, requestedDate, option, onChangeQuantity, onChangeTextOption, onAddOption, onRemove, onToggleCheck }) => {
    return (
        <div className="requested-product">
            <h3>입력된 URL</h3>
            <div className="input-area">
                <img src="/assets/icon/icon_link.svg" />
                <input value={link} disabled/>
            </div>

            {status === "error" && <p className="error-msg">*해당 링크는 자동으로 상품 정보를 불러올 수 없어, 관리자 확인이 필요합니다. 옵션 입력 후 장바구니에 담아주시면, 확인 후 견적을 안내드릴게요.</p>}


            {status === "loading" && (
                <div className="loading-area">
                    <img src="/assets/icon/icon_loading.svg" />
                    <p>상품을 불러오고 있어요. <br/>잠시만 기다려 주세요.</p>
                </div>
            )}

            {status !== "loading" && <h3 className="second">상품 정보</h3>}

            {status !== "loading" && (
                <div className="product-area">
                    <div className="top-row">
                        <CustomCheckbox disabled={productData?.isSoldout || false} checked={checked} onChange={onToggleCheck}/>
                        <img src="/assets/button/btn_x2.svg" onClick={onRemove}/>
                    </div>

                    {status === "success" && (
                        <OrderProductCard className="order-product-card" productData={productData}/>
                    )}

                    {status === "error" && (
                        <div className="error-area">
                            <div className="error-top-row">
                                <img src="/assets/service/bird_product_request_list.svg" />
                                <div className="text">
                                    <p>{requestedDate} 요청 상품</p>
                                    <span>0원</span>
                                </div>
                            </div>

                            {option.map((option , optionIdx) => (
                                <div className="select-option" key={optionIdx}>
                                    <div className="option-row">
                                        <p className="title">옵션</p>
                                        <div className="input-option-area">
                                            <input placeholder="ex) 블랙/L" value={option.textOption} onChange={(e) => onChangeTextOption(optionIdx, e.target.value)}/>
                                            <p>옵션이 여러 개인 경우엔 원하시는 옵션을 예시처럼 자세히 적어주셔야 정확한 확인이 가능해요</p>
                                        </div>
                                    </div>
                                    <div className="option-row">
                                        <p className="title">수량</p>
                                        <div className="select-quantity">
                                            <button 
                                                className={`select-quantity-button ${option.quantityOption>1 ? 'active' : ''}`}
                                                onClick={()=>{ option.quantityOption > 1 && onChangeQuantity(optionIdx, option.quantityOption-1)}}
                                            >-</button>
                                            <p className="quantity">{option.quantityOption}</p>
                                            <button 
                                                className={`select-quantity-button active`}
                                                onClick={()=>{onChangeQuantity(optionIdx, option.quantityOption+1)}}
                                            >+</button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button onClick={() => onAddOption()}>옵션 추가 +</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}