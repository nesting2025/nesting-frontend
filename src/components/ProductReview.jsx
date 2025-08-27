import '../styles/css/ProductReview.css';

const ProductReview = ( {review} ) => {

    return (
        <div className="product-review">
            <div className="review-row1">
                <div className='star-row'>
                    {Array.from({ length: review.score }).map((_, i) => (
                        <img key={i} src='/assets/icon/star.svg' className="star-img" />
                    ))}
                </div>
                <p className='nickname'>{review.userInfo.nickname}</p>
            </div>
            <div className="review-row2">
                <p className={`content ${review.imageUrl.length === 0 ? 'full-width' : ''}`}>{review.content}</p>
                {review.imageUrl.length > 0 && (
                    <img className='photo-img' src={review.imageUrl[0]} />  // 리뷰 이미지가 존재하는 경우 첫번째 사진 보여줌
                )}
            </div>
        </div>
    )
}

export default ProductReview;