import "../styles/WhyNesting.css";

const WhyNesting = () => {
  return (
    <section className="why-nesting">
      <h2 className="section-title">네스팅은 뭐가 특별할까요?</h2>

      <div className="why-card">
        <div className="why-item">
          <h3 className="highlight-text">
            88<span>%</span>
          </h3>
          <div>
            <h4>더 저렴한 배송비</h4>
            <p>
              구매 대행에 3만원씩 쓰지 않아도 돼요. 네스팅에선 3000원에 최애를
              데려올 수 있어요. 배송비를 최대한 아껴보세요.
            </p>
          </div>
        </div>
        <div className="why-item">
          <h3 className="highlight-text">
            2<span> step</span>
          </h3>
          <div>
            <h4>간단한 구매 절차</h4>
            <p>
              복잡한 해외 구매대행 절차를 최대한 줄였어요. 1단계: 구경한다 →
              2단계: 주문한다. 끝! 개인통관고유번호도 몰라도 됩니다.
            </p>
          </div>
        </div>
        <div className="why-item">
          <h3 className="highlight-text">
            4.9<span> 점</span>
          </h3>
          <div>
            <h4>네스터들의 평균 후기 점수</h4>
            <p>
              3500건이 넘는 거래에서 네스터들은 대만족! 24시 응대, 검수 사진,
              배송 상황 공유 등 걱정하지 않게 해드릴게요.
            </p>
          </div>
        </div>
      </div>
      <button className="why-btn">네스팅에 대해 더 알고 싶으신가요?</button>
    </section>
  );
};

export default WhyNesting;
