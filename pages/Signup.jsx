import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  UserRound,
  Mail,
  Phone,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";
import farmBackground from "../assets/farm-background.png";
import "../styles/Signup.css";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all the fields.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(
      "Your form is valid! Account registration will be connected to the backend later."
    );
  }

  return (
    <div className="signup-page">
      {/* Simple Header */}
      <header className="signup-header">
        <Link to="/home" className="signup-brand">
          <Leaf size={43} strokeWidth={1.8} />
          <span>FARM2HOME</span>
        </Link>

        <nav className="signup-header-actions">
          <Link to="/login" className="signup-header-login">
            Login
          </Link>

          <Link to="/signup" className="signup-header-register">
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="signup-main">
        {/* Left Farm Section */}
        <section className="signup-visual">
          <div className="signup-decorative-leaf signup-leaf-one">
            <Leaf size={65} />
          </div>

          <div className="signup-message">
            <p className="signup-message-small">GROW WITH US</p>

            <h1>
              Good Food,
              <br />
              Brighter
              <br />
              Futures
            </h1>

            <div className="signup-message-line"></div>

            <p className="signup-message-description">
              Fresh from the farm,
              <br />
              delivered with care.
            </p>
          </div>

          <div className="signup-farm-image-wrapper">
            <img
              src={farmBackground}
              alt="Green farmland and nature"
              className="signup-farm-image"
            />
          </div>

          <div className="signup-decorative-leaf signup-leaf-two">
            <Leaf size={48} />
          </div>
        </section>

        {/* Right Signup Form */}
        <section className="signup-form-section">
          <div className="signup-card">
            <div className="signup-card-logo">
              <Leaf size={43} strokeWidth={1.8} />
            </div>

            <h2>Create Your Account</h2>

            <p className="signup-subtitle">
              Join FARM2HOME and discover fresh goodness.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              {/* Full Name */}
              <div className="signup-input-wrapper">
                <UserRound size={21} />

                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  aria-label="Full Name"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className="signup-input-wrapper">
                <Mail size={21} />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  aria-label="Email Address"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Phone */}
              <div className="signup-input-wrapper">
                <Phone size={21} />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  aria-label="Phone Number"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="signup-input-wrapper">
                <LockKeyhole size={21} />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  aria-label="Password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="signup-eye-button"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="signup-input-wrapper">
                <LockKeyhole size={21} />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  aria-label="Confirm Password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="signup-eye-button"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={21} />
                  ) : (
                    <Eye size={21} />
                  )}
                </button>
              </div>

              {/* Form Feedback */}
              {error && (
                <p
                  className={
                    error.startsWith("Your form is valid")
                      ? "signup-message-success"
                      : "signup-message-error"
                  }
                  role="status"
                >
                  {error}
                </p>
              )}

              <button type="submit" className="signup-submit-button">
                Create Account
              </button>
            </form>

            {/* Google Signup Placeholder */}
            <div className="signup-divider">
              <span></span>
              <p>OR</p>
              <span></span>
            </div>

            <button
              type="button"
              className="signup-google-button"
              onClick={() =>
                setError(
                  "Google sign-up will be available after authentication is configured."
                )
              }
            >
              <span className="signup-google-letter">G</span>
              Continue with Google
            </button>

            <p className="signup-login-prompt">
              Already have an account?
              <Link to="/login">Login</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Signup;