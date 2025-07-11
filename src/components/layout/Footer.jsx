import "../../styles/css/FooterLayout.css";
import Divider from "../Divider";

const Footer = ({ screenSize }) => {
  return (
    <footer className={`footer ${screenSize}`}>
      <div className="nesting-info">
        <img className="img-banner" src="assets/banner.png" />
        <p className="goto-info">
          서비스 이용 약관 <span> | </span>
          개인정보처리방침 <span> | </span>
          이용 안내
        </p>
        <p>
          사업자등록번호: 102-18-66318 <Divider screenSize={screenSize} />
          통신판매업신고번호: 2024-서울성북-0983{" "}
          <Divider screenSize={screenSize} />
          고객센터 : 070-7954-4117
        </p>
        <p>
          대표: 남윤수 <Divider screenSize={screenSize} />@ Busyboyshop
        </p>
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
