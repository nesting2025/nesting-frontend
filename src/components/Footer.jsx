import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* 왼쪽: 로고 및 회사 정보 */}
        <div className="footer-left">
          <img
            src="../assets/logo_nesting_string.svg"
            alt="Nesting Logo"
            className="footer-logo"
          />
          <div className="footer-links">
            <span>서비스 이용 약관</span>
            <span>개인정보처리방침</span>
            <span>이용 안내</span>
          </div>
          <p className="footer-info">
            사업자등록번호: 102-18-66318 &nbsp; | &nbsp; 통신판매업신고번호:
            2024-서울성북-0983 &nbsp; | &nbsp; 고객센터: 070-7954-4117
          </p>
          <p className="footer-info">대표: 남윤수 &nbsp; @ Busyboyshop</p>
        </div>

        {/* 오른쪽: SNS 아이콘 */}
        <div className="footer-right">
          <img
            src="/assets/icon-naver-market.svg"
            alt="Naver-market"
            className="sns-icon"
          />
          <img
            src="/assets/icon-thunder.svg"
            alt="Thunder"
            className="sns-icon"
          />
          <img
            src="../assets/icon-instagram.svg"
            alt="Instagram"
            className="sns-icon"
          />
          <img src="/assets/icon-kakao.svg" alt="Kakao" className="sns-icon" />
          <img
            src="/assets/icon-naver-blog.svg"
            alt="Naver-Blog"
            className="sns-icon"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
