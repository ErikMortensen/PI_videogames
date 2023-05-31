import {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import axios from "axios";

export const Detail = () => {
  const {id} = useParams();

  const [videogameDetail, setVideogameDetail] = useState({});
  const {name, platforms, description, released, rating, genres,image} =  videogameDetail;

  useEffect(() => {
    const fetchData = async () => {
        try {
            const { data } = await axios(`http://localhost:3001/videogames/${id}`);
            if (data.name) {
                setVideogameDetail(data);
            }
        } catch (error) {
            window.alert('There is no videogame with that ID');
            // navigate('/home');
        }
    };

    fetchData();

    return () => setVideogameDetail({});
}, [id]);

  return (
    <div>
      <Link to='/home'>Volver</Link>
      <h3>ID: {id}</h3>
      <h3>Name: {name}</h3>
      <h3>Platforms: {platforms?.map(platform => {
                        return <h5>{platform}</h5>
                      })}</h3>
      <h3>Description: {description}</h3>
      <h3>Realeased: {released}</h3>
      <h3>Rating: {rating}</h3>
      <h3>Genres: {genres?.map(genre => {
                    return <h5>{genre}</h5>
                  })}</h3>
      <img src={image} alt="imagen videogame" />
    </div>
  )
}