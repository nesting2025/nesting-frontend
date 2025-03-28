import "../styles/css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="nesting-info">
        <img className="img-banner" src="assets/banner.png" />
        <p>서비스 이용 약관 <span>|</span> 개인정보처리방침 <span>|</span> 이용 안내</p>
        <p>
          사업자등록번호: 102-18-66318 <span>|</span> 통신판매업신고번호: 2024-서울성북-0983 <span>|</span> 고객센터 : 070-7954-4117
        </p>
        <p>대표: 남윤수 <span>|</span> @ Busyboyshop</p>
        <p>© 2025 NESTING</p>
      </div>
      <div className="social-icons">
        <img src="assets/social/naver_shopping.svg" />
        <img src="assets/social/bunjang.svg" />
        <img src="assets/social/instagram.svg" />
        <img src="assets/social/kakao.svg" />
        <img src="assets/social/naver_blog.svg" />
      </div>
    </footer>
  );
};

export default Footer;
