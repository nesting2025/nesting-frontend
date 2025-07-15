import { useState, useEffect } from "react";
import Header from "../components/Header";
import CharacterFilter from "../components/CharacterFilter";
import ProductRecommendation from "../components/ProductRecommendation";
import GroupOrder from "../components/GroupOrder";
import WhyNesting from "../components/WhyNesting";
import Footer from "../components/layout/Footer";
import Reviews from "../components/Reviews";
import FloatingButton from "../components/FloatingButton";
import useScreenSize from "../hooks/useScreensize";

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
    text: "이쁘게 잘 왔어요 ! 포장도 깔끔하고 좋았습니당 실물 너무 귀여움🥹 재구매하러 올게요 🩷실물이 훠어얼씬 더 귀여워욤",
    image: "/assets/review1.jpg",
  },
  { id: 2, text: "기대했던 것보다 더 귀여워요!", image: "/assets/review2.jpg" },
  { id: 3, text: "기대했던 것보다 더 귀여워요!", image: "/assets/review2.jpg" },
  { id: 4, text: "기대했던 것보다 더 귀여워요!", image: "/assets/review2.jpg" },
];

function Home() {
  const {screenSize} = useScreenSize();

  return (
    <div>
      <Header screenSize={screenSize} />
      <CharacterFilter screenSize={screenSize} />
      <ProductRecommendation products={mockProducts} screenSize={screenSize} />
      <ProductRecommendation products={mockProducts} screenSize={screenSize} />
      <GroupOrder screenSize={screenSize} />
      <WhyNesting screenSize={screenSize} />
      <Reviews reviews={mockReviews} />
      <Footer screenSize={screenSize} />

      <FloatingButton />
    </div>
  );
}

export default Home;
