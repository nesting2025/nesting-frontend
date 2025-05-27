import "../styles/css/Header.css";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

const Header = ({screenSize}) => {
  const nav = useNavigate();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const toggleSearchBar = () => {
    setShowSearchBar((showSearchBar) => !showSearchBar)
  }

  const gotoUserPage = () => nav("/login");

  return (
    <>
    <header className={`header ${screenSize}`}>
      <nav className="navbar">
        <a href="#">SHOP</a>
        <a href="#">ABOUT</a>
        <a href="#">CONTACT US</a>
        <img src="/assets/size=48, type=menu.svg" alt="Menu" className="icon" />
      </nav>

      <div className="logo">
        {/* 로고 */}
        <img src="/assets/logo.svg" alt="Nesting" className="icon" />
      </div>
      <div className="icons">
        {/* 검색 아이콘 */}
        <div className="search-icon" onClick={toggleSearchBar}>
          <img
            src="/assets/size=24, type=search.svg"
            alt="Search"
            className="icon"
          />
        </div>
        

        {/* 사용자 아이콘 */}
        <div 
          className="user-icon"
          onClick={gotoUserPage}>
          <img src="/assets/size=24, type=user.svg" alt="User" className="icon" />
        </div>

        {/* 장바구니 아이콘 */}
        <div className="cart-icon">
          <img
            src="/assets/size=24, type=cart.svg"
            alt="Cart"
            className="icon"
          />
          <span className="cart-badge">{screenSize == "small"? "" : "10"}</span> {/* 장바구니 개수 표시 */}
          
        </div>
      </div>
    </header>

    {showSearchBar && (
      <>
      <div className="overlay" onClick={toggleSearchBar}></div>
      <div className="searchbar-wrapper">
        <SearchBar />
      </div>
      </>
    )}
    </>
  );
};

export default Header;
