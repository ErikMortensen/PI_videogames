import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import { getGenres } from "../../redux/actions";


export const Form = () => {
  const [form, setForm] = useState({
    name: '',
    image: '',
    description: '',
    platforms: ["Nintendo", "Play"],
    released: '',
    rating: '',
    genres: [],
  });

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getGenres());
  }, [])
  
  const genres = useSelector(state=>state.genres);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  };

  const handleCheckboxChange = (e) => {
    const {value,checked} = e.target;
    let updatedGenres = [...form.genres];

    if(checked){
      updatedGenres.push(value);
    } else {
      updatedGenres = updatedGenres.filter(genre => genre !== value);
    }

    setForm({
      ...form,
      genres: updatedGenres
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);
    axios.post('http://localhost:3001/videogames', form)
      .then(res => alert(res))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Formulario de creación</h2>
      <label htmlFor="">Name: </label>
      <input type="text" name="name" id="" value={form.name} onChange={handleChange}/>

      <label htmlFor="">Image: </label>
      <input type="text" name="image" id="" value={form.image} onChange={handleChange}/>

      <label htmlFor="">Description: </label>
      <textarea name="description" id="" cols="30" rows="10" value={form.description} onChange={handleChange}>
      </textarea>

      {/* <label htmlFor="">Platforms: </label>
      <input type="text" name="platforms" id="" value={form.platforms} onChange={handleChange}/> */}

      <label htmlFor="">Released: </label>
      <input type="date" name="released" id="" value={form.released} onChange={handleChange}/>

      <label htmlFor="">Rating: </label>
      <input type="text" name="rating" id="" value={form.rating} onChange={handleChange}/>

      <label htmlFor="">Genres: </label>
      {
        genres?.map(genre => {
          return(
            <div>
              <label htmlFor="">
                <input type="checkbox" name={genre.name} id="" value={genre.name} onChange={handleCheckboxChange}/>
                {genre.name}
              </label>
              <br />
            </div>
          )
      })}
      <button type="submit">Create</button>
    </form>
  )
}
