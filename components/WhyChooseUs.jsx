import { Sprout, HandHeart, ShoppingBasket } from "lucide-react";
import "../styles/WhyChooseUs.css";

function WhyChooseUs() {
  const benefits = [
    {
      icon: <Sprout />,
      title: "Fresh & Quality Products",
      description:
        "Get fresh and quality products sourced directly from trusted farmers.",
    },
    {
      icon: <HandHeart />,
      title: "Supporting Local Farmers",
      description:
        "We help farmers connect directly with customers and grow their business.",
    },
    {
      icon: <ShoppingBasket />,
      title: "Easy & Reliable Shopping",
      description:
        "Enjoy a simple and convenient way to shop for fresh products from home.",
    },
  ];

  return (
    <section className="why-choose-us">
      <div className="why-header">
        <p className="section-tag">WHY FARM2HOME?</p>
        <h2>Better for You. Better for Farmers.</h2>
        <p>
          FARM2HOME connects customers with farmers for a fresher and more
          convenient shopping experience.
        </p>
      </div>

      <div className="benefits-container">
        {benefits.map((benefit) => (
          <div className="benefit-card" key={benefit.title}>
            <div className="benefit-icon">{benefit.icon}</div>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;