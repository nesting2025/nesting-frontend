import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../styles/css/ProductRequest.css";
import CTAButtonOrderPay from "../components/CTAButtonOrderPay";
import { useLoadProxyRequst } from "../hooks/useProducts";
import PopupDialog from "../components/dialog/PopupDialog";

const ProductRequest = () => {
    const nav = useNavigate();
    const [activeTab, setActiveTab] = useState("이용 방법");
    const [productDomain, setProductDomain] = useState("");
    const { loadProxyRequst, loading, error, data: loadProxyRequstData } = useLoadProxyRequst();
    const [isOpenLoginDialog, setIsOpenLoginDialog] = useState(false);

    const precautionList = [
        {
            number: 1,
            title: "정품 아닐 시 100% 환불",
            content: <>믿고 덕질하세요. 네스팅은 정품만을 전할게요.</>
        }, 
        {
            number: 2,
            title: "개인통관고유부호 발급 필수",
            content: <>해외 직구를 위해 필요해요. 꼭 배송을 받는 사람의 명의여야만 해요. <br />잘못 기입한 경우, 통관 지연이 발생할 수 있어요.</>
        }, 
        {
            number: 3,
            title: "합배송 주의",
            content: <>해외 직배송 상품은 출고지(일본/중국)가 같은 경우에 합배송이 가능해요. <br />네스팅의 국내 판매 상품과는 합배송이 불가능해요.</>
        }, 
        {
            number: 4,
            title: "주문 후 취소",
            content: <>결제 후 일본 내 주문이 완료된 경우엔 취소가 불가능해요. <br />특정한 사유 없이 일방적인 주문 취소가 반복될 경우, 네스팅 구매대행 서비스 이용이 제한될 수 있어요..</>
        }, 
    ]
    const shippingInfoList = [
        {
            img: "/assets/icon/ic_shipping_bus.svg",
            text: "해외현지"
        },
        {
            img: "/assets/icon/ic_shipping_plane.svg",
            text: "국제배송"
        },
        {
            img: "/assets/icon/ic_shipping_document.svg",
            text: "국내 도착/통관"
        },
        {
            img: "/assets/icon/ic_shipping_bus.svg",
            text: "국내배송"
        },
        {
            img: "/assets/icon/ic_shipping_complete.svg",
            text: "배송완료"
        },
        
    ]
    const exchagneRefundList = [
        "스토어 구매대행 특성상 A/S는 불가합니다",
        "제품의 미세한 흠집, 눌림, 접힘, 제작 공정상의 흔적 등은 반품 사유에 해당하지 않습니다",
        "단순 변심으로 인한 환불/교환/취소는 불가합니다",
        "제품 개봉 후에는 반품이 어려우며, 상품 불량 판단을 위해 개봉 전 반드시 촬영을 부탁드립니다",
        "상품 훼손 및 누락 등은 수령 후 24시간 이내 고객센터(카카오톡)로 문의 주셔야 처리가 가능합니다",
    ]
    const FAQList = [
        {
            number: 1,
            title: "네스팅에서는 어떤 상품을 구매할 수 있나요?",
            content: <>메루카리, 라쿠텐 등 일본 사이트, 공식 브랜드샵의 상품을 구매대행해 드립니다.</>,
            note: <>*예약 상품의 경우도 구매가 가능합니다.</>
        },
        {
            number: 2,
            title: "일본에서 배송까지 얼마나 걸리나요?",
            content: <>상품별로 상이하나 평균적으로 7-14일(영업일 기준) 정도 소요됩니다.</>,
            note: <>*프리오더(예약 상품)의 경우 출시 일정에 따라 시간이 더 걸릴 수 있습니다.<br />*해외 배송 특성상, 항공/세관 상황에 따라 일부 지연될 수 있습니다.</>
        },
        {
            number: 3,
            title: "구매대행 수수료 외에 추가 비용이 따로 있나요?",
            content: <>네스팅은 투명한 가격 정책을 운영하며, 제품 가격과 국제 배송비 외에 별도의 추가 수수료는 없습니다.</>,
            note: <>*다만, 일본 내 개별 판매자의 정책에 따라 별도 현지 배송비가 발생할 수 있으며, 이는 구매 시 안내해 드립니다.</>
        },
        {
            number: 4,
            title: "관부가세가 발생하나요?",
            content: <>150달러 이하 구매 시엔 관부가세가 없습니다. <br />150달러 초과 시 관세법에 따라 부과될 수 있으며, 상세 안내는 주문 시 제공됩니다.</>,
            note: <></>
        },
        {
            number: 5,
            title: "주문 취소나 변경이 가능한가요?",
            content: <>일본 현지에서 바로 구매 진행되기 때문에 결제 후 주문 변경/취소가 어렵습니다.</>,
            note: <>*단, 주문 후 1시간 이내에 문의 주시면 취소 가능 여부를 확인해 드립니다.</>
        },
        {
            number: 6,
            title: "주문한 상품을 직거래로 수령할 수 있나요?",
            content: <>현재 네스팅은 해외 직배송 및 국내 택배 발송만 지원하고 있으며, 오프라인 방문 수령은 제공되지 않습니다.</>,
            note: <></>
        },
    ]

    const [openStates, setOpenStates] = useState(
        FAQList.map(() => false)
    );

    const toggleFAQ = (index) => {
        setOpenStates((prev) => 
        prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
        );
    };

    // 구매대행 상품 불러오기 API 
    const handleLoadProxyRequest = async () => {
        if(!localStorage.getItem("accessToken")) {
            setIsOpenLoginDialog(true);
            return;
        }
        try {
            await loadProxyRequst(productDomain);
        } catch (e) { 
            console.log(e); 
        }
    }
    // API 응답
    useEffect(() => {
        if(loadProxyRequstData !== null) {
            nav("/product/request/list", { 
                state: {
                    sourceUrl: productDomain, ...loadProxyRequstData
                }
            });
        }
    }, [loadProxyRequstData])

    return (
        <div className="product-request">
            <PopupDialog open={isOpenLoginDialog} onOpenChange={(newOpen) => setIsOpenLoginDialog(newOpen)} titleText={<>로그인이 필요한 서비스입니다.<br/>로그인 하시겠습니까?</>} />
            <div className="header">
                <img 
                    className="back-button"
                    src="/assets/button/btn_back2.svg" 
                    onClick={() => nav(-1)}
                />
                <p>구매대행 요청하기</p>
            </div>

            {loading && (
                <div className="loading-error-area">
                    <img src="/assets/service/bird_proxy_request_loading.svg" />
                    <h3>상품을 불러오고 있어요</h3>
                    <h5>잠시만 기다려 주세요</h5>
                </div>
            )}

            {error && (
                <div className="loading-error-area">
                    <img src="/assets/service/bird_proxy_request_error.svg" />
                    <h3>상품을 불러오지 못했어요</h3>
                    <h5>다시 시도해 주세요. 문제가 반복될 시 <span onClick={()=> {window.open("http://pf.kakao.com/_Xexkxen", "_blank")}}>고객센터</span>로 문의를 남겨주시면 확인 도와드릴게요.</h5>
                    <button onClick={() => nav("/product/request/list")}>다시 시도하기</button>
                </div>
            )}

            <section className="title-area">
                <h1>링크 하나로<br />해외 상품 구매 끝!</h1>
                <p>복잡한 해외 결제도, 번역도 필요 없는<br />초.간.단. 구매대행</p>
                <div className="input-with-bird">
                    <img src="/assets/icon/ic_product_request_bird1.svg" />
                    <div className="input-area">
                        <img src="/assets/icon/icon_link.svg" />
                        <input placeholder="원하는 상품의 링크(URL)를 입력해 주세요 " value={productDomain} onChange={(e) => setProductDomain(e.target.value)}/>
                    </div>
                </div>
            </section>

            {/* 이용 방법/가격 안내 */}
            <section className="info-use-price-area">
                <div className="product-request-tab">
                    <button className={activeTab === "이용 방법" ? "active" : ""}
                    onClick={() => setActiveTab("이용 방법")}>이용 방법</button>
                    <button className={activeTab === "가격 안내" ? "active" : ""}
                    onClick={() => setActiveTab("가격 안내")}>가격 안내</button>
                </div>
                
                <div className="info-content-area">
                    {activeTab === "이용 방법" ? (
                        <>
                            <div className="use-info-step">
                                <img src="/assets/icon/ic_link_with_background.svg" />
                                <div className="text-area">
                                    <p>STEP 1.</p>
                                    <span>원하는 상품의 링크 붙여 넣기</span>
                                </div>
                            </div>

                            <div className="diver" />

                            <div className="use-info-step">
                                <img src="/assets/icon/ic_cart_with_background.svg" />
                                <div className="text-area">
                                    <p>STEP 2.</p>
                                    <span>상품 확인 후 구매 요청하기</span>
                                    <p className="text-light">메루카리 사이트 이외의 상품은 관리자가 확인 후 장바구니에 넣어드려요</p>
                                </div>
                            </div>

                            <div className="diver" />

                            <div className="use-info-step">
                                <img src="/assets/icon/ic_card_with_background.svg" />
                                <div className="text-area">
                                    <p>STEP 3.</p>
                                    <span>장바구니에서 가격 확인하고 바로 결제하면 끝!</span>
                                </div>
                            </div>
                        </>
                    ): (
                        <>
                            <div className="price-info-step">
                                <div className="top-row">
                                    <img src="/assets/icon/ic_check_with_background.svg" />
                                    <p>기본 수수료</p>
                                </div>
                                <div className="contetn-row">
                                    <p> • 결제 한 건당: <span>3,000원</span></p>
                                    <p> • 10만원 이상 결제 시: <span>총액의 5% 부과</span></p>
                                </div>
                                <div className="content-row2">
                                    <p>A 판매자 짱구 인형 3개 → 결제 1건</p>
                                    <p>A 판매자 짱구 + B 판매자 맹구 → 결제 2건</p>
                                </div>
                            </div>

                            <div className="diver" />

                            <div className="price-info-step">
                                <div className="top-row">
                                    <img src="/assets/icon/ic_check_with_background.svg" />
                                    <p>해외 배송비</p>
                                </div>
                                <div className="contetn-row">
                                    <p> • <span>무게 기준</span>으로 차등 부과</p>
                                    <p className="text-light">(해외 배송비 중 가장 저렴한 수준이에요)</p>
                                </div>
                                <img src="/assets/table/table_shipping_fee.svg" className="table" />
                            </div>

                            <div className="diver" />

                            <div className="price-info-step">
                                <div className="top-row">
                                    <img src="/assets/icon/ic_check_with_background.svg" />
                                    <p>합배송 비용</p>
                                </div>
                                <div className="contetn-row">
                                    <p> • 상품 개당: <span>500원</span></p>
                                    <p className="text-light">(합배송을 신청하신 상품의 무게에 따라 추가 배송비가 발생할 수 있어요.)</p>
                                </div>
                            </div>

                            <div className="diver" />

                            <div className="price-info-step">
                                <div className="top-row">
                                    <img src="/assets/icon/ic_check_with_background.svg" />
                                    <p>기타 추가 비용 (선택)</p>
                                </div>
                                <div className="contetn-row">
                                    <p> • 해외 배송 보상 보험: <span>주문 금액으로 차등 부과</span></p>
                                    <p className="text-light">(가입하지 않을 시, 파손/도난/분실 등에 대해 보상이 불가할 수 있어요.)</p>
                                </div>
                                <img src="/assets/table/table_extra_fee.svg" className="table" />
                                <div className="contetn-row">
                                    <p> • 추가 포장: <span>2,000원</span></p>
                                    <p className="text-light">(선택하지 않을 시, 일본 판매자가 보낸 패키지 그대로 발송되어요.)</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <p className="info-small">*네스팅은 자체 환율을 적용하고 있어, 구매 시점에 따라 환율 차이가 있을 수 있습니다. 이 점 참고 부탁드리며, 정확한 금액은 결제 전에 다시 한 번 확인 부탁 드립니다.</p>
            </section>

            {/* 구매 전 유의 사항 */}
            <section className="precaution-area">
                <h3>구매 전 유의 사항</h3>
                <h5>잠깐! 구매 전 아래 유의사항을 확인하세요!</h5>

                <div className="content-area">
                    {precautionList.map((item, index) => (
                        <div className="precaution-row" key={index}>
                            <div className="title-row">
                                <p className="highlight">{item.number}.</p>
                                <p className="title"> {item.title}</p>
                            </div>
                            <p className="content">{item.content}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 국제 배송 안내 */}
            <section className="shipping-info-area">
                <div className="title">국제 배송 안내</div>
                <div className="contet-area">
                    <p className="text-info1">월~금 항공 발송 (주말 및 일본 공휴일 휴무)</p>
                    <p className="text-info2">평균 배송 7~14일 내 (실제 고객 배송 후기 평균 8일 소요)</p>

                    <div className="img-with-text">
                    {shippingInfoList.map((item, index) => (
                        <React.Fragment key={index} >
                            <div className="item">
                                <img className="icon" src={item.img} />
                                <p>{item.text}</p>
                            </div>

                            {index < shippingInfoList.length -1 && (
                                <img className="icon_ing" src="/assets/icon/ic_shipping_ing.svg" />
                            ) }
                        </React.Fragment>
                    ))}
                    </div>
                </div>
            </section>

            {/* 교환 & 환불(반품) 안내 */}
            <section className="exchagne-refund-area">
                <h3 className="white">교환 & 환불(반품) 안내</h3>
                <h5 className="white">반드시 확인해 주세요!</h5>
                <div className="content-area">
                    {exchagneRefundList.map((item, index) => (
                        <div className="content-row" key={index}>
                            {item}
                        </div>
                    ))}
                </div>
                <p className="info-small white">*본 상품은 구매대행 상품으로, 전자거래법상 반품/환불 책임이 제한됩니다. 결제 시 상단 내용에 동의하신 것으로 간주됩니다.</p>

            </section>

            {/* FAQ */}
            <section className="FAQ-area">
                <h3>FAQ</h3>
                <h5>주문 전 꼭 읽어 주세요!</h5>
                <div className="content-area">
                    {FAQList.map((item, index) => (
                        <div key={index}>
                            <div className="FAQ-row">
                                <div className="title">
                                    <p>{item.number}.</p>
                                    <span>{item.title}</span>
                                </div>
                                <img src={openStates[index] ? "/assets/button/btn_dropup.svg" : "/assets/button/btn_dropdown.svg"} onClick={() => toggleFAQ(index)} />
                            </div>
                            {openStates[index] ? (
                                <div className="FAQ-content-note" style={{ gap: item.note && item.note.props.children ? "4px" : "0" }}>
                                    <p className="content">{item.content}</p>
                                    <p className="note">{item.note}</p>
                                </div>
                            ): (
                                index === FAQList.length - 1 ? null : <div className="diver" />
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {!loading && !error && <CTAButtonOrderPay type="next" isEnabled={productDomain} onClickButton={handleLoadProxyRequest} />}

        </div>
    )
}

export default ProductRequest;