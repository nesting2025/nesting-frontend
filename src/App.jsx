import "./App.css";
import Banner from "./components/Banner";
import Header from "./components/Header";
import CharacterFilter from "./components/CharacterFilter";
import ProductRecommendation from "./components/ProductRecommendation";
import GroupOrder from "./components/GroupOrder";
import WhyNesting from "./components/WhyNesting";
import Footer from "./components/Footer";
import Reviews from "./components/Reviews";
import FloatingButton from "./components/\bFloatingButton";

const mockProducts = [
  {
    id: 1,
    name: "마법의 매력 산리오 하트형 키 체인",
    price: "10,230",
    image: "/assets/card/photo.png",
  },
  {
    id: 2,
    name: "마법의 매력 산리오 하트형 키 체인",
    price: "10,230",
    image: "/assets/card/photo.png",
  },
  {
    id: 3,
    name: "마법의 매력 산리오 하트형 키 체인",
    price: "10,230",
    image: "/assets/card/photo.png",
  },
  {
    id: 4,
    name: "마법의 매력 산리오 하트형 키 체인",
    price: "10,230",
    image: "/assets/card/photo.png",
  },
  {
    id: 5,
    name: "마법의 매력 산리오 하트형 키 체인",
    price: "10,230",
    image: "/assets/card/photo.png",
  },
  {
    id: 6,
    name: "마법의 매력 산리오 하트형 키 체인",
    price: "10,230",
    image: "/assets/card/photo.png",
  },
  {
    id: 7,
    name: "마법의 매력 산리오 하트형 키 체인",
    price: "10,230",
    image: "/assets/card/photo.png",
  },
  {
    id: 8,
    name: "마법의 매력 산리오 하트형 키 체인",
    price: "10,230",
    image: "/assets/card/photo.png",
  },
  {
    id: 9,
    name: "마법의 매력 산리오 하트형 키 체인",
    price: "10,230",
    image: "/assets/card/photo.png",
  },
  {
    id: 10,
    name: "마법의 매력 산리오 하트형 키 체인",
    price: "10,230",
    image: "/assets/card/photo.png",
  },
];

const mockReviews = [
  {
    id: 1,
    text: "배송도 빠르고 제품이 너무 예뻐요!",
    image: "/assets/review1.jpg",
  },
  { id: 2, text: "기대했던 것보다 더 귀여워요!", image: "/assets/review2.jpg" },
];

function App() {
  return (
    <div>
      <Banner />
      <Header />
      <CharacterFilter />
      <ProductRecommendation products={mockProducts} />
      <GroupOrder />
      <WhyNesting />
      <Reviews reviews={mockReviews} />
      <Footer />

      <FloatingButton />
    </div>
  );
}

export default App;
