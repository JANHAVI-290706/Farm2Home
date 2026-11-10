import { Link } from "react-router-dom";
import vegetablesImage from "../assets/vegetables.png";
import fruitsImage from "../assets/fruits.png";
import grainsImage from "../assets/grains.png";
import dairyEggsImage from "../assets/dairy-eggs.png";
import "../styles/Categories.css";

function Categories() {
  const categories = [
    {
      name: "Vegetables",
      image: vegetablesImage,
    },
    {
      name: "Fruits",
      image: fruitsImage,
    },
    {
      name: "Grains",
      image: grainsImage,
    },
    {
      name: "Dairy & Eggs",
      image: dairyEggsImage,
    },
  ];

  return (
    <section className="categories">
      <div className="category-container">
        {categories.map((category) => (
          <div className="category-card" key={category.name}>
            <div className="category-image">
              <img src={category.image} alt={category.name} />
            </div>

            <div className="category-footer">
              <h3>{category.name}</h3>

              <Link
                to={`/shop?category=${encodeURIComponent(category.name)}`}
                className="category-arrow"
                aria-label={`View ${category.name}`}
              >
                →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;