import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircle, Package, ShoppingBag, MapPin } from "lucide-react";
import Navbar from "../components/Navbar";
import "../styles/OrderSuccess.css";

function OrderSuccess() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder = sessionStorage.getItem("farm2home_current_order");

    if (savedOrder) {
      try {
        setOrder(JSON.parse(savedOrder));
      } catch {
        navigate("/home", { replace: true });
      }
    } else {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  if (!order) {
    return null;
  }

  const customer = order.customer;

  return (
    <>
      <Navbar />

      <main className="order-success-page">
        <div className="order-success-container">

          {/* Success Message */}
          <div className="success-header">
            <div className="success-icon">
              <CheckCircle size={65} />
            </div>

            <h1>Order Placed Successfully!</h1>

            <p>
              Thank you for shopping with FARM2HOME.
              Your fresh farm products are on their way!
            </p>

            <div className="order-id-box">
              <span>Order ID</span>
              <strong>{order.orderId}</strong>
            </div>
          </div>

          {/* Order Details */}
          <div className="success-details-grid">

            {/* Delivery Information */}
            <section className="success-card">
              <div className="success-card-heading">
                <MapPin size={21} />
                <h2>Delivery Address</h2>
              </div>

              <div className="success-address">
                <strong>{customer.fullName}</strong>
                <p>{customer.house}, {customer.street}</p>
                <p>
                  {customer.city}, {customer.state} - {customer.pincode}
                </p>
                <p>Mobile: {customer.phone}</p>
                <p>Email: {customer.email}</p>

                {customer.instructions && (
                  <p>
                    <strong>Instructions:</strong> {customer.instructions}
                  </p>
                )}
              </div>
            </section>

            {/* Payment Information */}
            <section className="success-card">
              <div className="success-card-heading">
                <Package size={21} />
                <h2>Order Information</h2>
              </div>

              <div className="success-info-row">
                <span>Order Date</span>
                <strong>{order.date}</strong>
              </div>

              <div className="success-info-row">
                <span>Payment Method</span>
                <strong>{customer.paymentMethod}</strong>
              </div>

              <div className="success-info-row">
                <span>Order Status</span>
                <strong className="order-confirmed">Confirmed</strong>
              </div>
            </section>
          </div>

          {/* Products */}
          <section className="success-card success-products-card">
            <div className="success-card-heading">
              <ShoppingBag size={21} />
              <h2>Ordered Products</h2>
            </div>

            <div className="success-products-list">
              {order.items.map((item) => (
                <div className="success-product" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="success-product-info">
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                  </div>

                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>
                </div>
              ))}
            </div>

            <div className="success-total">
              <span>Total Amount Paid / Payable</span>
              <strong>₹{order.total}</strong>
            </div>
          </section>

          {/* Footer Message */}
          <div className="success-footer">
            <div>
              <CheckCircle size={19} />
              <span>Your order has been confirmed successfully.</span>
            </div>

            <p>
              Thank you for supporting local farmers.
              Freshness delivered from farm to home!
            </p>

            <Link to="/shop" className="success-shop-button">
              Continue Shopping
            </Link>

            <Link to="/home" className="success-home-link">
              Back to Home
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}

export default OrderSuccess;