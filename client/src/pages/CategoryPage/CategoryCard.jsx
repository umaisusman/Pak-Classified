// src/pages/CategoryPage/CategoryCard.jsx
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./CategoryPage.module.css";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  return (
    <Card className={styles.card}>
      <Card.Img variant="left" src={category.image} className={styles.cardImage} />
      <Card.Body>
        <Card.Title>{category.name}</Card.Title>
        <Card.Text>
          {category.description.length > 150
            ? category.description.substring(0, 150) + "..."
            : category.description}
          <a
            className={styles.linkTag}
            onClick={() => {
              setTimeout(() => navigate(`/categories/${category._id}`), 1000);
            }}
          >
            Read More.
          </a>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;
