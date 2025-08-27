import React, { useState } from "react";
import "../../styles/css/StickyHeader.css";
import SearchBar from "../SearchBar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const nav = useNavigate();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const toggleSearchBar = () => {
    setShowSearchBar((prev) => !prev);
  };

  const gotoUserPage = () => nav("/login");

  return (
    <>
      <header className="header small">
        <div className="menu-icon">
          <img
            src="/assets/size=24, type=search.svg"
            className="icon"
          />
        </div>

        <div className="logo">
          <img src="/assets/logo.svg" alt="Nesting" className="icon" />
        </div>

        <div className="icons">
          <div className="search-icon">
            <img
              src="/assets/size=24, type=user.svg"
              className="icon"
            />
          </div>

          <div className="cart-icon">
            <img
              src="/assets/size=24, type=cart.svg"
              alt="Cart"
              className="icon"
            />
            <span className="cart-badge"></span>
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
