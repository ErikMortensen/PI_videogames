import {Link} from "react-router-dom";
import style from "./Card.module.css";

export const Card = ({id, name, platforms, image, released, rating}) => {


  return (
    <Link to={`/detail/${id}`}>
      <div className={style.card}>
        <img src={image} alt="imagen videogame" />
        <h3>ID: {id}</h3>
        <h3>Name: {name}</h3>
        <h3>Platforms: {platforms}</h3>
        <h3>Released: {released}</h3>
        <h3>Rating: {rating}</h3>
      </div>
    </Link>
  )
}