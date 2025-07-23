import "../../styles/css/FooterLayout.css";

const Footer = ({ screenSize }) => {
  const isExtraSmall = screenSize === "extra-small";
  return (
    <footer className={`footer ${screenSize}`}>
      <div className="nesting-info">
        <img className="img-banner" src="/assets/logo_nesting_string.svg" />
        <p className="goto-info">
          네스팅 이용 약관 <span> | </span>
          개인정보처리방침 <span> | </span>
          전자상거래 이용 약관 
          {isExtraSmall && <br />}
          <span> | </span>
          사업자 정보 확인
        </p>
        <div className="info-detail">
          <p className="highlight">비지보이</p>
          <p>사업자등록번호: 102-18-66318</p>
          <p>통신판매업신고번호: 2024-서울성북-0983</p>
          <p>고객센터 : 070-7954-4117</p>
          <p>서울특별시 중구 퇴계로 265, B205</p>
          <p>대표: 남윤수</p>
          <p>Copyright ⓒ Busyboy. All Rights Reserved</p>
        </div>
      </div>

      <div className="social-icons">
        <img src="/assets/social/naver_shopping.svg" />
        <img src="/assets/social/bunjang.svg" />
        <img src="/assets/social/instagram.svg" />
        <img src="/assets/social/kakao.svg" />
        <img src="/assets/social/naver_blog.svg" />
      </div>
    </footer>
  );
};

export default Footer;
