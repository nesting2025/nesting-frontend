import { useRef } from "react";
import ReviewCard from "./ReviewCard";
import "../styles/Reviews.css";

const Reviews = ({ reviews }) => {
  const sliderRef = useRef(null);
  return (
    <section className="reviews">
      <h2>네스터들의 소중한 후기</h2>
      {/* <div className="review-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <img src={review.image} alt="후기 이미지" />
            <p>{review.text}</p>
          </div>
        ))}
      </div> */}
      <div className="carousel-container">
        <div className="review-list" ref={sliderRef}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Reviews;
