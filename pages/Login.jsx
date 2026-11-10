import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Leaf,
  Users,
  Truck,
  ArrowRight,
} from "lucide-react";
import farmerImage from "../assets/farmer.png";
import farmBackground from "../assets/farm-background.png";
import "../styles/Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page">
      {/* Top Navigation */}
      <header className="login-navbar">
        <Link to="/home" className="login-navbar-logo">
          <Leaf size={38} />
          <span>FARM2HOME</span>
        </Link>

        <div className="login-navbar-actions">
          <Link to="/login" className="nav-login-btn">
            Login
          </Link>
          <Link to="/signup" className="nav-signup-btn">
            Sign Up
          </Link>
        </div>
      </header>

      <main className="login-main">
        {/* Left Farm Section */}
        <section className="login-visual">
          <img
            src={farmBackground}
            alt=""
            className="login-farm-background"
          />

          <img
            src={farmerImage}
            alt="Farmer holding fresh produce"
            className="login-farmer"
          />

          <div className="login-visual-features">
            <div>
              <span className="visual-icon">
                <Leaf size={28} />
              </span>
              <p>Fresh<br />Produce</p>
            </div>

            <div>
              <span className="visual-icon">
                <Users size={28} />
              </span>
              <p>Direct from<br />Farmers</p>
            </div>

            <div>
              <span className="visual-icon">
                <Truck size={28} />
              </span>
              <p>Reliable<br />Delivery</p>
            </div>
          </div>
        </section>

        {/* Right Login Card */}
        <section className="login-card-section">
          <div className="login-card">
            <h1>
              Welcome Back <Leaf size={34} />
            </h1>

            <p className="login-card-subtitle">Login to continue</p>

            <form>
              <div className="login-input-group">
                <label>Email or Phone Number</label>

                <div className="login-input-wrapper">
                  <Mail size={20} />
                  <input
                    type="text"
                    placeholder="Enter your email or phone number"
                  />
                </div>
              </div>

              <div className="login-input-group">
                <label>Password</label>

                <div className="login-input-wrapper">
                  <Lock size={20} />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                  />

                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="login-form-options">
                <label className="login-remember">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>

                <Link to="/forgot-password">Forgot Password?</Link>
              </div>

              <button type="submit" className="main-login-button">
                Login <ArrowRight size={22} />
              </button>
            </form>

            <div className="login-divider">
              <span></span>
              <p>OR</p>
              <span></span>
            </div>

            <button type="button" className="google-login-button">
              <span className="google-letter">G</span>
              Continue with Google
            </button>

            <div className="login-signup-box">
              Don't have an account?
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;