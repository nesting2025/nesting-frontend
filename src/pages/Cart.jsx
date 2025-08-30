import { useState, useRef, useEffect, useMemo } from "react";
import CustomCheckbox from '../components/common/CustomCheckbox';
import OrderProductCard from "../components/goods/OrderProductCard";
import CTAButton from "../components/CTAButton";
import CTAButtonOrderPay from "../components/CTAButtonOrderPay";
import ProductSlider from "../components/goods/ProductSlider";
import '../styles/css/Cart.css';
import CustomRadioButton from "../components/common/CustomRadioButton";
import { paymentInfo } from "../text";
import { useGetProductDetail, useGetProductLikeList, useGetProductRecentViewList } from "../hooks/useProducts";
import { useGetCart } from "../hooks/useCart";

const Cart = () => {
    const accessToken = localStorage.getItem("accessToken");

    const { data: getProductLikeListData } = useGetProductLikeList({
        page: "0", size: "18", includeSoldOut: "true"}, !!accessToken
    );
    const { data: getProductRecentViewListData } = useGetProductRecentViewList({
        page: "0", size: "18", includeSoldOut: "true"}, !!accessToken
    );
    const { getCart, data: getCartData } = useGetCart();
    const { getProductDetail, data: getProductDetailData } = useGetProductDetail();

    // 네스팅 상품
    const [orderProducDomesticList, setOrderDomesticProductList] = useState([]);
    const [orderProductOverseasList, setOrderProductOverseasList] = useState([]);
    // 구매대행
    const [availableProductList, setAvailableProductList] = useState([]);
    const [pendingProductList, setPendingProductList] = useState([]);

    const [estimates, setEstimates] = useState({
        productPrice: {label: "상품 금액", price: 0},
        serviceFee: {label: "대행 수수료", price: 0},
        shippingFee: {label: "해외+국내 배송비", price: 0},
        combinedShippingFee: {label: "합배송비", price: 0},
        totalAmount: {label: "총 금액", price: 0},
        paymentFee: {label: "+결제 수수료(3.4%)", price: 0},
        extraPackagingFee: {label: "+[선택] 추가 포장 비용", price: 0},
        insuranceFee: {label: "+[선택] 해외 배송 보상 보험료", price: 0},
        finalPaymentAmount:{label: "최종 결제 금액", price: 0},}
    )

    const tabList = [`네스팅 상품 (${orderProducDomesticList.length + orderProductOverseasList.length})`, `구매대행 (${availableProductList.length})`];
    const tabRef = useRef(null);
    const [activeTab, setActiveTab] = useState(0);

    const firstProductList = activeTab === 0 ? orderProducDomesticList : availableProductList;
    const secondProductList = activeTab === 0 ? orderProductOverseasList : pendingProductList;

    const [isCheckbox, setIsCheckbox] = useState(false);  // 전체 선택
    const [isOpenBottomSheet, SetIsOpenBottomSheet] = useState(false);
    const [productDetail, setProductDetail] = useState({
        optionGroups: null,
        stock: 0,
        basePrice: 0,
        selectedOptions: null
    })

    const [extraOption, setExtraOption] = useState([
        {
            title: "추가 포장 비용",
            smallInfo: "*선택하지 않을 시, 일본 판매자가 보낸 패키지 그대로 발송됩니다.",
            checkText1: {
                label: "추가 포장 비용", price: 2000, name: "extraPrice", checked: false,
            },
            checkText2: {
                label: "필요 없어요", price: 0, name: "extraPrice", checked: false,
            }

        },
        {
            title: "해외 배송 보상 보험료",
            smallInfo: "*본 서비스는 대행 상품입니다. 보험 미가입 시 파손 및 분실에 대해 책임을 지기 어렵습니다.",
            checkText1: {
                label: "해외 배송 보상 보험료", price: 500, name: "insuarance", checked: false,
            },
            checkText2: {
                label: "필요 없어요", price: 0, name: "insuarance", checked: false,
            }

        },
    ])

    // 장바구니 조회 API
    useEffect(() => {
        try {
            if(accessToken) getCart();
        } catch (e) {console.log(e);}
    }, [])

    // API 응답
    useEffect(() => {
        if(getCartData !== null) {
            console.log(getCartData);

            setOrderDomesticProductList(
                getCartData.nestingCartItems.domesticItems.map(item => ({
                    ...item,
                    isChecked: false,
                }))
            );

            setOrderProductOverseasList(
                getCartData.nestingCartItems.internationalItems.map(item => ({
                    ...item,
                    isChecked: false,
                }))
            );

            setAvailableProductList(
                getCartData.buyAgentCartItems.approvedItems.map(item => ({
                    ...item,
                    isChecked: false,
                }))
            );

            setPendingProductList(
                getCartData.buyAgentCartItems.pendingItems.map(item => ({
                    ...item,
                    isChecked: false,
                }))
            );

        }
    }, [getCartData])

    // 상품 선택하기
    const toggleProductCheck = (listyType, index) => {
        const updater = (prev) => 
            prev.map((item, i) => {
                if(i===index && !item.isSoldOut) {
                    return { ...item, isChecked: !item.isChecked };
                }
                return item;
        });

        switch(listyType) {
            case "domestic" : 
                setOrderDomesticProductList(updater);
                break;
            case "overseas" :
                setOrderProductOverseasList(updater);
                break;
            case "available":
                setAvailableProductList(updater);
                break;
            default:
                break;
        }
    }

    const handleRadioChange = (optionIndex, checked) => {
        setExtraOption(prev => 
            prev.map((option, idx) => {
                if(idx === optionIndex) {
                    return {
                        ...option, 
                        checkText1: {...option.checkText1, checked: checked === "checkText1"},
                        checkText2: { ...option.checkText2, checked: checked === "checkText2" }
                    };
                }
                return option;
            })
        )
    }

    // 전체 선택 체크박스
    const toggleAllCheck = (checked) => {
        if(activeTab === 0) {
            setOrderDomesticProductList(prev=>
                prev.map(item=> 
                    item.isSoldout ? item : {...item, isChecked: checked}
                )
            );
            setOrderProductOverseasList(prev=>
                prev.map(item=> 
                    item.isSoldout ? item : {...item, isChecked: checked}
                )
            );
        }
        else {
            setAvailableProductList(prev=>
                prev.map(item=> 
                    item.isSoldout ? item : {...item, isChecked: checked}
                )
            );
        }
        setIsCheckbox(checked)
    }

    // 전체 선택 체크박스 업데이트
    useEffect(()=> {
        const allChecked = activeTab === 0 ? 
        [...orderProducDomesticList, ...orderProductOverseasList] 
        .filter(item => !item.isSoldout)
        .every(item => item.isChecked)
        : availableProductList.length > 0 &&
        [...availableProductList]
        .filter(item => !item.isSoldout)
        .every(item => item.isChecked);

        setIsCheckbox(allChecked);
    }, [orderProducDomesticList, orderProductOverseasList, availableProductList, activeTab])

    // 선택된 상품 가져오기 (네스팅 상품)
    const checkedDomesticProducts = useMemo(()=>
        orderProducDomesticList?.filter(item => item.isChecked), [orderProducDomesticList]);
    const checkedOverseasProducts = useMemo(()=>
        orderProductOverseasList?.filter(item => item.isChecked), [orderProductOverseasList]);
    const checkedAllProducts = useMemo(()=>
        [...checkedDomesticProducts, ...checkedOverseasProducts], [checkedDomesticProducts, checkedOverseasProducts]);

    // 네스팅 국내배송 배송비
    const { domesticTotal, domesticShippingFee } = useMemo(() => {
        const domesticTotal = checkedDomesticProducts
            ?.reduce((sum, item) => sum + (item.totalDiscountedPrice ?? item.totalPrice ?? 0), 0);

        const domesticShippingFee = 
            domesticTotal === 0 ? 0 : domesticTotal > 50000 ? 0 : 2900;

        return { domesticTotal, domesticShippingFee };
        
    }, [checkedDomesticProducts]);

    // 네스팅 해외배송 배송비
    const { overseasCombinedShippingFee, overseasSavingRate } = useMemo(() => {
        // 배송비 0원이 아닌 상품만 필터링
        const overseasFee = checkedOverseasProducts?.filter(
            item => (item.deliveryFee ?? 0) > 0
        ) ?? [];

        if(overseasFee.length >=2) {
            const totalFee = overseasFee.reduce(
                (sum, item) => sum + (item.deliveryFee ?? 0), 0
            );

            const aveFee = totalFee / overseasFee.length;
            const combinedFee = Math.round(aveFee * 1.2);
            const savingRate = Math.round((1 - combinedFee / totalFee) * 100);

            return {
                overseasCombinedShippingFee: combinedFee,
                overseasSavingRate: savingRate,
            };
        } 

        return {
            overseasCombinedShippingFee: overseasFee[0]?.deliveryFee ?? 0,
            overseasSavingRate: null,
        };
    }, [checkedOverseasProducts]);
    

    // 선택된 상품 가격 (네스팅 상품)
    const nestingPriceSummary = useMemo(() => {
        const summary = checkedAllProducts.reduce(
            (acc, product) => {
                acc.totalOriginPrice += product.totalPrice ?? 0;
                acc.totalDiscountedPrice += product.totalDiscountedPrice === null ? product.totalPrice : product.totalDiscountedPrice;
                return acc;
            },
            {
                totalOriginPrice: 0,
                totalDiscountedPrice: 0,
            }
        );
        const totalDeliveryFee = domesticShippingFee + overseasCombinedShippingFee;

        const result = {
            ...summary,
            totalDeliveryFee,
            totalDiscount: summary.totalOriginPrice - summary.totalDiscountedPrice,
            totalPrice: (summary.totalDiscountedPrice ?? 0) + (summary.totalDeliveryFee ?? 0)
        };
        return result;
    }, [checkedAllProducts, domesticShippingFee, overseasCombinedShippingFee]);

    // 선택 상품 삭제
    const handleRemoveSelectedProducts = () => {
        if(activeTab === 0) {
            setOrderDomesticProductList(prev=>
                prev.filter(item => !item.isChecked)
            );

            setOrderProductOverseasList(prev=>
                prev.filter(item => !item.isChecked)
            );
        }
        else {
            setAvailableProductList(prev=>
                prev.filter(item => !item.isChecked)
            );
        }
    }

    // 개별 상품 삭제
    const handleRemvoeProduct = (listyType, index) => {

        switch(listyType) {
            case "domestic" : 
                setOrderDomesticProductList(prev =>
                    prev.filter((_, i) => i !== index));
                break;
            case "overseas" :
                setOrderProductOverseasList(prev =>
                    prev.filter((_, i) => i !== index));
                break;
            case "available":
                setAvailableProductList(prev =>
                    prev.filter((_, i) => i !== index));
                break;
            case "waiting":
                setPendingProductList(prev =>
                    prev.filter((_, i) => i !== index));
                break;
            default:
                break;
        }
    }

    // 구매대행 견적서
    useEffect(() => {
        const checkedProducts = availableProductList.filter(item => item.isChecked);

        // 상품 금액
        const productPrice = checkedProducts.reduce((sum, item) => sum += item.totalPrice, 0)

        // 대행 수수료 계산
        const serviceFee = checkedProducts.reduce((sum, item) => {
            let fee;
            if (item.totalPrice >= 100000) {
                fee = item.totalPrice * 0.05;  // 10만원 이상이면 5% 부과
            } else {
                fee = 3000;  // 그 외는 링크당 3000원
            }
            return sum + fee;
        }, 0);

        // 해외+국내 배송비
        const deliveryFees = checkedProducts
            .map(item => item.deliveryFee || 0)
            .filter(fee => fee > 0);
        const shippingFee = deliveryFees.length > 1
            ? (deliveryFees.reduce((sum, fee) => sum + fee, 0) / deliveryFees.length) * 1.2
            : deliveryFees[0] || 0;

        // 합배송비
        const combinedShippingFee = checkedProducts.reduce((sum, item) => {
            const optionFee = item.options.length > 1 ? (item.options.length - 1) * 500 : 0; // 옵션 개수별
            return sum + optionFee;
        }, 0);
        const productCountFee = checkedProducts.length > 1 ? (checkedProducts.length - 1) * 500 : 0;
        const totalCombinedShippingFee = combinedShippingFee + productCountFee;

        // 총 금액
        const totalAmount = productPrice + serviceFee + shippingFee + totalCombinedShippingFee;

        // 결제 수수료
        const paymentFee = Math.ceil((totalAmount * 0.034) / 100) * 100;

        // 추가 포장 비용, 해외 배송 보상 보험료
        const extraPackagingPrice = extraOption[0].checkText1.checked ? extraOption[0].checkText1.price : extraOption[0].checkText2.price;
        const insurancePrice = extraOption[1].checkText1.checked ? extraOption[1].checkText1.price : extraOption[1].checkText2.price;

        // 최종 결제 금액
        const finalPaymentAmount = totalAmount + paymentFee + extraPackagingPrice + insurancePrice;

        setEstimates(prev => ({
            ...prev,
            productPrice: { ...prev.productPrice, price: productPrice },
            serviceFee: { ...prev.serviceFee, price: serviceFee },
            shippingFee: { ...prev.shippingFee, price: shippingFee },
            combinedShippingFee: { ...prev.combinedShippingFee, price: totalCombinedShippingFee },
            totalAmount: { ...prev.totalAmount, price: totalAmount },
            paymentFee: { ...prev.paymentFee, price: paymentFee },
            extraPackagingFee: { ...prev.extraPackagingFee, price: extraPackagingPrice },
            insuranceFee: { ...prev.insuranceFee, price: insurancePrice },
            finalPaymentAmount: { ...prev.finalPaymentAmount, price: finalPaymentAmount },
        }));

    }, [availableProductList, extraOption])

    // 옵션 변경
    // 상품 상세의 optionGroups를 넘겨줌
    const handleChangeOption = async (productId, options, quantity) => {
        if(!options || options.length === 0) {
            setProductDetail(prev => ({
                ...prev,
                selectedOptions: [{name: '', value: '', quantity: quantity, priceDelta: 0}]
            }));
        } else {
            setProductDetail(prev => ({
                ...prev,
                selectedOptions: options
            }));
        }

        try {
            getProductDetail(productId);
        } catch(e) { console.log(e); }
    
    }

    useEffect(() => {
        if(getProductDetailData !== null) {
            setProductDetail(prev => ({
                ...prev,
                optionGroups: getProductDetailData.optionGroups,
                stock: getProductDetailData.stock,
                basePrice: getProductDetailData.discountedPrice ?? getProductDetailData.price,
            }));
            SetIsOpenBottomSheet(prev => !prev);
        }
    }, [getProductDetailData]);

    return (
        <div className="cart-area">
            <div className="header">
                <img src="/assets/button/btn_back2.svg" />
                <p>장바구니</p>
            </div>

            {/* 탭영역 */}
            <div 
                ref={tabRef}
                className="tab-wrapper">
                {tabList.map((tab, index) => (
                    <button
                    key={index}
                    className={`tab ${activeTab===index ? 'active': ''}`}
                    onClick={()=> {
                        toggleAllCheck(false)
                        setActiveTab(index)
                    }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {firstProductList.length === 0 && secondProductList.length === 0 ? (
                <div className={`no-product-area ${activeTab === 1 && "second"}`}>
                    <p className="no-product-content1">장바구니에 담긴 상품이 없어요</p>
                    <p className="no-product-content2">원하는 상품을 담아보세요</p>
                    <img src={activeTab === 0 ? "/assets/icon/ic_cart.svg" :  "/assets/service/ic_bird_cart_no_product.svg"} />
                    <button>{activeTab === 0 ? "홈에서 추천상품 보기" : "네스팅 구매대행 이용하기"}</button>
                </div>
            ): (
                <div className="show-product-area">
                    <div className="select-product-area">
                        <CustomCheckbox
                            label="전체 선택"
                            checked={isCheckbox}
                            onChange={(e)=>{toggleAllCheck(e.target.checked)}}
                        />
                        <p onClick={handleRemoveSelectedProducts}>선택 상품 삭제</p>
                    </div>

                    {/* 국내/해외 배송 상품 영역 */}
                    <div className="show-product">

                        {firstProductList.length > 0 && (
                            <div className="delivery-area">
                                <div className="header">{activeTab === 0 ? <>국내 배송</> : <>지금 바로 주문 가능해요<br/><span>구매 가능 시간 06:00</span></>}</div>
                                <div className="content-area">
                                    
                                    {firstProductList.map((item, index) => (
                                        <div key={index} >
                                            <OrderCartProductCard
                                                productData={item}
                                                onCheckChange={() =>{ activeTab === 0 ? toggleProductCheck("domestic", index) :  toggleProductCheck("available", index)}}
                                                onRemove={() => { activeTab === 0 ? handleRemvoeProduct("domestic", index) : handleRemvoeProduct("available", index)}}
                                                activeTab = {activeTab}
                                                onClickBottomButton={() => handleChangeOption(item.productId, item.options, item.quantity)}
                                            />
                                            {index < firstProductList.length - 1 && <div className="diver2"/>}
                                        </div>
                                    ))}
                                </div>
                                {activeTab === 0 && checkedDomesticProducts.length > 0 && (
                                    <div className="delivery-footer">
                                        <p>배송비 {domesticShippingFee === 0 ? "무료" : `${domesticShippingFee.toLocaleString()}원`}</p>
                                        {domesticShippingFee !== 0 && <span>{(50000-domesticTotal).toLocaleString()}원만 더 담으면 무료배송</span>}
                                    </div>
                                )}
                            </div>
                        )}

                        {secondProductList.length > 0 && (
                            <div className={`delivery-area bottom ${orderProducDomesticList.length===0 ? 'empty-top' : ''}`}>
                                <div className="header">{activeTab === 0 ? <>해외 배송</> : <>관리자의 확인을 기다리고 있어요<br/><span className="caution">평균 30분 이내에 확인하고 있어요</span></>}</div>
                                <div className="content-area">
                                    {secondProductList.map((item, index) => (
                                        <div key={index} >
                                            <OrderCartProductCard
                                                productData={{...item}}
                                                onCheckChange={() =>{ activeTab === 0 && toggleProductCheck("overseas", index)}}
                                                onRemove={() => { activeTab === 0 ? handleRemvoeProduct("overseas", index) : handleRemvoeProduct("waiting", index)}}
                                                activeTab = {activeTab}
                                                onClickBottomButton={() => SetIsOpenBottomSheet(prev => !prev)}
                                            />
                                            {index < secondProductList.length - 1 && <div className="diver2"/>}
                                        </div>
                                    ))}
                                </div>
                                {activeTab === 0 && checkedOverseasProducts.length > 0 && (
                                    <div className="delivery-footer">
                                        <p>{checkedOverseasProducts.length}건 총 배송비 {overseasCombinedShippingFee.toLocaleString()}원</p>
                                        {overseasSavingRate !== null && <span>배송비 {overseasSavingRate}% 절약</span>}
                                    </div>
                                )}
                            </div>
                        )} 
                        {activeTab === 0 ? (
                            <div className="cart-info-row">
                                <img src="/assets/icon/ic_cart_info.svg" />
                                <p>판매 종료된 상품은 장바구니에서 자동 삭제됩니다.</p>
                            </div>
                        ) : (
                            <button className="add-more-product">
                                <img src="/assets/icon/icon_add.svg" />
                                <p>상품 추가하고 배송비 절약하기</p>
                            </button>
                        )}
                        
                    </div>

                    {/* 결제금액 영역 */}
                    {activeTab === 0 && (
                        <section className="order-section">
                            <div className="order-section-title">결제 금액</div>
                            <div className="order-price-row">
                                <span className="order-price-title">상품 금액</span>
                                <span className="order-price-content">{nestingPriceSummary.totalOriginPrice.toLocaleString()}원</span>
                            </div>
                            <div className="order-price-row">
                                <span className="order-price-title">할인 금액</span>
                                <span className="order-price-content red">-{nestingPriceSummary.totalDiscount === 0 ? "" : `${nestingPriceSummary.totalDiscount.toLocaleString()}원`}</span>
                            </div>
                            <div className="order-price-row">
                                <span className="order-price-title">배송비</span>
                                <span className="order-price-content">{nestingPriceSummary.totalDeliveryFee.toLocaleString()}원</span>
                            </div>
                            {checkedDomesticProducts.length > 0 && (
                                <div className="order-price-row small">
                                    <span className="order-price-title small">- 국내 배송비</span>
                                    <span className="order-price-content small">{domesticShippingFee === 0 ? "무료배송" : `${domesticShippingFee.toLocaleString()}원`}</span>
                                </div>
                            )}
                            {checkedOverseasProducts.length > 0 && (
                                <div className="order-price-row small">
                                    <span className="order-price-title small">- 해외 배송비</span>
                                    {overseasSavingRate && <span className="saving-rate">배송비를 {overseasSavingRate}% 절약했어요!</span>}
                                    <span className="order-price-content small">{overseasCombinedShippingFee === 0 ? "무료베송" : `${overseasCombinedShippingFee.toLocaleString()}원`}</span>
                                </div>
                            )}
                            <div className="price-total">
                                <span className="price-total-title">총 결제 금액</span>
                                <span className="price-total-content">{nestingPriceSummary.totalPrice.toLocaleString()}원</span>
                            </div>
                        </section>
                    )}

                    {activeTab === 1 && (
                        <>
                        {/* 추가 포장 비용, 해외 배송 보상 보험료 */}
                        {extraOption.map((option, index) => (
                            <div key={index}>
                                <div className="extra-option-area">
                                    <div className="top-row">
                                        <h5>{option.title}</h5>
                                        <div className="mandatory">필수</div>
                                    </div>
                                    <p className="info-small">{option.smallInfo}</p>
                                    <div className="check-row">
                                        <CustomRadioButton className="custom-radio" label={option.checkText1.label} name={option.checkText1.name} 
                                        checked={option.checkText1.checked} onChange={() => handleRadioChange(index, "checkText1")} />
                                        <p>+{option.checkText1.price.toLocaleString()}원</p>
                                    </div>
                                    <div className="check-row bottom">
                                        <CustomRadioButton className="custom-radio" label={option.checkText2.label} name={option.checkText2.name} 
                                        checked={option.checkText2.checked} onChange={() => handleRadioChange(index, "checkText2")} />
                                        <p>+{option.checkText2.price.toLocaleString()}원</p>
                                    </div>
                                </div>
                                <div className="diver" />
                            </div>
                        ))}

                        {/* 견적서 */}
                        <div className="estimates-area">
                            <h3>견적서</h3>

                            <div className="estimate-row-area">
                            {Object.values(estimates).slice(0,4).map((item, index) => (
                                <div className="estimate-row" key={index}>
                                    <span className="label">{item.label}</span>
                                    <span className="price">{item.price.toLocaleString()}원</span>
                                </div>
                            ))}
                            </div>
                            <div className="diver2 small-gap" />

                            <div className="estimate-row">
                                <span className="label total">{estimates.totalAmount.label}</span>
                                <span className="price total">{estimates.totalAmount.price.toLocaleString()}원</span>
                            </div>

                            <div className="estimate-row-area with-margin">
                            {Object.values(estimates).slice(5,8).map((item, index) => (
                                <div className="estimate-row" key={index}>
                                    <span className="label">{item.label}</span>
                                    <span className="price">{item.price.toLocaleString()}원</span>
                                </div>
                            ))}
                            </div>

                            <div className="estimate-row final">
                                <span className="label final">{estimates.finalPaymentAmount.label}</span>
                                <span className="price final">{estimates.finalPaymentAmount.price.toLocaleString()}원</span>
                            </div>

                            <div className="info-payment-area">
                                <h5>&lt;안내 사항&gt;</h5>
                                <p>{paymentInfo}</p>
                            </div>
                        </div>
                        </>
                    )}
                </div>
            )}

            {/* 내가 찜한 상품 */}
            {activeTab === 0 && getProductLikeListData?.content.length > 0 && (
                <>
                <div className="diver" />
                <ProductSlider 
                    productList={getProductLikeListData?.content}
                    title1="내가 찜한"
                    title2="상품" />

                
                </>
            )}

            {/* 최근 본 상품 */}
            {activeTab === 0 && getProductRecentViewListData?.content.length > 0 && (
                <>
                <div className="diver" />
                <ProductSlider 
                    productList={getProductRecentViewListData?.content}
                    title1="최근 본"
                    title2="상품"
                    className="bottom" />
                </> 
            )}
            
            <CTAButtonOrderPay
                totalPrice={activeTab === 0 ? nestingPriceSummary.totalPrice : estimates.finalPaymentAmount.price}
                productNum={activeTab === 0 ? checkedAllProducts.length : availableProductList.filter(item => item.isChecked).length}
                isEnabled={activeTab === 0 ? checkedAllProducts.length > 0 : availableProductList.filter(item => item.isChecked).length > 0} />

            {isOpenBottomSheet && 
                <CTAButton
                    isSoldout={false}
                    isOpenBottomSheet={true}
                    onCloseBottomSheet={()=>SetIsOpenBottomSheet(false)}
                    optionGroups={productDetail.optionGroups}
                    stock={productDetail.stock}
                    basePrice={productDetail.basePrice}
                    isModify={true}
                    selectedOptions={productDetail.selectedOptions}
                />
            }
        </div>
    )
}

export default Cart;

const OrderCartProductCard = ( {productData, onCheckChange, onRemove, activeTab, onClickBottomButton} ) => {
        return(
            <div className="order-cart-product">
                <div className="select-product-row">
                    <CustomCheckbox 
                        label=""
                        checked={productData.isChecked}
                        onChange={onCheckChange}
                        disabled={productData.status === "PENDING" ? productData.status === "PENDING" : productData.soldOut}
                    />
                    <img src="/assets/button/btn_x2.svg" onClick={onRemove} />
                </div>
                <OrderProductCard productData={productData} />
                {activeTab === 0 && (
                    <div className="button-row">
                        <button className={`${productData.soldOut || productData.deliveryType === "INTERNATIONAL" ? "soldout" : ""}`}
                        disabled={productData.soldOut || productData.deliveryType === "INTERNATIONAL"}
                        onClick={onClickBottomButton}>
                            옵션 변경
                        </button>
                        <button className={`${productData.soldOut ? "soldout" : ""}`}
                        disabled={productData.soldOut}>
                            바로 구매하기
                        </button>
                    </div>
                )}
                {activeTab === 0 && productData.deliveryType === "INTERNATIONAL" && (
                    <p className="total-price-area">
                        배송비 {productData.deliveryFee?.toLocaleString()}원
                    </p>
                )}
                {productData.extraMemo && (
                    <div className="message-area">
                        관리자 메시지) <br/>{productData.extraMemo}
                    </div>
                )}
            </div>
        )
    }