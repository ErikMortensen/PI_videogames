import {Link} from "react-router-dom";
import style from "./Card.module.css";

export const Card = ({id,name,image,rating,genres}) => {
  return (
    <Link to={`/detail/${id}`}>
      <div className={style.card}>
        <img src={image} alt="imagen videogame" />
        <h3>Name: {name}</h3>
        <h3>Rating: {rating}</h3>
        <h3>Genres: {genres?.map((genre,key) => {
                    return <h5 key={key}>{genre}</h5>
                  })}</h3>
      </div>
    </Link>
  )
}
