import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  Leaf,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Star,
} from "lucide-react";

import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import "../styles/Shop.css";

const categories = [
  "All Products",
  "Vegetables",
  "Fruits",
  "Dairy",
];

function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] =
    useState("All Products");

  const [sortOrder, setSortOrder] = useState("featured");

  const { addToCart, cartItems, cartCount } = useCart();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        activeCategory === "All Products" ||
        product.category === activeCategory;

      const search = searchTerm.trim().toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search) ||
        product.farmer.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });

    if (sortOrder === "price-low") {
      result = [...result].sort(
        (a, b) => a.price - b.price
      );
    } else if (sortOrder === "price-high") {
      result = [...result].sort(
        (a, b) => b.price - a.price
      );
    } else if (sortOrder === "name") {
      result = [...result].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return result;
  }, [searchTerm, activeCategory, sortOrder]);

  // Get quantity of a product already in cart
  const getProductQuantity = (productId) => {
    const cartProduct = cartItems.find(
      (item) => item.id === productId
    );

    return cartProduct ? cartProduct.quantity : 0;
  };

  // Clear filters
  function clearFilters() {
    setSearchTerm("");
    setActiveCategory("All Products");
    setSortOrder("featured");
  }

  return (
    <div className="shop-page">

      {/* ================= NAVBAR ================= */}

      <header className="navbar">

        {/* Logo */}
        <Link to="/home" className="navbar-logo">
          <span className="logo-leaf">
            <Leaf size={28} />
          </span>

          <span>FARM2HOME</span>
        </Link>

        {/* Navigation */}
        <nav className="nav-links">
          <Link to="/home">Home</Link>

          <Link to="/shop" className="active">
            Shop
          </Link>

          <a href="#farmers">Farmers</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Navbar Actions */}
        <div className="nav-actions">

          {/* Search */}
          <label className="search-box">
            <Search size={17} />

            <input
              type="search"
              placeholder="Search for fresh products..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />
          </label>

          {/* Cart */}
          <Link
            to="/cart"
            className="cart-btn"
            aria-label="Shopping cart"
          >
            <ShoppingCart size={23} />

            <span className="cart-count">
              {cartCount}
            </span>
          </Link>

          {/* Login */}
          <Link to="/login" className="login-btn">
            Login
          </Link>

          {/* Sign Up */}
          <Link to="/signup" className="signup-btn">
            Sign Up
          </Link>

        </div>
      </header>

      {/* ================= HERO SECTION ================= */}

      <main>

        <section className="shop-hero">

          <div className="shop-hero-content">

            <span className="shop-eyebrow">
              <Leaf size={16} />
              FRESH FROM LOCAL FARMS
            </span>

            <h1>
              Good Food.
              <br />
              <span>Grown with Care.</span>
            </h1>

            <p>
              Discover fresh, quality produce from local farmers.
              Naturally grown, carefully selected, and delivered
              with care.
            </p>

            <a
              href="#products"
              className="shop-hero-button"
            >
              Explore Products
            </a>

          </div>

        </section>

        {/* ================= PRODUCTS SECTION ================= */}

        <section
          className="shop-content"
          id="products"
        >

          {/* Section Heading */}
          <div className="shop-section-heading">

            <div>

              <span className="shop-section-label">
                OUR FARM MARKET
              </span>

              <h2>Fresh Picks for You</h2>

              <p>
                Choose your favourites straight from the farm.
              </p>

            </div>

            {/* Sorting */}
            <div className="shop-sort">

              <SlidersHorizontal size={18} />

              <label htmlFor="shop-sort-select">
                Sort by:
              </label>

              <select
                id="shop-sort-select"
                value={sortOrder}
                onChange={(event) =>
                  setSortOrder(event.target.value)
                }
              >
                <option value="featured">
                  Featured
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="name">
                  Name: A to Z
                </option>

              </select>

            </div>

          </div>

          {/* Category Filters */}
          <div className="shop-category-tabs">

            {categories.map((category) => (

              <button
                key={category}
                type="button"
                className={
                  activeCategory === category
                    ? "selected"
                    : ""
                }
                aria-pressed={
                  activeCategory === category
                }
                onClick={() =>
                  setActiveCategory(category)
                }
              >
                {category}
              </button>

            ))}

          </div>

          {/* Product Count */}
          <div className="shop-results-row">

            <p>
              Showing{" "}
              <strong>
                {filteredProducts.length}
              </strong>{" "}
              products
            </p>

            {(searchTerm ||
              activeCategory !== "All Products" ||
              sortOrder !== "featured") && (

              <button
                type="button"
                className="shop-clear-search"
                onClick={clearFilters}
              >
                Clear filters
              </button>

            )}

          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (

            <div className="shop-product-grid">

              {filteredProducts.map((product) => {

                const quantity = getProductQuantity(product.id);

                return (
                  <article
                    className="shop-product-card"
                    key={product.id}
                  >

                    {/* Product Image */}
                    <Link
                      to={`/product/${product.id}`}
                      className="shop-product-image"
                      aria-label={`View ${product.name}`}
                    >

                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                      />

                      {product.badge && (

                        <span className="shop-product-badge">
                          {product.badge}
                        </span>

                      )}

                    </Link>

                    {/* Product Information */}
                    <div className="shop-product-info">

                      <span className="shop-product-category">
                        {product.category}
                      </span>

                      <h3>
                        <Link to={`/product/${product.id}`}>
                          {product.name}
                        </Link>
                      </h3>

                      <p className="shop-farmer-name">
                        By {product.farmer}
                      </p>

                      {/* Rating */}
                      <div className="shop-product-rating">

                        <Star
                          size={15}
                          fill="currentColor"
                        />

                        <span>{product.rating}</span>

                        <span className="shop-rating-label">
                          Farm rating
                        </span>

                      </div>

                      {/* Price and Add Button */}
                      <div className="shop-product-bottom">

                        <p className="shop-product-price">
                          ₹{product.price}

                          <span>
                            {" "} / {product.unit}
                          </span>
                        </p>

                        <button
                          type="button"
                          className="shop-add-button"
                          onClick={() =>
                            addToCart(product.id, 1)
                          }
                          aria-label={`Add ${product.name} to cart`}
                        >

                          <ShoppingCart size={16} />

                          {quantity > 0
                            ? `Added (${quantity})`
                            : "Add"}

                        </button>

                      </div>

                    </div>

                  </article>
                );
              })}

            </div>

          ) : (

            /* Empty Search Results */
            <div className="shop-empty-state">

              <Search size={38} />

              <h3>No products found</h3>

              <p>
                Try another search term or choose a
                different category.
              </p>

              <button
                type="button"
                onClick={clearFilters}
              >
                Show all products
              </button>

            </div>

          )}

        </section>

      </main>

      {/* ================= FOOTER ================= */}

      <footer
        className="shop-footer"
        id="contact"
      >

        <div className="shop-footer-brand">

          <Leaf size={22} />

          <strong>FARM2HOME</strong>

        </div>

        <p id="about">
          Supporting local farmers. Bringing fresh food
          to every home.
        </p>

        <span>
          © {new Date().getFullYear()} FARM2HOME.
          All rights reserved.
        </span>

      </footer>

    </div>
  );
}

export default Shop;