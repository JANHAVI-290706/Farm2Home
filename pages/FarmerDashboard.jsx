import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  User,
  LogOut,
  Menu,
  X,
  Leaf,
  IndianRupee,
  TrendingUp,
  Clock,
  CheckCircle,
  Plus,
  Pencil,
  Trash2,
  Eye,
  ArrowRight,
  MapPin,
  Phone,
} from "lucide-react";

import Navbar from "../components/Navbar";
import "../styles/FarmerDashboard.css";

function FarmerDashboard() {
  const navigate = useNavigate();

  const initialFarmer = {
    name: "Green Valley Farm",
    owner: "Ravi Kumar",
    email: "greenvalley@example.com",
    phone: "9876543210",
    address: "Coimbatore, Tamil Nadu",
  };

  const [farmer, setFarmer] = useState(initialFarmer);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [products, setProducts] = useState([
    { id: 1, name: "Fresh Tomatoes", category: "Vegetables", price: 40, stock: 50, unit: "kg" },
    { id: 2, name: "Organic Carrots", category: "Vegetables", price: 60, stock: 30, unit: "kg" },
    { id: 3, name: "Fresh Spinach", category: "Vegetables", price: 25, stock: 40, unit: "bunch" },
    { id: 4, name: "Sweet Red Apples", category: "Fruits", price: 160, stock: 20, unit: "kg" },
  ]);

  const [orders, setOrders] = useState([
    { id: "F2H1001", customer: "Arun Kumar", product: "Fresh Tomatoes", quantity: 2, total: 80, status: "Pending" },
    { id: "F2H1002", customer: "Priya Sharma", product: "Organic Carrots", quantity: 3, total: 180, status: "Processing" },
    { id: "F2H1003", customer: "Rahul Das", product: "Fresh Spinach", quantity: 2, total: 50, status: "Delivered" },
  ]);

  const [productForm, setProductForm] = useState({
    name: "",
    category: "Vegetables",
    price: "",
    stock: "",
    unit: "kg",
  });

  const [editingProductId, setEditingProductId] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [message, setMessage] = useState("");

  const totalSales = orders
    .filter((order) => order.status === "Delivered")
    .reduce((sum, order) => sum + order.total, 0);

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "products", label: "My Products", icon: Package },
    { id: "orders", label: "Manage Orders", icon: ShoppingBag },
    { id: "profile", label: "My Profile", icon: User },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  const resetProductForm = () => {
    setProductForm({
      name: "",
      category: "Vegetables",
      price: "",
      stock: "",
      unit: "kg",
    });
    setEditingProductId(null);
    setShowProductForm(false);
  };

  const handleProductSubmit = (event) => {
    event.preventDefault();

    const productData = {
      ...productForm,
      price: Number(productForm.price),
      stock: Number(productForm.stock),
    };

    if (editingProductId !== null) {
      setProducts((current) =>
        current.map((product) =>
          product.id === editingProductId
            ? { ...product, ...productData }
            : product
        )
      );
      setMessage("Product updated successfully!");
    } else {
      setProducts((current) => [
        ...current,
        { id: Date.now(), ...productData },
      ]);
      setMessage("Product added successfully!");
    }

    resetProductForm();
  };

  const handleEditProduct = (product) => {
    setProductForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      unit: product.unit,
    });

    setEditingProductId(product.id);
    setShowProductForm(true);
    setMessage("");
  };

  const handleDeleteProduct = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    setProducts((current) =>
      current.filter((product) => product.id !== id)
    );

    setMessage("Product deleted successfully!");
  };

  const handleOrderStatus = (id, status) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return (
          <section className="farmer-card">
            <div className="farmer-section-heading">
              <div>
                <h2>My Products</h2>
                <p>Manage your farm products and inventory.</p>
              </div>

              <button
                className="farmer-primary-btn"
                onClick={() => {
                  resetProductForm();
                  setShowProductForm(true);
                  setMessage("");
                }}
              >
                <Plus size={17} /> Add Product
              </button>
            </div>

            {message && (
              <div className="farmer-success-message">{message}</div>
            )}

            {showProductForm && (
              <form
                className="farmer-product-form"
                onSubmit={handleProductSubmit}
              >
                <h3>
                  {editingProductId ? "Edit Product" : "Add New Product"}
                </h3>

                <div className="farmer-form-grid">
                  <label>
                    Product Name
                    <input
                      value={productForm.name}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </label>

                  <label>
                    Category
                    <select
                      value={productForm.category}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          category: e.target.value,
                        })
                      }
                    >
                      <option>Vegetables</option>
                      <option>Fruits</option>
                      <option>Dairy</option>
                      <option>Grains</option>
                      <option>Other</option>
                    </select>
                  </label>

                  <label>
                    Price (₹)
                    <input
                      type="number"
                      min="1"
                      value={productForm.price}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          price: e.target.value,
                        })
                      }
                      required
                    />
                  </label>

                  <label>
                    Stock Quantity
                    <input
                      type="number"
                      min="0"
                      value={productForm.stock}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          stock: e.target.value,
                        })
                      }
                      required
                    />
                  </label>

                  <label>
                    Unit
                    <select
                      value={productForm.unit}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          unit: e.target.value,
                        })
                      }
                    >
                      <option value="kg">Kilogram</option>
                      <option value="bunch">Bunch</option>
                      <option value="litre">Litre</option>
                      <option value="dozen">Dozen</option>
                      <option value="box">Box</option>
                    </select>
                  </label>
                </div>

                <div className="farmer-form-actions">
                  <button type="submit" className="farmer-primary-btn">
                    {editingProductId ? "Save Changes" : "Add Product"}
                  </button>

                  <button
                    type="button"
                    className="farmer-cancel-btn"
                    onClick={resetProductForm}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="farmer-product-list">
              {products.length === 0 ? (
                <p className="farmer-empty">No products added yet.</p>
              ) : (
                products.map((product) => (
                  <div className="farmer-product-row" key={product.id}>
                    <div className="farmer-product-icon">
                      <Leaf size={23} />
                    </div>

                    <div className="farmer-product-info">
                      <h3>{product.name}</h3>
                      <p>{product.category}</p>
                      <p>₹{product.price}/{product.unit}</p>
                    </div>

                    <div className="farmer-product-stock">
                      <span>Stock</span>
                      <strong>{product.stock} {product.unit}</strong>
                    </div>

                    <div className="farmer-product-actions">
                      <button
                        onClick={() => handleEditProduct(product)}
                        aria-label="Edit product"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        className="farmer-delete-btn"
                        onClick={() => handleDeleteProduct(product.id)}
                        aria-label="Delete product"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        );

      case "orders":
        return (
          <section className="farmer-card">
            <div className="farmer-section-heading">
              <div>
                <h2>Manage Orders</h2>
                <p>View customer purchases and update order status.</p>
              </div>
            </div>

            <div className="farmer-order-list">
              {orders.map((order) => (
                <div className="farmer-order-row" key={order.id}>
                  <div>
                    <h3>Order #{order.id}</h3>
                    <p>Customer: {order.customer}</p>
                    <p>{order.product} × {order.quantity}</p>
                    <strong>₹{order.total}</strong>
                  </div>

                  <div className="farmer-order-actions">
                    <span className={`farmer-status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>

                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleOrderStatus(order.id, e.target.value)
                      }
                      aria-label={`Update status for order ${order.id}`}
                    >
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case "profile":
        return (
          <section className="farmer-card">
            <div className="farmer-section-heading">
              <div>
                <h2>Farmer Profile</h2>
                <p>Manage your farm and contact details.</p>
              </div>

              {!isEditingProfile && (
                <button
                  className="farmer-primary-btn"
                  onClick={() => setIsEditingProfile(true)}
                >
                  <Pencil size={16} /> Edit Profile
                </button>
              )}
            </div>

            {message && (
              <div className="farmer-success-message">{message}</div>
            )}

            <form
              className="farmer-profile-form"
              onSubmit={(e) => {
                e.preventDefault();
                setIsEditingProfile(false);
                setMessage("Farmer profile updated successfully!");
              }}
            >
              {[
                ["name", "Farm Name"],
                ["owner", "Owner Name"],
                ["email", "Email Address"],
                ["phone", "Phone Number"],
                ["address", "Farm Address"],
              ].map(([field, label]) => (
                <label key={field}>
                  {label}
                  <input
                    type="text"
                    value={farmer[field]}
                    disabled={!isEditingProfile}
                    onChange={(e) =>
                      setFarmer({
                        ...farmer,
                        [field]: e.target.value,
                      })
                    }
                    required
                  />
                </label>
              ))}

              {isEditingProfile && (
                <div className="farmer-form-actions">
                  <button type="submit" className="farmer-primary-btn">
                    Save Changes
                  </button>

                  <button
                    type="button"
                    className="farmer-cancel-btn"
                    onClick={() => {
                      setFarmer(initialFarmer);
                      setIsEditingProfile(false);
                      setMessage("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </section>
        );

      default:
        return (
          <>
            <div className="farmer-welcome">
              <div>
                <h1>Welcome, {farmer.name}!</h1>
                <p>Manage your farm and grow your business with FARM2HOME.</p>
              </div>

              <button
                className="farmer-primary-btn"
                onClick={() => setActiveTab("products")}
              >
                Manage Products <ArrowRight size={17} />
              </button>
            </div>

            <div className="farmer-stats">
              <div className="farmer-stat-card">
                <div className="farmer-stat-icon green">
                  <IndianRupee />
                </div>
                <div>
                  <p>Delivered Sales</p>
                  <h2>₹{totalSales}</h2>
                </div>
              </div>

              <div className="farmer-stat-card">
                <div className="farmer-stat-icon orange">
                  <ShoppingBag />
                </div>
                <div>
                  <p>Total Orders</p>
                  <h2>{orders.length}</h2>
                </div>
              </div>

              <div className="farmer-stat-card">
                <div className="farmer-stat-icon blue">
                  <Package />
                </div>
                <div>
                  <p>Total Products</p>
                  <h2>{products.length}</h2>
                </div>
              </div>

              <div className="farmer-stat-card">
                <div className="farmer-stat-icon purple">
                  <Clock />
                </div>
                <div>
                  <p>Pending Orders</p>
                  <h2>{pendingOrders}</h2>
                </div>
              </div>
            </div>

            <section className="farmer-card">
              <div className="farmer-section-heading">
                <div>
                  <h2>Recent Orders</h2>
                  <p>Latest orders received from customers.</p>
                </div>

                <button onClick={() => setActiveTab("orders")}>
                  View All <ArrowRight size={16} />
                </button>
              </div>

              {orders.slice(0, 3).map((order) => (
                <div className="farmer-order-row" key={order.id}>
                  <div>
                    <h3>Order #{order.id}</h3>
                    <p>{order.customer} · {order.product}</p>
                    <strong>₹{order.total}</strong>
                  </div>

                  <span className={`farmer-status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </section>
          </>
        );
    }
  };

  return (
    <>
      <Navbar />

      <div className="farmer-dashboard">
        <button
          className="farmer-mobile-menu"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle farmer menu"
        >
          {sidebarOpen ? <X /> : <Menu />}
        </button>

        <aside className={`farmer-sidebar ${sidebarOpen ? "show" : ""}`}>
          <div className="farmer-brand">
            <Leaf size={25} />
            <span>Farmer Panel</span>
          </div>

          <div className="farmer-user">
            <div className="farmer-avatar">
              {farmer.name.charAt(0)}
            </div>
            <div>
              <h3>{farmer.name}</h3>
              <p>Farmer Account</p>
            </div>
          </div>

          <nav className="farmer-menu">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  className={activeTab === item.id ? "active" : ""}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                    setMessage("");
                  }}
                >
                  <Icon size={19} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <button className="farmer-logout" onClick={handleLogout}>
            <LogOut size={19} />
            Logout
          </button>
        </aside>

        <main className="farmer-main">
          {renderContent()}
        </main>
      </div>
    </>
  );
}

export default FarmerDashboard;
