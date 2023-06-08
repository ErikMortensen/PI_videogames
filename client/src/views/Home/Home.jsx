import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getGenres, getVideogames, getVideogamesByName } from "../../redux/actions";
import { CardsContainer } from "../../components/CardsContainer/CardsContainer";
import { NavBar } from "../../components/NavBar/NavBar";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { Wrapper } from "../../components/Wrapper/Wrapper";

export const Home = () => {
    const dispatch = useDispatch();
    const allGames = useSelector(state=>state.games);
    const gamesByName = useSelector(state=>state.gamesByName);

    const [filtered, setFiltered] = useState(allGames);
    const [searchString, setSearchString] = useState('');

    const ITEMS_PER_PAGE = 15;
    const [currentPage, setCurrentPage] = useState(1);

    const lastIndex = currentPage * ITEMS_PER_PAGE;
    const firstIndex = lastIndex - ITEMS_PER_PAGE;

    const items = allGames.slice(firstIndex,lastIndex);

    const handleChange = (e) => {
      setSearchString(e.target.value);
      setFiltered(gamesByName);
      // setCurrentPage(currentPage=1);
      setCurrentPage(1); // ver si tbn hay q ponerlo en el useEfect
    };

    const handlerNext = (e) => {
      e.preventDefault();
      (currentPage < allGames.length/ITEMS_PER_PAGE) && setCurrentPage(currentPage+1);
    };
    
    const handlerPrev = (e) => {
      e.preventDefault();
      (currentPage > 1) && setCurrentPage(currentPage-1);
    };

    useEffect(() => {
      dispatch(getVideogamesByName(searchString)); // ver si modifica el volverlo al handlerChange
    }, [searchString]);
    
    useEffect(() => {
      dispatch(getVideogames());
      dispatch(getGenres());
    }, []);

  return (
    <div>
      <NavBar handleChange={handleChange} searchBar={true}/>
      <FilterBar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      <div>
        {
          
          ((!searchString && items.length === 0) || (items.length !== 0 && searchString && filtered.length === 0)) && <h2>Cargando...</h2>
        }
      </div>
      <CardsContainer games={(!searchString) ? items : filtered}/>
      <Wrapper currentPage={currentPage} handlerNext={handlerNext} handlerPrev={handlerPrev}/>
    </div>
  )
}
