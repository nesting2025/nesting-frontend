import "../styles/ReviewCard.css";

const ReviewCard = ({ review }) => {
    return (
        <div className="review-card">    
          <div className="review-info">
            <img src="/assets/rating.png"/>
            <p className="review-text">{review.text}</p>
          </div>
        </div>
      );
}

export default ReviewCard;