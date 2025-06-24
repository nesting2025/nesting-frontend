import '../styles/css/ProductReview.css';

const ProductReview = ( {rating, nickname, content, photo} ) => {

    return (
        <div className="product-review">
            <div className="review-row1">
                <div className='star-row'>
                    {Array.from({ length: rating }).map((_, i) => (
                        <img key={i} src='/assets/icon/star.svg' className="star-img" />
                    ))}
                </div>
                <p className='nickname'>{nickname}</p>
            </div>
            <div className="review-row2">
                <p className={`content ${!photo ? 'full-width' : ''}`}>{content}</p>
                {photo && (
                    <img className='photo-img' src={photo} />
                )}
            </div>
        </div>
    )
}

export default ProductReview;