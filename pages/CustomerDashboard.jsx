import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  User,
  ShoppingBag,
  MapPin,
  LogOut,
  Package,
  Clock,
  CheckCircle,
  Menu,
  X,
  Leaf,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  Pencil,
} from "lucide-react";

import Navbar from "../components/Navbar";
import "../styles/CustomerDashboard.css";

function CustomerDashboard() {
  const navigate = useNavigate();

  const initialCustomer = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    address: "Chennai, Tamil Nadu",
    pincode: "600001",
  };

  const [customer, setCustomer] = useState(initialCustomer);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [profileMessage, setProfileMessage] = useState("");
  const [addressMessage, setAddressMessage] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);

  // Temporary demonstration orders
  const [orders] = useState([
    {
      id: "F2H1001",
      date: "10 November 2026",
      items: [
        { name: "Fresh Tomatoes", quantity: 1, price: 40 },
        { name: "Organic Carrots", quantity: 1, price: 60 },
      ],
      total: 100,
      status: "Delivered",
      payment: "Cash on Delivery",
    },
    {
      id: "F2H1002",
      date: "8 November 2026",
      items: [
        { name: "Sweet Red Apples", quantity: 1, price: 160 },
        { name: "Fresh Bananas", quantity: 1, price: 50 },
      ],
      total: 210,
      status: "Processing",
      payment: "UPI",
    },
    {
      id: "F2H1003",
      date: "5 November 2026",
      items: [
        { name: "Farm Fresh Milk", quantity: 1, price: 35 },
        { name: "Farm Fresh Eggs", quantity: 1, price: 90 },
      ],
      total: 125,
      status: "Delivered",
      payment: "Cash on Delivery",
    },
  ]);

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "Processing"
  ).length;

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "profile", label: "My Profile", icon: User },
    { id: "orders", label: "My Orders", icon: ShoppingBag },
    { id: "address", label: "My Address", icon: MapPin },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  const handleOpenOrder = (order) => {
    setSelectedOrder(order);
    setActiveTab("order-details");
    setSidebarOpen(false);
  };

  const handleProfileSave = (event) => {
    event.preventDefault();
    setIsEditingProfile(false);
    setProfileMessage("Profile updated successfully!");
  };

  const handleAddressSave = (event) => {
    event.preventDefault();
    setIsEditingAddress(false);
    setAddressMessage("Delivery address updated successfully!");
  };

  const renderOrderCard = (order) => (
    <div className="customer-order" key={order.id}>
      <div className="order-info">
        <h3>Order #{order.id}</h3>
        <p>{order.date}</p>
        <p>
          {order.items.map((item) => item.name).join(", ")}
        </p>
      </div>

      <div className="order-right">
        <strong>₹{order.total}</strong>

        <span className={`order-status ${order.status.toLowerCase()}`}>
          {order.status}
        </span>

        <button
          className="view-order-btn"
          onClick={() => handleOpenOrder(order)}
        >
          View Details
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <section className="customer-card">
            <div className="customer-page-heading">
              <div>
                <h2>My Profile</h2>
                <p>Manage your personal account information.</p>
              </div>

              {!isEditingProfile && (
                <button
                  className="edit-profile-btn"
                  onClick={() => {
                    setProfileMessage("");
                    setIsEditingProfile(true);
                  }}
                >
                  <Pencil size={16} />
                  Edit Profile
                </button>
              )}
            </div>

            {profileMessage && (
              <div className="profile-success-message">
                {profileMessage}
              </div>
            )}

            <form
              className="profile-edit-form"
              onSubmit={handleProfileSave}
            >
              <div className="profile-field">
                <label>Full Name</label>
                <input
                  type="text"
                  value={customer.name}
                  disabled={!isEditingProfile}
                  onChange={(e) =>
                    setCustomer({ ...customer, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="profile-field">
                <label>Email Address</label>
                <input
                  type="email"
                  value={customer.email}
                  disabled={!isEditingProfile}
                  onChange={(e) =>
                    setCustomer({ ...customer, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="profile-field">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={customer.phone}
                  disabled={!isEditingProfile}
                  onChange={(e) =>
                    setCustomer({ ...customer, phone: e.target.value })
                  }
                  required
                />
              </div>

              {isEditingProfile && (
                <div className="profile-edit-actions">
                  <button type="submit" className="save-profile-btn">
                    Save Changes
                  </button>

                  <button
                    type="button"
                    className="cancel-profile-btn"
                    onClick={() => {
                      setCustomer((current) => ({
                        ...current,
                        name: initialCustomer.name,
                        email: initialCustomer.email,
                        phone: initialCustomer.phone,
                      }));
                      setIsEditingProfile(false);
                      setProfileMessage("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </section>
        );

      case "address":
        return (
          <section className="customer-card">
            <div className="customer-page-heading">
              <div>
                <h2>My Address</h2>
                <p>Manage your saved delivery address.</p>
              </div>

              {!isEditingAddress && (
                <button
                  className="edit-profile-btn"
                  onClick={() => {
                    setAddressMessage("");
                    setIsEditingAddress(true);
                  }}
                >
                  <Pencil size={16} />
                  Edit Address
                </button>
              )}
            </div>

            {addressMessage && (
              <div className="profile-success-message">
                {addressMessage}
              </div>
            )}

            <form
              className="profile-edit-form"
              onSubmit={handleAddressSave}
            >
              <div className="profile-field">
                <label>Delivery Address</label>
                <input
                  type="text"
                  value={customer.address}
                  disabled={!isEditingAddress}
                  onChange={(e) =>
                    setCustomer({ ...customer, address: e.target.value })
                  }
                  required
                />
              </div>

              <div className="profile-field">
                <label>PIN Code</label>
                <input
                  type="text"
                  maxLength="6"
                  pattern="[0-9]{6}"
                  value={customer.pincode}
                  disabled={!isEditingAddress}
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      pincode: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  required
                />
              </div>

              <div className="profile-field">
                <label>Contact Number</label>
                <input
                  type="tel"
                  value={customer.phone}
                  disabled={!isEditingAddress}
                  onChange={(e) =>
                    setCustomer({ ...customer, phone: e.target.value })
                  }
                  required
                />
              </div>

              {isEditingAddress && (
                <div className="profile-edit-actions">
                  <button type="submit" className="save-profile-btn">
                    Save Address
                  </button>

                  <button
                    type="button"
                    className="cancel-profile-btn"
                    onClick={() => {
                      setCustomer((current) => ({
                        ...current,
                        address: initialCustomer.address,
                        pincode: initialCustomer.pincode,
                        phone: initialCustomer.phone,
                      }));
                      setIsEditingAddress(false);
                      setAddressMessage("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </section>
        );

      case "orders":
        return (
          <section className="customer-card">
            <div className="customer-page-heading">
              <h2>My Orders</h2>
              <p>View and track your previous purchases.</p>
            </div>

            <div className="customer-orders">
              {orders.length ? (
                orders.map(renderOrderCard)
              ) : (
                <div className="empty-orders">
                  <ShoppingBag size={45} />
                  <h3>No Orders Yet</h3>
                  <p>Your purchases will appear here.</p>
                  <Link to="/shop" className="customer-shop-btn">
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          </section>
        );

      case "order-details":
        return (
          <section className="customer-card">
            <button
              className="back-orders-btn"
              onClick={() => setActiveTab("orders")}
            >
              <ArrowLeft size={17} />
              Back to My Orders
            </button>

            {selectedOrder && (
              <>
                <div className="order-detail-header">
                  <div>
                    <h2>Order Details</h2>
                    <p>Order #{selectedOrder.id}</p>
                    <p>{selectedOrder.date}</p>
                  </div>

                  <span className={`order-status ${selectedOrder.status.toLowerCase()}`}>
                    {selectedOrder.status}
                  </span>
                </div>

                <div className="order-detail-section">
                  <h3>
                    <Package size={19} />
                    Products Ordered
                  </h3>

                  {selectedOrder.items.map((item, index) => (
                    <div className="detail-product" key={index}>
                      <div>
                        <h4>{item.name}</h4>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                      <strong>₹{item.price * item.quantity}</strong>
                    </div>
                  ))}
                </div>

                <div className="order-detail-section">
                  <h3>
                    <MapPin size={19} />
                    Delivery Information
                  </h3>
                  <p>{customer.name}</p>
                  <p>{customer.address}</p>
                  <p>PIN Code: {customer.pincode}</p>
                  <p>Phone: {customer.phone}</p>
                </div>

                <div className="order-detail-section">
                  <h3>
                    <CreditCard size={19} />
                    Payment Information
                  </h3>
                  <p>Payment Method: {selectedOrder.payment}</p>
                </div>

                <div className="order-detail-total">
                  <span>Total Amount</span>
                  <strong>₹{selectedOrder.total}</strong>
                </div>
              </>
            )}
          </section>
        );

      default:
        return (
          <>
            <div className="customer-welcome">
              <div>
                <h1>Welcome back, {customer.name}!</h1>
                <p>
                  Here's what's happening with your FARM2HOME account.
                </p>
              </div>

              <Link to="/shop" className="customer-shop-btn">
                Continue Shopping
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="customer-stats">
              <div className="customer-stat-card">
                <div className="stat-icon blue"><Package /></div>
                <div>
                  <p>Total Orders</p>
                  <h2>{orders.length}</h2>
                </div>
              </div>

              <div className="customer-stat-card">
                <div className="stat-icon orange"><Clock /></div>
                <div>
                  <p>Processing</p>
                  <h2>{processingOrders}</h2>
                </div>
              </div>

              <div className="customer-stat-card">
                <div className="stat-icon green"><CheckCircle /></div>
                <div>
                  <p>Delivered</p>
                  <h2>{deliveredOrders}</h2>
                </div>
              </div>
            </div>

            <section className="customer-card">
              <div className="customer-section-heading">
                <div>
                  <h2>Recent Orders</h2>
                  <p>Check the status of your recent purchases.</p>
                </div>

                <button onClick={() => setActiveTab("orders")}>
                  View All <ArrowRight size={16} />
                </button>
              </div>

              <div className="customer-orders">
                {orders.slice(0, 2).map(renderOrderCard)}
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <>
      <Navbar />

      <div className="customer-dashboard">
        <button
          className="customer-mobile-menu"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle dashboard menu"
        >
          {sidebarOpen ? <X /> : <Menu />}
        </button>

        <aside className={`customer-sidebar ${sidebarOpen ? "show" : ""}`}>
          <div className="customer-sidebar-brand">
            <Leaf size={25} />
            <span>My Account</span>
          </div>

          <div className="customer-user">
            <div className="customer-avatar">
              {customer.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3>{customer.name}</h3>
              <p>Customer</p>
            </div>
          </div>

          <nav className="customer-menu">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  className={
                    activeTab === item.id ||
                    (activeTab === "order-details" && item.id === "orders")
                      ? "active"
                      : ""
                  }
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                >
                  <Icon size={19} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <button className="customer-logout" onClick={handleLogout}>
            <LogOut size={19} />
            Logout
          </button>
        </aside>

        <main className="customer-main">
          {renderContent()}
        </main>
      </div>
    </>
  );
}

export default CustomerDashboard;
