import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import { getGenres } from "../../redux/actions";


export const Form = () => {
  const [form, setForm] = useState({
    name: '',
    image: '',
    description: '',
    platforms: [],
    released: '',
    rating: '',
    genres: [],
  });

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getGenres());

    return () => cleanForm;
  }, [])
  
  const genres = useSelector(state=>state.genres);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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

  const handleCheckboxPlatformsChange = (e) => {
    const {value,checked} = e.target;
    let updatedPlatforms = [...form.platforms];

    if(checked){
      updatedPlatforms.push(value);
    } else {
      updatedPlatforms = updatedPlatforms.filter(platform => platform !== value);
    }

    setForm({
      ...form,
      platforms: updatedPlatforms
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);
    axios.post('http://localhost:3001/videogames', form)
      .then(res => alert(res))

    cleanForm();
  }

  const cleanForm = () => {
    setForm({
      name: '',
      image: '',
      description: '',
      platforms: [],
      released: '',
      rating: '',
      genres: [],
    })
  };

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

      <label htmlFor="">Platforms: </label>
        <label htmlFor="">
          <input type="checkbox" name="PlayStation" id="" value="PlayStation" onChange={handleCheckboxPlatformsChange}/>
          PlayStation
        </label>
        <br />

        <label htmlFor="">
          <input type="checkbox" name="Xbox" id="" value="Xbox" onChange={handleCheckboxPlatformsChange}/>
          Xbox
        </label>
        <br />

        <label htmlFor="">
          <input type="checkbox" name="Nintendo" id="" value="Nintendo" onChange={handleCheckboxPlatformsChange}/>
          Nintendo
        </label>
        <br />

        <label htmlFor="">
          <input type="checkbox" name="iOS" id="" value="iOS" onChange={handleCheckboxPlatformsChange}/>
          iOS
        </label>
        <br />

        <label htmlFor="">
          <input type="checkbox" name="Android" id="" value="Android" onChange={handleCheckboxPlatformsChange}/>
          Android
        </label>
        <br />

        <label htmlFor="">
          <input type="checkbox" name="Wii" id="" value="Wii" onChange={handleCheckboxPlatformsChange}/>
          Wii
        </label>
        <br />

        <label htmlFor="">
          <input type="checkbox" name="Game Boy" id="" value="Game Boy" onChange={handleCheckboxPlatformsChange}/>
          Game Boy
        </label>
        <br />

        <label htmlFor="">
          <input type="checkbox" name="SEGA" id="" value="SEGA" onChange={handleCheckboxPlatformsChange}/>
          SEGA
        </label>
        <br />

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
