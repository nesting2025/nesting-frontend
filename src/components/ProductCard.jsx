import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />

      <div className="product-info">
        <div className="product-name">{product.name}</div>
        <button className="cart-btn">
          <img
            src="/assets/size=32, type=cart.svg"
            alt="Add to Cart"
            className="cart-icon"
          />
        </button>
      </div>

      <p className="product-price">{product.price}원</p>
    </div>
  );
};

export default ProductCard;
