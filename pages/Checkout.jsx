import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";

import "../styles/Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartCount,
    cartTotal,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    house: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    instructions: "",
    paymentMethod: "Cash on Delivery",
  });

  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate delivery form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.house.trim()) {
      newErrors.house = "House / Flat number is required.";
    }

    if (!formData.street.trim()) {
      newErrors.street = "Street / Area is required.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required.";
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit PIN code.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Place order
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Create order details
    const order = {
      orderId: `F2H${Date.now()}`,
      customer: { ...formData },
      items: [...cartItems],
      total: cartTotal,
      itemCount: cartCount,
      deliveryCharges: 0,
      date: new Date().toLocaleString(),
    };

    // Save order before clearing cart
    sessionStorage.setItem(
      "farm2home_current_order",
      JSON.stringify(order)
    );

    // Clear shopping cart
    clearCart();

    // Navigate to order confirmation page
    navigate("/order-success");
  };

  // Empty cart screen
  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />

        <div className="checkout-empty">
          <h2>Your cart is empty!</h2>

          <p>
            Add some fresh products before proceeding to checkout.
          </p>

          <Link to="/shop">
            Explore Products
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="checkout-page">
        <div className="checkout-container">

          {/* Checkout Heading */}
          <div className="checkout-heading">
            <span>FARM2HOME / CART / CHECKOUT</span>

            <h1>Complete Your Order</h1>

            <p>
              Just a few details and your fresh farm products
              will be on their way!
            </p>
          </div>

          <form onSubmit={handlePlaceOrder}>
            <div className="checkout-layout">

              {/* LEFT: DELIVERY FORM */}
              <section className="checkout-form-card">

                <h2>Delivery Information</h2>

                <p className="checkout-section-description">
                  Where should we deliver your fresh products?
                </p>

                <div className="checkout-form-grid">

                  {/* Full Name */}
                  <div className="checkout-field full-width">
                    <label>Full Name *</label>

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />

                    {errors.fullName && (
                      <small>{errors.fullName}</small>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div className="checkout-field">
                    <label>Mobile Number *</label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      maxLength="10"
                    />

                    {errors.phone && (
                      <small>{errors.phone}</small>
                    )}
                  </div>

                  {/* Email */}
                  <div className="checkout-field">
                    <label>Email Address *</label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />

                    {errors.email && (
                      <small>{errors.email}</small>
                    )}
                  </div>

                  {/* House Number */}
                  <div className="checkout-field full-width">
                    <label>House / Flat Number *</label>

                    <input
                      type="text"
                      name="house"
                      value={formData.house}
                      onChange={handleChange}
                      placeholder="House number, apartment name"
                    />

                    {errors.house && (
                      <small>{errors.house}</small>
                    )}
                  </div>

                  {/* Street */}
                  <div className="checkout-field full-width">
                    <label>Street / Area *</label>

                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      placeholder="Enter street or area"
                    />

                    {errors.street && (
                      <small>{errors.street}</small>
                    )}
                  </div>

                  {/* City */}
                  <div className="checkout-field">
                    <label>City *</label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                    />

                    {errors.city && (
                      <small>{errors.city}</small>
                    )}
                  </div>

                  {/* State */}
                  <div className="checkout-field">
                    <label>State *</label>

                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Enter state"
                    />

                    {errors.state && (
                      <small>{errors.state}</small>
                    )}
                  </div>

                  {/* PIN Code */}
                  <div className="checkout-field full-width">
                    <label>PIN Code *</label>

                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="6-digit PIN code"
                      maxLength="6"
                    />

                    {errors.pincode && (
                      <small>{errors.pincode}</small>
                    )}
                  </div>

                  {/* Delivery Instructions */}
                  <div className="checkout-field full-width">
                    <label>
                      Delivery Instructions (Optional)
                    </label>

                    <textarea
                      name="instructions"
                      value={formData.instructions}
                      onChange={handleChange}
                      placeholder="Any special delivery instructions?"
                      rows="3"
                    />
                  </div>

                </div>

                {/* PAYMENT METHOD */}
                <div className="checkout-payment">

                  <h2>Payment Method</h2>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={
                        formData.paymentMethod === "Cash on Delivery"
                      }
                      onChange={handleChange}
                    />

                    <span>
                      <strong>Cash on Delivery</strong>

                      <small>
                        Pay when your order arrives.
                      </small>
                    </span>
                  </label>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="UPI"
                      checked={formData.paymentMethod === "UPI"}
                      onChange={handleChange}
                    />

                    <span>
                      <strong>UPI</strong>

                      <small>
                        Online payment integration will be added later.
                      </small>
                    </span>
                  </label>

                </div>

              </section>

              {/* RIGHT: ORDER SUMMARY */}
              <aside className="checkout-summary-card">

                <h2>Your Order</h2>

                <div className="checkout-summary-items">

                  {cartItems.map((item) => (
                    <div
                      className="checkout-summary-product"
                      key={item.id}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div>
                        <h3>{item.name}</h3>

                        <p>Qty: {item.quantity}</p>
                      </div>

                      <strong>
                        ₹{item.price * item.quantity}
                      </strong>
                    </div>
                  ))}

                </div>

                <div className="checkout-summary-divider"></div>

                <div className="checkout-summary-row">
                  <span>Total Items</span>
                  <strong>{cartCount}</strong>
                </div>

                <div className="checkout-summary-row">
                  <span>Subtotal</span>
                  <strong>₹{cartTotal}</strong>
                </div>

                <div className="checkout-summary-row">
                  <span>Delivery Charges</span>
                  <strong className="checkout-free">
                    FREE
                  </strong>
                </div>

                <div className="checkout-summary-divider"></div>

                <div className="checkout-grand-total">
                  <span>Total Amount</span>
                  <strong>₹{cartTotal}</strong>
                </div>

                <button
                  type="submit"
                  className="place-order-btn"
                >
                  Place Order · ₹{cartTotal}
                </button>

                <p className="checkout-secure-note">
                  Fresh products directly from local farmers.
                </p>

                <Link
                  to="/cart"
                  className="back-to-cart-link"
                >
                  ← Back to Cart
                </Link>

              </aside>

            </div>
          </form>

        </div>
      </main>
    </>
  );
}

export default Checkout;