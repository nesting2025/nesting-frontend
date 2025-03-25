import "../styles/FloatingButton.css";
import { useState } from "react";

export default function FloatingButton() {
  const [isClicked, setIsClicked] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const handleClick = () => {
    setIsClicked(!isClicked)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const handleMouseDown = () => {
    setIsPressed(true)
  }

  const handleMouseUp = () => {
    setIsPressed(false)
  }

  return (
    <>
      <button className="floating-btn" onClick={handleClick}>
        <img src={isClicked ? "../assets/floating-pressed.svg" : "../assets/floating.svg"} 
          alt="Floating Button" />
        {isClicked && (
          <div className="floating-text">
            <span className="first-line">같이 배송 진행률</span>
            <span className="second-line">
              <span className="highlight">24</span>/30
            </span>
          </div>) }
      </button>
      <button 
        className="goup-btn" 
        onClick={scrollToTop}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}>
        <img src={isPressed ? "../assets/button/btn_up_pressed.svg" : "../assets/button/btn_up_default.svg"} />
      </button>
  </>
  );
}
