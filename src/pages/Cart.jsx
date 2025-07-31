import { useState, useRef, useEffect, useMemo } from "react";
import CustomCheckbox from '../components/common/CustomCheckbox';
import OrderProductCard from "../components/goods/OrderProductCard";
import ProductCardPrev from "../components/goods/ProductCardPrev";
import CTAButton from "../components/CTAButton";
import CTAButtonOrderPay from "../components/CTAButtonOrderPay";
import '../styles/css/Cart.css';

const Cart = () => {
    const [orderProductList, setOrderProductList] = useState([
        {
          imgSrc: "/assets/sample/dummy_product10.svg",
          title: "상품명1",
          originPrice: 10000,  // 수량 포함된 가격
          discountedPrice: 8000,  // 수량 포함된 가격
          quantity: 1,
          option: "선택지 A/선택지 ①",
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
          option: "",
          isChecked: false,
          deliveryFee: 0,
        },
         {
          imgSrc: "/assets/sample/dummy_product4.svg",
          title: "상품명3",
          originPrice: 20000,
          discountedPrice: 16000,
          quantity: 3,
          option: "",
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
          quantity: 1,
          option: "선택지 A/선택지 ①",
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

    const tabList = [`네스팅 상품 (${orderProductList.length + orderProductOverseasList.length})`, `구매대행 (0)`];
    const tabRef = useRef(null);
    const [activeTab, setActiveTab] = useState(0);

    const [isCheckbox, setIsCheckbox] = useState(false);  // 전체 선택

    const OrderCartProductCard = ( {productData, onCheckChange, onRemove} ) => {
        return(
            <div className="order-cart-product">
                <div className="select-product-row">
                    <CustomCheckbox 
                        label=""
                        checked={productData.isChecked}
                        onChange={onCheckChange}
                        disabled={productData.isSoldOut}
                        
                    />
                    <img src="/assets/button/btn_x2.svg" onClick={onRemove} />
                </div>
                <OrderProductCard productData={productData} />
                <div className="button-row">
                    <button>옵션 변경</button>
                    <button>바로 구매하기</button>
                </div>
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
            </div>
        )
    }

    // 상품 선택하기
    const toggleDomesitcCheck = (index) => {
        setOrderProductList(prev =>
            prev.map((item, i) => {
                if(i===index && !item.isSoldout) {
                    return {...item, isChecked: !item.isChecked};
                }
                return item;
            })
        );
    }
    const toggleOverseasCheck = (index) => {
        setOrderProductOverseasList(prev =>
            prev.map((item, i) => {
                if(i===index && !item.isSoldout) {
                    return {...item, isChecked: !item.isChecked};
                }
                return item;
            })
        )
    }

    // 전체 선택 체크박스
    const toggleAllCheck = (checked) => {
        setOrderProductList(prev=>
            prev.map(item=> 
                item.isSoldout ? item : {...item, isChecked: checked}
            )
        )
        setOrderProductOverseasList(prev=>
            prev.map(item=> 
                item.isSoldout ? item : {...item, isChecked: checked}
            )
        )

        setIsCheckbox(checked)
    }

    // 전체 선택 체크박스 업데이트
    useEffect(()=> {
        const allChecked = [...orderProductList, ...orderProductOverseasList]
        .filter(item => !item.isSoldout)
        .every(item => item.isChecked);
        setIsCheckbox(allChecked);
    }, [orderProductList, orderProductOverseasList])

    // 선택된 상품 가져오기
    const checkedDomesticProducts = useMemo(()=>
        orderProductList.filter(item => item.isChecked), [orderProductList]);
    const checkedOverseasProducts = useMemo(()=>
        orderProductOverseasList.filter(item => item.isChecked), [orderProductOverseasList]);
    const checkedAllProducts = useMemo(()=>
        [...checkedDomesticProducts, ...checkedOverseasProducts], [checkedDomesticProducts, checkedOverseasProducts]);

    // 선택된 상품 가격
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
        setOrderProductList(prev=>
            prev.filter(item => !item.isChecked)
        )

        setOrderProductOverseasList(prev=>
            prev.filter(item => !item.isChecked)
        )
    }

    // 개별 상품 삭제
    const handleRemvoeProduct = (index, isOverseas = false) => {
        if(isOverseas) {
            setOrderProductOverseasList(prev =>
                prev.filter((_, i) => i !== index))
        } else {
            setOrderProductList(prev =>
                prev.filter((_, i) => i !== index))
        }
    }

    const [currentProductIndex, setCurrentProductIndex] = useState(0);
    const productScrollRef = useRef(null);

    const handleScrollProduct = () => {
        const scrollX = productScrollRef.current.scrollLeft;  // 얼마나 스크롤했는지
        const containerWidth = productScrollRef.current.offsetWidth;  // 요소의 보이는 너비
        const index = Math.round(scrollX/containerWidth);
        setCurrentProductIndex(index);
    }

    const goToProductSlide = (index) => {
        if(!productScrollRef.current) return;

        const containerWidth = productScrollRef.current.offsetWidth;

        productScrollRef.current.scrollTo({
            left: index * containerWidth,
            behavior: "smooth"
        });

        setTimeout(() => {
            setCurrentProductIndex(index);
        }, 300);
    }


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
                    onClick={()=> setActiveTab(index)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {orderProductList.length === 0 && orderProductOverseasList.length === 0 ? (
                <div className="no-product-area">
                    <p className="no-product-content1">장바구니에 담긴 상품이 없어요</p>
                    <p className="no-product-content2">원하는 상품을 담아보세요</p>
                    <img src="/assets/icon/ic_cart.svg" />
                    <button>홈에서 추천상품 보기</button>
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

                        {orderProductList.length > 0 && (
                            <div className="delivery-area">
                                <div className="header">국내 배송</div>
                                <div className="content-area">
                                    {orderProductList.map((item, index) => (
                                        <div key={index} >
                                            <OrderCartProductCard
                                                productData={item}
                                                onCheckChange={()=>toggleDomesitcCheck(index)}
                                                onRemove={()=>handleRemvoeProduct(index, false)}
                                            />
                                            {index < orderProductList.length - 1 && <div className="diver2"/>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {}

                        {orderProductOverseasList.length > 0 && (
                            <div className={`delivery-area bottom ${orderProductList.length===0 ? 'empty-top' : ''}`}>
                                <div className="header">해외 배송</div>
                                <div className="content-area">
                                    {orderProductOverseasList.map((item, index) => (
                                        <div key={index} >
                                            <OrderCartProductCard
                                                productData={item}
                                                onCheckChange={()=>toggleOverseasCheck(index)}
                                                onRemove={()=>handleRemvoeProduct(index, true)}
                                            />
                                            {index < orderProductOverseasList.length - 1 && <div className="diver2"/>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )} 
                        <div className="cart-info-row">
                            <img src="/assets/icon/ic_cart_info.svg" />
                            <p>판매 종료된 상품은 장바구니에서 자동 삭제됩니다.</p>
                        </div>
                    </div>

                    {/* 결제금액 영역 */}
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
                </div>
            )}

            <div className="diver" />

            {/* 내가 찜한 상품 */}
            <div className='product-recommend-area'>
                <p className='recommend-title'><span className='title-highlight'>내가 찜한</span> 상품</p>
                <div 
                className='recommned-product-list-slide'
                ref={productScrollRef}
                onScroll={handleScrollProduct}
                >
                    <div className='recommned-product-list'>
                        {RecommendedProducts.slice(0,6).map((product) => (
                            <ProductCardPrev
                                key={product.id}
                                product={product}
                                isRecommend={true}
                            />
                        )) }
                    </div>
                    <div className='recommned-product-list'>
                        {RecommendedProducts.slice(6,12).map((product) => (
                            <ProductCardPrev
                                key={product.id}
                                product={product}
                                isRecommend={true}
                            />
                        )) }
                    </div>
                    <div className='recommned-product-list'>
                        {RecommendedProducts.slice(12,18).map((product) => (
                            <ProductCardPrev
                                key={product.id}
                                product={product}
                                isRecommend={true}
                            />
                        )) }
                    </div>
                </div>

                <div className='btn-indicator'> 
                    {[0,1,2].map((index) => (
                        <button
                            key={index} 
                            className={`recommend-indicator ${currentProductIndex===index ? 'active' : ''}`}
                            onClick={() => goToProductSlide(index)}
                        />
                    ))}
                </div>
            </div>

            <div className="diver" />

            {/* 최근 본 상품 */}
            <div className='product-recommend-area'>
                <p className='recommend-title'><span className='title-highlight'>최근 본</span> 상품</p>
                <div 
                className='recommned-product-list-slide'
                ref={productScrollRef}
                onScroll={handleScrollProduct}
                >
                    <div className='recommned-product-list'>
                        {RecommendedProducts.slice(0,6).map((product) => (
                            <ProductCardPrev
                                key={product.id}
                                product={product}
                                isRecommend={true}
                            />
                        )) }
                    </div>
                    <div className='recommned-product-list'>
                        {RecommendedProducts.slice(6,12).map((product) => (
                            <ProductCardPrev
                                key={product.id}
                                product={product}
                                isRecommend={true}
                            />
                        )) }
                    </div>
                    <div className='recommned-product-list'>
                        {RecommendedProducts.slice(12,18).map((product) => (
                            <ProductCardPrev
                                key={product.id}
                                product={product}
                                isRecommend={true}
                            />
                        )) }
                    </div>
                </div>

                <div className='btn-indicator'> 
                    {[0,1,2].map((index) => (
                        <button
                            key={index} 
                            className={`recommend-indicator ${currentProductIndex===index ? 'active' : ''}`}
                            onClick={() => goToProductSlide(index)}
                        />
                    ))}
                </div>
            </div>
            
            <CTAButtonOrderPay
                totalPrice={priceSummary.totalPrice}
                productNum={checkedAllProducts.length}
                isEnabled={checkedAllProducts.length > 0}
            />
        </div>
    )
}

export default Cart;