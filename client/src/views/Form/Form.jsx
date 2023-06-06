import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import { getGenres } from "../../redux/actions";
import { NavBar } from "../../components/NavBar/NavBar";
import {validateInput, validateForm} from "./validate";
import styles from "./Form.module.css";




export const Form = () => {
  const initialErrors = {
      name: '',
      image: '',
      description: '',
      platforms: '',
      released: '',
      rating: '',
      genres: '',
  };

  const [form, setForm] = useState({
    name: '',
    image: '',
    description: '',
    platforms: [],
    released: '',
    rating: '',
    genres: [],
  });

  const [errors, setErrors] = useState(initialErrors);

  const [checkboxesPlatforms, setCheckboxesPlatforms] = useState({
      PlayStation: false,
      Xbox: false,
      Nintendo: false,
      iOS: false,
      Android: false,
      Wii: false,
      Game_Boy: false,
      SEGA: false,
  });

  const [checkboxesGenres, setCheckboxesGenres] = useState({});  

  const dispatch = useDispatch();
  const validatedForm = validateForm(form, errors);
  
  useEffect(() => {
    dispatch(getGenres());

    return () => cleanForm;
  }, []);
  
  const genres = useSelector(state=>state.genres);

  const handlerChange = (e) => {
    const validated = validateInput({
      ...form,
      [e.target.name]: e.target.value
    },setErrors,errors);

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxGenresChange = (e) => {
    const {name, value, checked} = e.target;
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

    setCheckboxesGenres({
      ...checkboxesGenres,
      [name]: checked
    });

    validateInput({
      ...form,
      genres: updatedGenres
    },setErrors,errors);
  };

  const handleCheckboxPlatformsChange = (e) => {
    const {name, value, checked} = e.target;
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

    setCheckboxesPlatforms({
      ...checkboxesPlatforms,
      [name]: checked
    });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    
    try { 
      if(validatedForm){
        axios.post('http://localhost:3001/videogames', form)
          .then(res => alert(`The game has been created successfully!`));
          setErrors(initialErrors);
          cleanForm();
      } else {
        alert('Campos del formulario con errores!');
      }
    } catch ({message}) {
      alert(message);
    }
  };

  const cleanForm = () => {

    setForm({
      name: '',
      image: '',
      description: '',
      platforms: [],
      released: '',
      rating: '',
      genres: [],
    });

    setCheckboxesPlatforms({
      PlayStation: false,
      Xbox: false,
      Nintendo: false,
      iOS: false,
      Android: false,
      Wii: false,
      Game_Boy: false,
      SEGA: false,
    });

    const arrayGenres = {...checkboxesGenres};

    for (let property in arrayGenres) {
        arrayGenres[property] = false;
    }
    setCheckboxesGenres({...checkboxesGenres, ...arrayGenres});

  };

  return (
    <div>

    <NavBar searchBar={false}/>
    <form  className={styles.form} onSubmit={handlerSubmit}>
      <h2>Formulario de creación</h2>
      <label htmlFor="">Name: </label>
      <input type="text" name="name" id="" value={form.name} onChange={handlerChange}/>
      <span>{errors.name}</span>

      <label htmlFor="">Image: </label>
      <input type="text" name="image" id="" value={form.image} onChange={handlerChange}/>
      <span>{errors.image}</span>

      <label htmlFor="">Description: </label>
      <textarea name="description" id="" cols="30" rows="10" value={form.description} onChange={handlerChange}>
      </textarea>
      <span>{errors.description}</span>


      <label className={styles.checkboxColumn} htmlFor="">Platforms: </label>
        <label htmlFor="">
          <input type="checkbox" name="PlayStation" id="" value="PlayStation" checked={checkboxesPlatforms.PlayStation} onChange={handleCheckboxPlatformsChange}/>
          PlayStation
        </label>
        <br />

        <label htmlFor="">
          <input type="checkbox" name="Xbox" id="" value="Xbox" checked={checkboxesPlatforms.Xbox} onChange={handleCheckboxPlatformsChange}/>
          Xbox
        </label>
        <br />

        <label htmlFor="">
          <input type="checkbox" name="Nintendo" id="" value="Nintendo" checked={checkboxesPlatforms.Nintendo} onChange={handleCheckboxPlatformsChange}/>
          Nintendo
        </label>
        <br />

        <label htmlFor="">
          <input type="checkbox" name="iOS" id="" value="iOS" checked={checkboxesPlatforms.iOS} onChange={handleCheckboxPlatformsChange}/>
          iOS
        </label>
        <br />

        <label htmlFor="">
          <input type="checkbox" name="Android" id="" value="Android" checked={checkboxesPlatforms.Android} onChange={handleCheckboxPlatformsChange}/>
          Android
        </label>
        <br />

        <label htmlFor="">
          <input type="checkbox" name="Wii" id="" value="Wii" checked={checkboxesPlatforms.Wii} onChange={handleCheckboxPlatformsChange}/>
          Wii
        </label>
        <br />

        <label htmlFor="">
          <input type="checkbox" name="Game_Boy" id="" value="Game Boy" checked={checkboxesPlatforms.Game_Boy} onChange={handleCheckboxPlatformsChange}/>
          Game Boy
        </label>
        <br />

        <label htmlFor="">
          <input type="checkbox" name="SEGA" id="" value="SEGA" checked={checkboxesPlatforms.SEGA} onChange={handleCheckboxPlatformsChange}/>
          SEGA
        </label>
        <br />

      <label htmlFor="">Released: </label>
      <input type="date" name="released" id="" value={form.released} onChange={handlerChange}/>
      <span>{errors.released}</span>


      <label htmlFor="">Rating: </label>
      <input type="number" name="rating" id="" value={form.rating} onChange={handlerChange}/>
      <span>{errors.rating}</span>


      <label htmlFor="">Genres: </label>
      {
        genres?.map(genre => {
          return(
            <div>
              <label htmlFor="">
                <input type="checkbox" name={genre.name} id="" value={genre.name} checked={checkboxesGenres[genre.name]} onChange={handleCheckboxGenresChange}/>
                {genre.name}
              </label>
              <br />
            </div>
          )
      })}
      <span>{errors.genres}</span>

      <button type="submit" disabled={!validatedForm}>Create</button>
    </form>
    </div>
  )
}
