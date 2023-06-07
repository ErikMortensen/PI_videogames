import {Link} from "react-router-dom";
import styles from "./Card.module.css";

export const Card = ({id,name,image,rating,genres}) => {
  return (
    <Link to={`/detail/${id}`}>
      <div className={styles.card}>
        <h4 className={styles.cardRating}>{rating}</h4>
        <img src={image} alt="imagen videogame" />
        <h1>{name}</h1>
          <h3 className={styles.cardGenres}>{genres?.map((genre,key) => {
            return <h5 key={key}>{genre}</h5>
          })}</h3>
      </div>
    </Link>
  )
}
