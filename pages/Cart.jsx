import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from "lucide-react";

import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

import "../styles/Cart.css";

function Cart() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  return (
    <div className="cart-page">

      <Navbar />

      <main className="cart-container">

        <div className="cart-heading">
          <div>
            <h1>My Shopping Cart</h1>
            <p>
              Review your fresh farm products before checkout.
            </p>
          </div>

          <span className="cart-items-count">
            {cartCount} Items
          </span>
        </div>

        {cartItems.length === 0 ? (

          <div className="empty-cart">

            <div className="empty-cart-icon">
              <ShoppingCart size={55} />
            </div>

            <h2>Your cart is empty</h2>

            <p>
              Looks like you haven't added any fresh products yet.
            </p>

            <Link to="/shop" className="continue-shopping-btn">
              Explore Products
            </Link>

          </div>

        ) : (

          <div className="cart-layout">

            {/* CART PRODUCTS */}

            <section className="cart-products">

              <div className="cart-products-heading">
                <h2>Cart Items</h2>

                <button
                  className="clear-cart-btn"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>

              {cartItems.map((item) => (

                <div className="cart-product-card" key={item.id}>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-product-image"
                  />

                  <div className="cart-product-info">

                    <span className="cart-product-category">
                      {item.category}
                    </span>

                    <h3>{item.name}</h3>

                    <p>By {item.farmer}</p>

                    <strong>
                      ₹{item.price} / {item.unit}
                    </strong>

                  </div>

                  <div className="cart-product-actions">

                    <div className="cart-quantity-control">

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={15} />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1
                          )
                        }
                        aria-label="Increase quantity"
                      >
                        <Plus size={15} />
                      </button>

                    </div>

                    <strong className="cart-item-total">
                      ₹{item.price * item.quantity}
                    </strong>

                    <button
                      className="remove-cart-item"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={17} />
                      Remove
                    </button>

                  </div>

                </div>

              ))}

              <Link to="/shop" className="continue-shopping-link">
                <ArrowLeft size={17} />
                Continue Shopping
              </Link>

            </section>

            {/* ORDER SUMMARY */}

            <aside className="cart-summary">

              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Total Items</span>
                <strong>{cartCount}</strong>
              </div>

              <div className="summary-row">
                <span>Subtotal</span>
                <strong>₹{cartTotal}</strong>
              </div>

              <div className="summary-row">
                <span>Delivery Charges</span>
                <strong className="free-delivery">
                  FREE
                </strong>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Total Amount</span>
                <strong>₹{cartTotal}</strong>
              </div>

<Link to="/checkout" className="checkout-btn">
  Proceed to Checkout
</Link>

              <p className="cart-summary-note">
                Fresh products directly from local farmers.
              </p>

            </aside>

          </div>

        )}

      </main>

    </div>
  );
}

export default Cart;