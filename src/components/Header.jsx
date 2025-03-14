import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <a href="#">SHOP</a>
        <a href="#">ABOUT</a>
        <a href="#">CONTACT US</a>
      </nav>

      <div className="logo">
        {/* 로고 */}
        <img src="/assets/logo.svg" alt="Nesting" className="icon" />
      </div>

      <div className="icons">
        {/* 검색 아이콘 */}
        <img
          src="/assets/size=24, type=search.svg"
          alt="Search"
          className="icon"
        />

        {/* 사용자 아이콘 */}
        <img src="/assets/size=24, type=user.svg" alt="User" className="icon" />

        {/* 장바구니 아이콘 */}
        <div className="cart-icon">
          <img
            src="/assets/size=24, type=cart.svg"
            alt="Cart"
            className="icon"
          />
          <span className="cart-badge">10</span> {/* 장바구니 개수 표시 */}
        </div>
      </div>
    </header>
  );
};

export default Header;
