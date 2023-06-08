import {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import axios from "axios";
import { NavBar } from "../../components/NavBar/NavBar";
import style from "./Detail.module.css";


export const Detail = () => {
  const {id} = useParams();

  const [videogameDetail, setVideogameDetail] = useState({});
  const {name, platforms, description, released, rating, genres,image} =  videogameDetail;

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
        try {
            const { data } = await axios(`http://localhost:3001/videogames/${id}`);
            if (data.name) {
                setVideogameDetail(data);
            }
        } catch (error) {
            window.alert('There is no videogame with that ID');
        }
    };

    fetchData();

    return () => setVideogameDetail({});
  }, [id]);

  return (
    <>
      <NavBar searchBar={false}/>
      <div className={style.detailContainer}>
              <img src={image} alt="Imagen del juego" 
              style={{ backgroundSize: "cover", width: "100%", height: "100%" }}/>
      <Link className={style.detailLink} to='/home'>Go back</Link>
      </div>
          <div className={style.column}>
          <div className={style.columnContent}>
            <h1>{name}</h1>
            <h2 className={style.textRight}>Released: {released}</h2>
            <h2 className={style.textLeft}>Rating: {rating}</h2>
            <p>{description}</p>
            <h3 className={style.genres}>Platforms: {platforms?.map(platform => {
              return <h5>{platform}</h5>
            })}</h3>
            <h3 className={style.genres}>Genres: {genres?.map(genre => {
              return <h5>{genre}</h5>
            })}</h3>
          </div>
          </div>
    </>
  )
}
