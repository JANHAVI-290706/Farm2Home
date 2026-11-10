import { Link } from "react-router-dom";
import farmerImage from "../assets/farmer.png";
import farmBackground from "../assets/farm-background.png";
import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Fresh from <br />
          Farmers.
          <span>Direct to Your Home.</span>
        </h1>

        <Link to="/shop" className="shop-now-btn">
          Shop Now
        </Link>
      </div>

      <div className="hero-image">
        {/* Farm background */}
        <img
          src={farmBackground}
          alt="Fresh farm landscape"
          className="farm-background"
        />

        {/* Farmer in front */}
        <img
          src={farmerImage}
          alt="Farmer holding fresh produce"
          className="farmer-img"
        />
      </div>
    </section>
  );
}

export default Hero;