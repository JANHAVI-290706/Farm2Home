import { Link, useNavigate } from "react-router-dom";
import { Leaf, Search, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/home" className="navbar-logo">
        <Leaf className="logo-leaf" />
        <span>FARM2HOME</span>
      </Link>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/farmers">Farmers</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* Right Side */}
      <div className="nav-actions">
        <div className="search-box">
          <Search size={14} />
          <input
            type="text"
            placeholder="Search for fresh products..."
          />
        </div>

        {/* Cart Button */}
        <button
          className="cart-btn"
          onClick={() => navigate("/cart")}
          aria-label="Open shopping cart"
        >
          <ShoppingCart size={20} />
          <span className="cart-count">{cartCount}</span>
        </button>

        <Link to="/login" className="login-btn">
          Login
        </Link>

        <Link to="/signup" className="signup-btn">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;