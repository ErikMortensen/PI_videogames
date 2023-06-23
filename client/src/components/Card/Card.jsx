import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import styles from "./Card.module.css";
import { getVideogames,deleteVideogame } from "../../redux/actions";

export const Card = ({id,name,image,rating,genres}) => {

  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteVideogame(id));

    dispatch(getVideogames());
  };

  return (
    <Link to={`/detail/${id}`}>
      <button onClick={handleDelete}>Delete</button>
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
