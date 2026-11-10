import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

import "../styles/ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((item) => item.id === Number(id));
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  if (!product) {
    return (
      <>
        <Navbar />

        <div className="product-not-found">
          <h2>Product Not Found</h2>
          <p>Sorry, this product is not available.</p>

          <button onClick={() => navigate("/shop")}>
            Back to Shop
          </button>
        </div>
      </>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    setMessage("Product added to your cart successfully!");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  return (
    <>
      <Navbar />

      <div className="product-details-page">
        <div className="product-details-container">

          <div className="product-breadcrumb">
            <button onClick={() => navigate("/shop")}>
              ← Back to Shop
            </button>

            <span>/</span>
            <span>{product.category}</span>

            <span>/</span>
            <strong>{product.name}</strong>
          </div>

          <div className="product-details-card">

            <div className="product-details-image">
              <img src={product.image} alt={product.name} />

              {product.badge && (
                <span className="product-details-badge">
                  {product.badge}
                </span>
              )}
            </div>

            <div className="product-details-info">

              <span className="product-details-category">
                {product.category}
              </span>

              <h1>{product.name}</h1>

              <div className="product-details-rating">
                ⭐
                <strong>{product.rating}</strong>
                <span>/ 5</span>
              </div>

              <div className="product-details-price">
                ₹{product.price}
                <span> /{product.unit}</span>
              </div>

              <div className="product-details-divider"></div>

              <h3>Product Description</h3>

              <p className="product-details-description">
                {product.description}
              </p>

              <div className="product-farmer-info">
                <div className="farmer-icon">🌱</div>

                <div>
                  <span>Grown and supplied by</span>
                  <strong>{product.farmer}</strong>
                </div>
              </div>

              <div className="product-details-divider"></div>

              <div className="product-quantity-section">
                <label>Select Quantity</label>

                <div className="product-quantity-control">
                  <button
                    onClick={() =>
                      setQuantity((prev) => Math.max(1, prev - 1))
                    }
                    disabled={quantity <= 1}
                  >
                    −
                  </button>

                  <span>{quantity}</span>

                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="product-total-price">
                <span>Total Price</span>

                <strong>₹{product.price * quantity}</strong>
              </div>

              <button
                className="product-add-cart-button"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              {message && (
                <p className="product-cart-success">
                  {message}
                </p>
              )}

              <p className="product-details-note">
                Fresh products directly from farmers to your home.
              </p>

            </div>
          </div>

          <div className="product-benefits">
            <div>
              <span>🌿</span>
              <strong>Fresh from Farm</strong>
              <span>Carefully selected produce</span>
            </div>

            <div>
              <span>🚚</span>
              <strong>Farm to Home</strong>
              <span>Direct farmer sourcing</span>
            </div>

            <div>
              <span>✓</span>
              <strong>Quality Assured</strong>
              <span>Freshness you can trust</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default ProductDetails;