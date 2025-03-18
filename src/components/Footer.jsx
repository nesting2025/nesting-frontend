import "../styles/Footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="nesting-info">
        <img className="img_banner" src="assets/banner.png" />
        <p>서비스 이용 약관 | 개인정보처리방침 | 이용 안내</p>
        <p>
          사업자등록번호: 102-18-66318 | 통신판매업신고번호: 2024-서울성북-0983
          | 고객센터 : 070-7954-4117
        </p>
        <p>대표: 남윤수 | @ Busyboyshop</p>
        <p>© 2025 NESTING</p>
      </div>
      <div className="social-icons">
        <img src="assets/social/naver_shopping.svg" />
        <img src="assets/social/bunjang.svg" />
        <img src="assets/social/instagram.svg" />
        <img src="assets/social/kakao.svg" />
        <img src="assets/social/naver_blog.svg" />
      </div>
      <button className="btn_goup" onClick={scrollToTop}>
        {"\u2191"}
      </button>
    </footer>
  );
};

export default Footer;
