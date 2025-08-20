import { useState, useRef, useEffect, useMemo } from "react";
import CustomCheckbox from '../components/common/CustomCheckbox';
import OrderProductCard from "../components/goods/OrderProductCard";
import CTAButton from "../components/CTAButton";
import CTAButtonOrderPay from "../components/CTAButtonOrderPay";
import ProductSlider from "../components/goods/ProductSlider";
import '../styles/css/Cart.css';
import CustomRadioButton from "../components/common/CustomRadioButton";
import { paymentInfo } from "../text";

const Cart = () => {
    const [orderProducDomesticList, setOrderDomesticProductList] = useState([
        {
          imgSrc: "/assets/sample/dummy_product10.svg",
          title: "상품명1",
          originPrice: 10000,  // 수량 포함된 가격
          discountedPrice: 8000,  // 수량 포함된 가격
          option: [
            { textOption: "선택지 A/선택지 ①", quantityOption: 1 },
          ],
          isSoldout: true,
          isChecked: false,
          deliveryFee: 0,
        },
        {
          imgSrc: "/assets/sample/dummy_product8.svg",
          title: "상품명2",
          originPrice: 8000,
          discountedPrice: 8000,
          quantity: 3,
          option: [
            { textOption: "", quantityOption: 3 },
          ],
          isChecked: false,
          deliveryFee: 0,
        },
         {
          imgSrc: "/assets/sample/dummy_product4.svg",
          title: "상품명3",
          originPrice: 20000,
          discountedPrice: 16000,
          option: [
            { textOption: "", quantityOption: 2 },
          ],
          isChecked: false,
          deliveryFee: 3000,
        },
    ])
    const [orderProductOverseasList, setOrderProductOverseasList] = useState([
        {
          imgSrc: "/assets/sample/dummy_product9.svg",
          title: "상품명입니다아아아아",
          originPrice: 12000,
          discountedPrice: 8000,
          option: [
            { textOption: "선택지 A/선택지 ①", quantityOption: 1 },
          ],
          isChecked: false,
          deliveryFee: 0,
        },
    ])
    const RecommendedProducts = [
        {
        id: 1,
        title: "레옹 짱구와 마틸다 힌둥",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: false,
        imageUrl: "/assets/sample/dummy_product2.svg",
        },
        {
        id: 2,
        title: "짱구2-상품명은무조건한줄처리",
        price: 8000,
        discount: 0,
        isOverseas: false,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product3.svg",
        },
        {
        id: 3,
        title: "짱구2-상품명은무조건한줄처리",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product4.svg",
        },
        {
        id: 4,
        title: "짱구2-상품명은무조건한줄처리",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product5.svg",
        },
        {
        id: 5,
        title: "상품명 최대 1줄 노출 길이 테스트",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product6.svg",
        },
        {
        id: 6,
        title: "상품명 최대 1줄 노출 길이 테스트",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product7.svg",
        },
        {
        id: 7,
        title: "레옹 짱구와 마틸다 힌둥",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: false,
        imageUrl: "/assets/sample/dummy_product2.svg",
        },
        {
        id: 8,
        title: "짱구2-상품명은무조건한줄처리",
        price: 8000,
        discount: 0,
        isOverseas: false,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product3.svg",
        },
        {
        id: 9,
        title: "짱구2-상품명은무조건한줄처리",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product4.svg",
        },
        {
        id: 10,
        title: "짱구2-상품명은무조건한줄처리",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product5.svg",
        },
        {
        id: 11,
        title: "상품명 최대 1줄 노출 길이 테스트",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product6.svg",
        },
        {
        id: 12,
        title: "상품명 최대 1줄 노출 길이 테스트",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product7.svg",
        },
        {
        id: 13,
        title: "레옹 짱구와 마틸다 힌둥",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: false,
        imageUrl: "/assets/sample/dummy_product2.svg",
        },
        {
        id: 14,
        title: "짱구2-상품명은무조건한줄처리",
        price: 8000,
        discount: 0,
        isOverseas: false,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product3.svg",
        },
        {
        id: 15,
        title: "짱구2-상품명은무조건한줄처리",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product4.svg",
        },
        {
        id: 16,
        title: "짱구2-상품명은무조건한줄처리",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product5.svg",
        },
        {
        id: 17,
        title: "상품명 최대 1줄 노출 길이 테스트",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product6.svg",
        },
        {
        id: 18,
        title: "상품명 최대 1줄 노출 길이 테스트",
        price: 8000,
        discount: 0,
        isOverseas: true,
        isSoldOut: false,
        isLiked: true,
        imageUrl: "/assets/sample/dummy_product7.svg",
        },
    ];

    // 구매대행
    const [availableProductList, setAvailableProductList] = useState([
        {
          imgSrc: "/assets/sample/dummy_product3.svg",
          title: "관리자가 입력한 상품명",
          originPrice: 8000,  
          discountedPrice: 8000,  
          option: [
            { textOption: "", quantityOption: 1 },
          ],
          isSoldout: true,
          isChecked: false,
          deliveryFee: 0,
          message: "",
        },
        {
          imgSrc: "/assets/sample/dummy_product4.svg",
          title: "관리자가 입력한 상품명222",
          originPrice: 16000,
          discountedPrice: 16000,
          option: [
            { textOption: "", quantityOption: 3 },
          ],
          isChecked: false,
          deliveryFee: 0,
          message: "",
        },
        {
          imgSrc: "/assets/sample/dummy_product5.svg",
          title: "관리자가 입력한 상품명333",
          originPrice: 20000,
          discountedPrice: 20000,
          option: [
            { textOption: "블랙/L", quantityOption: 3 },
            { textOption: "블랙/L", quantityOption: 3 },
          ],
          isChecked: false,
          deliveryFee: 3000, 
          message: "1월에 발매되는 예약 상품이에요.",
        },
    ])
    const [waitingProductList, setWaitingProductList] = useState([
        {
          imgSrc: "/assets/service/bird_product_request_list.svg",
          title: "7월 11일 요청 상품",
          originPrice: 0,  
          discountedPrice: 0,  
          option: [
            { textOption: "블랙/L", quantityOption: 1 },
          ],
          isSoldout: false,
          isWaiting: true,
          isUnableOrder: true,
          isChecked: false,
          deliveryFee: 0,
          message: "해당 상품은 재고 부족으로 주문이 불가합니다.",
        },
        {
          imgSrc: "/assets/service/bird_product_request_list.svg",
          title: "7월 11일 요청 상품",
          originPrice: 0,
          discountedPrice: 0,
          option: [
            { textOption: "블랙/L", quantityOption: 1 },
            { textOption: "아이보리/L", quantityOption: 1 },
          ],
          isSoldout: false,
          isWaiting: true,
          isUnableOrder: false,
          isChecked: false,
          deliveryFee: 0,
          message: "",
        },
    ])

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
    const secondProductList = activeTab === 0 ? orderProductOverseasList : waitingProductList;

    const [isCheckbox, setIsCheckbox] = useState(false);  // 전체 선택
    const [isOpenBottomSheet, SetIsOpenBottomSheet] = useState(false);

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
        orderProducDomesticList.filter(item => item.isChecked), [orderProducDomesticList]);
    const checkedOverseasProducts = useMemo(()=>
        orderProductOverseasList.filter(item => item.isChecked), [orderProductOverseasList]);
    const checkedAllProducts = useMemo(()=>
        [...checkedDomesticProducts, ...checkedOverseasProducts], [checkedDomesticProducts, checkedOverseasProducts]);

    // 선택된 상품 가격 (네스팅 상품)
    const priceSummary = useMemo(() => {
        const summary = checkedAllProducts.reduce(
            (acc, product) => {
                acc.totalOriginPrice += product.originPrice;
                acc.totalDiscountedPrice += product.discountedPrice;
                acc.totalDeliveryFee += product.deliveryFee;            
                return acc;
            },
            {
                totalOriginPrice: 0,
                totalDiscountedPrice: 0,
                totalDeliveryFee: 0
            }
        );
        const result = {
            ...summary,
            totalDiscount: summary.totalOriginPrice - summary.totalDiscountedPrice,
            totalPrice: summary.totalDiscountedPrice + summary.totalDeliveryFee
        };
        return result;
    }, [checkedAllProducts]);

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
                setWaitingProductList(prev =>
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
        const productPrice = checkedProducts.reduce((sum, item) => sum += item.originPrice, 0)

        // 대행 수수료 계산
        const serviceFee = checkedProducts.reduce((sum, item) => {
            let fee;
            if (item.originPrice >= 100000) {
                fee = item.originPrice * 0.05;  // 10만원 이상이면 5% 부과
            } else {
                fee = 3000;  // 그 외는 링크당 3000원
            }
            return sum + fee;
        }, 0);

        // 해외+국내 배송비
        const deliveryFees = checkedProducts.map(item => item.deliveryFee || 0);
        const shippingFee = deliveryFees.length > 1
            ? (deliveryFees.reduce((sum, fee) => sum + fee, 0) / deliveryFees.length) * 1.2
            : deliveryFees[0] || 0;

        // 합배송비
        const combinedShippingFee = checkedProducts.reduce((sum, item) => {
            const optionFee = item.option.length > 1 ? (item.option.length - 1) * 500 : 0; // 옵션 개수별
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
                                                onClickBottomButton={() => SetIsOpenBottomSheet(prev => !prev)}
                                            />
                                            {index < firstProductList.length - 1 && <div className="diver2"/>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {}

                        {secondProductList.length > 0 && (
                            <div className={`delivery-area bottom ${orderProducDomesticList.length===0 ? 'empty-top' : ''}`}>
                                <div className="header">{activeTab === 0 ? <>해외 배송</> : <>관리자의 확인을 기다리고 있어요<br/><span className="caution">평균 30분 이내에 확인하고 있어요</span></>}</div>
                                <div className="content-area">
                                    {secondProductList.map((item, index) => (
                                        <div key={index} >
                                            <OrderCartProductCard
                                                productData={{...item, isOverseas: true}}
                                                onCheckChange={() =>{ activeTab === 0 && toggleProductCheck("overseas", index)}}
                                                onRemove={() => { activeTab === 0 ? handleRemvoeProduct("overseas", index) : handleRemvoeProduct("waiting", index)}}
                                                activeTab = {activeTab}
                                                onClickBottomButton={() => SetIsOpenBottomSheet(prev => !prev)}
                                            />
                                            {index < secondProductList.length - 1 && <div className="diver2"/>}
                                        </div>
                                    ))}
                                </div>
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
                                <span className="order-price-content">{priceSummary.totalOriginPrice.toLocaleString()}원</span>
                            </div>
                            <div className="order-price-row">
                                <span className="order-price-title">할인 금액</span>
                                <span className="order-price-content red">-{priceSummary.totalDiscount.toLocaleString()}원</span>
                            </div>
                            <div className="order-price-row">
                                <span className="order-price-title">배송비</span>
                                <span className="order-price-content">{priceSummary.totalDeliveryFee === 0 ? "무료배송": `${priceSummary.totalDeliveryFee.toLocaleString()}원`}</span>
                            </div>
                            <div className="price-total">
                                <span className="price-total-title">총 결제 금액</span>
                                <span className="price-total-content">{priceSummary.totalPrice.toLocaleString()}원</span>
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
            {activeTab === 0 && (
                <>
                <div className="diver" />
                <ProductSlider 
                    productList={RecommendedProducts}
                    title1="내가 찜한"
                    title2="상품" />

                
                </>
            )}

            {/* 최근 본 상품 */}
            {activeTab === 0 && (
                <>
                <div className="diver" />
                <ProductSlider 
                    productList={RecommendedProducts}
                    title1="최근 본"
                    title2="상품"
                    className="bottom" />
                </> 
            )}
            
            <CTAButtonOrderPay
                totalPrice={activeTab === 0 ? priceSummary.totalPrice : estimates.finalPaymentAmount.price}
                productNum={activeTab === 0 ? checkedAllProducts.length : availableProductList.filter(item => item.isChecked).length}
                isEnabled={activeTab === 0 ? checkedAllProducts.length > 0 : availableProductList.filter(item => item.isChecked).length > 0} />

            {isOpenBottomSheet && 
                <CTAButton
                    isSoldout={false}
                    isOpenBottomSheet={true} 
                    onCloseBottomSheet={()=>SetIsOpenBottomSheet(false)}
            />}
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
                        disabled={productData.isWaiting ? productData.isWaiting : productData.isSoldout}
                    />
                    <img src="/assets/button/btn_x2.svg" onClick={onRemove} />
                </div>
                <OrderProductCard productData={productData} />
                {activeTab === 0 && (
                    <div className="button-row">
                        <button className={`${productData.isSoldout || productData.isOverseas ? "soldout" : ""}`}
                        disabled={productData.isSoldout || productData.isOverseas}
                        onClick={onClickBottomButton}>
                            옵션 변경
                        </button>
                        <button className={`${productData.isSoldout ? "soldout" : ""}`}
                        disabled={productData.isSoldout}>
                            바로 구매하기
                        </button>
                    </div>
                )}
                {activeTab === 0 && (
                    <p className="total-price-area">
                        {productData.isSoldout ? (
                            "품절되었어요"
                        ): productData.deliveryFee === 0 ? (
                            <>
                            {productData.discountedPrice.toLocaleString()}원 + <span>&nbsp;무료배송&nbsp;</span> = {productData.discountedPrice.toLocaleString()}원
                            </>
                        ): (
                            <>
                            {productData.discountedPrice.toLocaleString()}원 + 배송비 {productData.deliveryFee.toLocaleString()}원 = {(productData.discountedPrice + productData.deliveryFee).toLocaleString()}원
                            </>
                        )}
                    </p>
                )}
                {productData.message && (
                    <div className="message-area">
                        관리자 메시지) <br/>{productData.message}
                    </div>
                )}
            </div>
        )
    }