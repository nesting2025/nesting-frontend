import "../styles/css/GroupOrder.css";

const GroupOrder = ({ screenSize }) => {
  return (
    <section className="group-order-banner">
      <div className="group-order-content">
        <p className={`sub-text ${screenSize}`}>같이 배송으로 더 저렴하게</p>
        <h2 className={`main-text ${screenSize}`}>목표 수량을 달성할수록 배송이 빨라져요</h2>
      </div>
      {screenSize === "large" ? (
         <button className="group-order-btn">같이 배송이 뭔가요?</button>
      ): (
        <button className={`group-order-img-btn ${screenSize}`} />
      )}     

      <img
        src="/assets/green-circle.svg"
        alt="Green Circle"
        className="pattern green-circle"
      />
      <img
        src="/assets/green-circle.svg"
        alt="Green Circle"
        className="pattern green-circle right"
      />
      <img
        src="/assets/green-circle.svg"
        alt="Green Circle"
        className="pattern green-circle bottom"
      />

      <img
        src="/assets/red-triangle.svg"
        alt="Red Triangle"
        className="pattern red-triangle"
      />
      <img
        src="/assets/red-triangle.svg"
        alt="Red Triangle"
        className="pattern red-triangle center"
      />
      <img
        src="/assets/red-triangle.svg"
        alt="Red Triangle"
        className="pattern red-triangle right"
      />

      <img
        src="/assets/yellow-square.svg"
        alt="Yellow Square"
        className="pattern yellow-square"
      />
      <img
        src="/assets/yellow-square.svg"
        alt="Yellow Square"
        className="pattern yellow-square right"
      />
    </section>
  );
};

export default GroupOrder;
