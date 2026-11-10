import { Leaf, Users, Truck } from "lucide-react";
import "../styles/Features.css";

function Features() {
  const features = [
    {
      icon: <Leaf />,
      title: "Fresh Products",
    },
    {
      icon: <Users />,
      title: "Direct from Farmers",
    },
    {
      icon: <Truck />,
      title: "Reliable Delivery",
    },
  ];

  return (
    <section className="features">
      <div className="features-container">
        {features.map((feature) => (
          <div className="feature-item" key={feature.title}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;