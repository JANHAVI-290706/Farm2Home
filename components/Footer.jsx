import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <Link to="/home" className="footer-logo">
            FARM2HOME
          </Link>

          <p>
            Connecting farmers directly with customers for fresh, quality
            products delivered to your home.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>

          <Link to="/home">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/farmers">Farmers</Link>
          <Link to="/about">About Us</Link>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h3>Contact Us</h3>

          <p>
            <MapPin size={17} />
            Bengaluru, India
          </p>

          <p>
            <Phone size={17} />
            +91 98765 43210
          </p>

          <p>
            <Mail size={17} />
            support@farm2home.com
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 FARM2HOME. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;