import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingBag,
  IndianRupee,
  UserCircle,
  Menu,
  X,
  Search,
  Trash2,
  LogOut,
  Leaf,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import "../styles/AdminDashboard.css";

const initialUsers = [
  { id: 1, name: "Arun Kumar", email: "arun@example.com", role: "Customer", status: "Active" },
  { id: 2, name: "Priya Sharma", email: "priya@example.com", role: "Customer", status: "Active" },
  { id: 3, name: "Ravi Kumar", email: "ravi@example.com", role: "Farmer", status: "Active" },
  { id: 4, name: "Green Valley Farm", email: "greenvalley@example.com", role: "Farmer", status: "Active" },
  { id: 5, name: "Rahul Das", email: "rahul@example.com", role: "Customer", status: "Active" },
];

const initialProducts = [
  { id: 1, name: "Fresh Tomatoes", category: "Vegetables", farmer: "Green Valley Farm", price: 40, stock: 50 },
  { id: 2, name: "Organic Carrots", category: "Vegetables", farmer: "Sunrise Organics", price: 60, stock: 30 },
  { id: 3, name: "Fresh Spinach", category: "Vegetables", farmer: "Green Valley Farm", price: 25, stock: 40 },
  { id: 4, name: "Sweet Red Apples", category: "Fruits", farmer: "Hilltop Orchards", price: 160, stock: 20 },
  { id: 5, name: "Farm Fresh Milk", category: "Dairy", farmer: "Happy Cow Dairy", price: 35, stock: 25 },
];

const initialOrders = [
  { id: "F2H1001", customer: "Arun Kumar", product: "Fresh Tomatoes", total: 80, status: "Delivered" },
  { id: "F2H1002", customer: "Priya Sharma", product: "Organic Carrots", total: 180, status: "Processing" },
  { id: "F2H1003", customer: "Rahul Das", product: "Fresh Spinach", total: 50, status: "Pending" },
  { id: "F2H1004", customer: "Meena Rao", product: "Sweet Red Apples", total: 320, status: "Cancelled" },
];

function AdminDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState(initialUsers);
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [adminName, setAdminName] = useState("Farm2Home Admin");
  const [adminEmail, setAdminEmail] = useState("admin@farm2home.com");
  const [editingProfile, setEditingProfile] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  const totalRevenue = orders
    .filter((order) => order.status === "Delivered")
    .reduce((sum, order) => sum + order.total, 0);

  const customerCount = users.filter((user) => user.role === "Customer").length;
  const farmerCount = users.filter((user) => user.role === "Farmer").length;

  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        `${user.name} ${user.email} ${user.role}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ),
    [users, searchTerm]
  );

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        `${product.name} ${product.category} ${product.farmer}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ),
    [products, searchTerm]
  );

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) =>
        `${order.id} ${order.customer} ${order.product} ${order.status}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ),
    [orders, searchTerm]
  );

  const changeTab = (tab) => {
    setActiveTab(tab);
    setSearchTerm("");
    setSidebarOpen(false);
  };

  const handleUserStatus = (id) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Active" ? "Blocked" : "Active" }
          : user
      )
    );
  };

  const handleDeleteProduct = (id) => {
    if (!window.confirm("Are you sure you want to remove this product?")) return;
    setProducts((current) => current.filter((product) => product.id !== id));
  };

  const handleOrderStatus = (id, status) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  const saveProfile = (event) => {
    event.preventDefault();
    setEditingProfile(false);
    setSavedMessage("Admin profile updated successfully.");
    setTimeout(() => setSavedMessage(""), 3000);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const navigationItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "users", label: "Manage Users", icon: Users },
    { id: "products", label: "Manage Products", icon: Package },
    { id: "orders", label: "Manage Orders", icon: ShoppingBag },
    { id: "profile", label: "Admin Profile", icon: UserCircle },
  ];

  return (
    <div className="admin-dashboard-page">
      <Navbar />

      <div className="admin-dashboard">
        {sidebarOpen && (
          <button
            className="admin-sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          />
        )}

        <aside className={`admin-sidebar ${sidebarOpen ? "admin-sidebar-open" : ""}`}>
          <div className="admin-sidebar-heading">
            <div className="admin-logo">
              <Leaf size={25} />
            </div>
            <div>
              <h2>Farm2Home</h2>
              <p>Admin Panel</p>
            </div>
            <button
              className="admin-close-sidebar"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <div className="admin-sidebar-links">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`admin-nav-link ${activeTab === item.id ? "active" : ""}`}
                  onClick={() => changeTab(item.id)}
                >
                  <Icon size={19} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <button className="admin-logout-button" onClick={handleLogout}>
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </aside>

        <main className="admin-main-content">
          <header className="admin-topbar">
            <div className="admin-topbar-left">
              <button
                className="admin-menu-button"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
              <div>
                <p className="admin-topbar-label">Welcome back,</p>
                <h1>{adminName}</h1>
              </div>
            </div>
            <div className="admin-topbar-badge">
              <UserCircle size={22} />
              <span>Administrator</span>
            </div>
          </header>

          {activeTab !== "overview" && activeTab !== "profile" && (
            <div className="admin-search-box">
              <Search size={19} />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          )}

          {activeTab === "overview" && (
            <section className="admin-section">
              <div className="admin-section-heading">
                <div>
                  <h2>Dashboard Overview</h2>
                  <p>Monitor your Farm2Home platform activity.</p>
                </div>
              </div>

              <div className="admin-stats-grid">
                <div className="admin-stat-card">
                  <div className="admin-stat-icon green"><Users size={23} /></div>
                  <p>Total Users</p>
                  <h3>{users.length}</h3>
                  <span>{customerCount} customers · {farmerCount} farmers</span>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-icon orange"><Package size={23} /></div>
                  <p>Total Products</p>
                  <h3>{products.length}</h3>
                  <span>Listed products</span>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-icon blue"><ShoppingBag size={23} /></div>
                  <p>Total Orders</p>
                  <h3>{orders.length}</h3>
                  <span>{orders.filter((order) => order.status === "Pending").length} pending orders</span>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-icon purple"><IndianRupee size={23} /></div>
                  <p>Delivered Revenue</p>
                  <h3>₹{totalRevenue.toLocaleString("en-IN")}</h3>
                  <span><TrendingUp size={14} /> From delivered orders</span>
                </div>
              </div>

              <div className="admin-overview-grid">
                <div className="admin-panel">
                  <div className="admin-panel-heading">
                    <h3>Recent Orders</h3>
                    <button onClick={() => changeTab("orders")}>View all</button>
                  </div>
                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 4).map((order) => (
                          <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customer}</td>
                            <td>₹{order.total}</td>
                            <td><span className={`admin-status ${order.status.toLowerCase()}`}>{order.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="admin-panel admin-quick-panel">
                  <h3>Quick Management</h3>
                  <p>Open a section to manage your platform.</p>
                  <button onClick={() => changeTab("users")}><Users size={18} /> Manage Users</button>
                  <button onClick={() => changeTab("products")}><Package size={18} /> Manage Products</button>
                  <button onClick={() => changeTab("orders")}><ShoppingBag size={18} /> Manage Orders</button>
                </div>
              </div>
            </section>
          )}

          {activeTab === "users" && (
            <section className="admin-section">
              <div className="admin-section-heading">
                <div>
                  <h2>Manage Users</h2>
                  <p>View customer and farmer accounts and manage their access.</p>
                </div>
                <span className="admin-count-label">{filteredUsers.length} users</span>
              </div>

              <div className="admin-panel">
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="admin-person-cell">{user.name}</td>
                          <td>{user.email}</td>
                          <td><span className={`admin-role ${user.role.toLowerCase()}`}>{user.role}</span></td>
                          <td><span className={`admin-status ${user.status.toLowerCase()}`}>{user.status}</span></td>
                          <td>
                            <button
                              className={`admin-action-button ${user.status === "Active" ? "block" : "activate"}`}
                              onClick={() => handleUserStatus(user.id)}
                            >
                              {user.status === "Active" ? "Block" : "Activate"}
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredUsers.length === 0 && (
                        <tr><td colSpan="5" className="admin-empty">No users found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {activeTab === "products" && (
            <section className="admin-section">
              <div className="admin-section-heading">
                <div>
                  <h2>Manage Products</h2>
                  <p>Review products listed by farmers on the platform.</p>
                </div>
                <span className="admin-count-label">{filteredProducts.length} products</span>
              </div>

              <div className="admin-panel">
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Farmer</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id}>
                          <td className="admin-person-cell">{product.name}</td>
                          <td>{product.category}</td>
                          <td>{product.farmer}</td>
                          <td>₹{product.price}</td>
                          <td>{product.stock}</td>
                          <td>
                            <button
                              className="admin-delete-button"
                              onClick={() => handleDeleteProduct(product.id)}
                              aria-label={`Delete ${product.name}`}
                            >
                              <Trash2 size={17} /> Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredProducts.length === 0 && (
                        <tr><td colSpan="6" className="admin-empty">No products found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {activeTab === "orders" && (
            <section className="admin-section">
              <div className="admin-section-heading">
                <div>
                  <h2>Manage Orders</h2>
                  <p>Track orders and update their fulfilment status.</p>
                </div>
                <span className="admin-count-label">{filteredOrders.length} orders</span>
              </div>

              <div className="admin-panel">
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Update Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="admin-person-cell">{order.id}</td>
                          <td>{order.customer}</td>
                          <td>{order.product}</td>
                          <td>₹{order.total}</td>
                          <td><span className={`admin-status ${order.status.toLowerCase()}`}>{order.status}</span></td>
                          <td>
                            <select
                              className="admin-status-select"
                              value={order.status}
                              onChange={(event) => handleOrderStatus(order.id, event.target.value)}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                      {filteredOrders.length === 0 && (
                        <tr><td colSpan="6" className="admin-empty">No orders found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {activeTab === "profile" && (
            <section className="admin-section">
              <div className="admin-section-heading">
                <div>
                  <h2>Admin Profile</h2>
                  <p>View and update administrator account details.</p>
                </div>
              </div>

              <div className="admin-profile-card">
                <div className="admin-profile-avatar"><UserCircle size={54} /></div>
                {savedMessage && <p className="admin-success-message">{savedMessage}</p>}

                {editingProfile ? (
                  <form className="admin-profile-form" onSubmit={saveProfile}>
                    <label>
                      Admin Name
                      <input value={adminName} onChange={(event) => setAdminName(event.target.value)} required />
                    </label>
                    <label>
                      Email Address
                      <input type="email" value={adminEmail} onChange={(event) => setAdminEmail(event.target.value)} required />
                    </label>
                    <div className="admin-profile-actions">
                      <button type="submit" className="admin-save-button">Save Changes</button>
                      <button
                        type="button"
                        className="admin-cancel-button"
                        onClick={() => {
                          setAdminName("Farm2Home Admin");
                          setAdminEmail("admin@farm2home.com");
                          setEditingProfile(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="admin-profile-details">
                    <h3>{adminName}</h3>
                    <p>{adminEmail}</p>
                    <span>Administrator</span>
                    <button className="admin-save-button" onClick={() => setEditingProfile(true)}>Edit Profile</button>
                  </div>
                )}
              </div>
            </section>
          )}

          <footer className="admin-footer">
            <p>© 2026 Farm2Home. Admin Dashboard.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
