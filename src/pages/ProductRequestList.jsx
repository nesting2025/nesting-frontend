import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../styles/css/ProductRequestList.css";
import CustomCheckbox from "../components/common/CustomCheckbox";
import OrderProductCard from "../components/goods/OrderProductCard";
import { useToast } from "../components/common/ToastContext";
import CTAButtonOrderPay from "../components/CTAButtonOrderPay";
import { useLoadProxyRequst, usePostProxyRequest } from "../hooks/useProducts";
import PopupDialog from "../components/dialog/PopupDialog";

const ProductRequestList = () => {
    const nav = useNavigate();
    const location = useLocation();
    const { showToast } = useToast();
    const [productDomain, setProductDomain] = useState("");
    const [isOpenLoginDialog, setIsOpenLoginDialog] = useState(false);
    
    const { loadProxyRequst, data: loadProxyRequstData } = useLoadProxyRequst();
    const { postProxyRequest, data: postProxyRequestData } = usePostProxyRequest();

    const [requestedProductList, setRequestedProductList] = useState([]);
    
    // 이전화면에서 상품 불러오기
    useEffect(() => {
        if(location.state) {
            console.log(location.state);
            setRequestedProductList(prev => [
                ...prev, {productData: {...location.state, quantity: 1, options: []}, checked: false, status: "success"}
            ]);
        }
        
    }, [location.state]);

    const getProduct = async () => {
        if(!productDomain) {
            showToast("원하는 상품의 링크(URL)를 입력해 주세요 ");
            return;
        }
        if(!localStorage.getItem("accessToken")) {
            setIsOpenLoginDialog(true);
            return;
        }
        
        const newItem = {
            status: "loading",
            productData: {
                sourceUrl: productDomain,
                options: [],
                productName: null,
                productThumbnail: null,
                productPrice: null,
                originalPrice: null,
                originalPriceCurrency: null,
                quantity: null
            },
            checked: false,
        };
        setRequestedProductList((prev) => [newItem, ...prev]);
        setProductDomain("");

        // 구매대행 상품 불러오기 API 
        setTimeout(async () => {
            try {
                await loadProxyRequst(productDomain);
            } catch(e) {
                setRequestedProductList(prev => 
                    prev.map(item =>
                        item.status === "loading"
                        ? {...item, status: "error", productData: {...item.productData, 
                            options: [ { value: "", quantity: 1 },],
                            productName: `${new Date().toLocaleDateString("ko-KR", {
                                month: "long",
                                day: "numeric",
                                })} 요청 상품`,
                        }, 
                        }
                        : item
                ));
            }
        }, 0);

        // 잘못된 도메인인 경우
        // window.alert("상품을 불러오지 못했어요. 입력하신 링크가 맞는지 확인해 주세요.");
    }

    // 구매대행 요청 API
    const handlePostProxyRequest = async () => {
        const products = requestedProductList
            .filter(item => item.checked)      
            .map(item => item.productData);     

        postProxyRequest({products: products});
    }

    // API 응답
    useEffect(() => {
        if(loadProxyRequstData !== null) {
            setRequestedProductList(prev => 
                prev.map(item =>
                    item.status === "loading" 
                    ? {...item, status: "success", productData: {...item.productData, ...loadProxyRequstData, quantity: 1}}
                    : item
                )
            )
        }
        if(postProxyRequestData !== null) {
            if(postProxyRequestData.code === "SUCCESS") {
                nav("/cart");
            }
        }
    }, [loadProxyRequstData, postProxyRequestData]);

    // 옵션 관련 함수
    const handleChangeQuantity = (productIndex, optionIndex, newQuantity) => {
        setRequestedProductList((prev) =>
            prev.map((item, i) => {
            if (i !== productIndex) return item;
            if (!item.productData) return item;

            return {
                ...item,
                productData: {
                    ...item.productData,
                    options: item.productData.options.map((opt, j) =>
                        j === optionIndex ? { ...opt, quantity: newQuantity } : opt
                    )
                }
            };
            })
        );
    };

    const handleChangeTextOption = (productIndex, optionIndex, newText) => {
        setRequestedProductList(prev =>
            prev.map((item, i) => {
            if (i !== productIndex) return item;
            if (!item.productData) return item;

            return {
                ...item,
                productData: {
                    ...item.productData,
                    options: item.productData.options.map((opt, j) =>
                        j === optionIndex ? { ...opt, value: newText } : opt
                    )
                }
            };
            })
        );
    };

    const handleAddOption = (productIndex) => {
        setRequestedProductList((prev) =>
            prev.map((item, i) =>
                i === productIndex ? 
                {
                    ...item,
                    productData: {
                        ...item.productData,
                        options: [
                            ...(item.productData?.options || []),
                            { value: "", quantity: 1 }
                        ]
                    }
                }
                : item
            )
        );
    }

    const handleRemoveProduct = (productIndex) => {
        setRequestedProductList(prev => 
            prev.filter((_, i) => i !== productIndex)
        );
    };

    const handleToggleChecked = (productIndex) => {
        setRequestedProductList(prev =>
            prev.map((item, i) =>
                i === productIndex ? {...item, checked: !item.checked} : item
            )
        );
    };

    return(
        <div className="product-request-list">
            <PopupDialog open={isOpenLoginDialog} onOpenChange={(newOpen) => setIsOpenLoginDialog(newOpen)} titleText={<>로그인이 필요한 서비스입니다.<br/>로그인 하시겠습니까?</>} />
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

            {requestedProductList.length > 0 && <div className="diver" />}

            {requestedProductList.length > 0 && requestedProductList.map((item, index) => (
                <React.Fragment key={index}>
                    <RequestedProduct
                        productData={item.productData}
                        status={item.status}
                        onChangeQuantity={(optionIdx, newQuantity) => handleChangeQuantity(index, optionIdx, newQuantity)}
                        onChangeTextOption={(optionIdx, value) => handleChangeTextOption(index, optionIdx, value)}
                        onAddOption={() => handleAddOption(index)}
                        onRemove={() => handleRemoveProduct(index)}
                        onToggleCheck={() => handleToggleChecked(index)}
                    />
                    {index !== requestedProductList.length - 1 && <div className="diver" />}
                </React.Fragment>
            ))}
            <CTAButtonOrderPay type="product-request" isEnabled={requestedProductList.some(item => item.checked)} onClickButton={handlePostProxyRequest}/>

        </div>
    )
}

export default ProductRequestList;

const RequestedProduct = ({ productData, status, checked, onChangeQuantity, onChangeTextOption, onAddOption, onRemove, onToggleCheck }) => {
    return (
        <div className="requested-product">
            <h3>입력된 URL</h3>
            <div className="input-area">
                <img src="/assets/icon/icon_link.svg" />
                <input value={productData.sourceUrl} disabled/>
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
                        <CustomCheckbox checked={checked} onChange={onToggleCheck}/>
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
                                    <p>{productData.productName}</p>
                                    <span>0원</span>
                                </div>
                            </div>

                            {productData.options?.map((option , optionIdx) => (
                                <div className="select-option" key={optionIdx}>
                                    <div className="option-row">
                                        <p className="title">옵션</p>
                                        <div className="input-option-area">
                                            <input placeholder="ex) 블랙/L" value={option.value} onChange={(e) => onChangeTextOption(optionIdx, e.target.value)}/>
                                            <p>옵션이 여러 개인 경우엔 원하시는 옵션을 예시처럼 자세히 적어주셔야 정확한 확인이 가능해요</p>
                                        </div>
                                    </div>
                                    <div className="option-row">
                                        <p className="title bottom">수량</p>
                                        <div className="select-quantity">
                                            <button 
                                                className={`select-quantity-button ${option.quantity>1 ? 'active' : ''}`}
                                                onClick={()=>{ option.quantity > 1 && onChangeQuantity(optionIdx, option.quantity-1)}}
                                            >-</button>
                                            <p className="quantity">{option.quantity}</p>
                                            <button 
                                                className={`select-quantity-button active`}
                                                onClick={()=>{onChangeQuantity(optionIdx, option.quantity+1)}}
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