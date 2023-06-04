import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getGenres, getVideogames, getVideogamesByName } from "../../redux/actions";
import { CardsContainer } from "../../components/CardsContainer/CardsContainer";
import { NavBar } from "../../components/NavBar/NavBar";
import { FilterBar } from "../../components/FilterBar/FilterBar";

export const Home = () => {
    const dispatch = useDispatch();
    const allGames = useSelector(state=>state.games);
    const gamesByName = useSelector(state=>state.gamesByName);

    const [filtered, setFiltered] = useState(allGames);
    const [searchString, setSearchString] = useState('');

    const handleChange = (e) => {
      setSearchString(e.target.value);

      dispatch(getVideogamesByName(e.target.value));

      setFiltered(gamesByName);
    };


    useEffect(() => {
      dispatch(getVideogames());
      dispatch(getGenres());
    }, []);
    
  return (
    <div>
      <NavBar handleChange={handleChange} searchBar={true}/>
      <FilterBar/>
      <CardsContainer games={(!searchString) ? allGames : filtered}/>
    </div>
  )
}
