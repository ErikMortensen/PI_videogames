import style from "./Card.module.css";

export const Card = ({id, name, platforms, image, released, rating}) => {

  return (
    <div className={style.card}>
        <h3>ID: {id}</h3>
        <h3>Name: {name}</h3>
        <h3>Platforms: {platforms}</h3>
        <h3>Released: {released}</h3>
        <h3>Rating: {rating}</h3>
    </div>
  )
}
