import { useDispatch, useSelector} from "react-redux";
import { cleanFilters, filters } from "../../redux/actions";
import { useEffect, useState } from "react";
import style from "./FilterBar.module.css";


export const FilterBar = ({currentPage,setCurrentPage}) => {
    const dispatch = useDispatch();

    const genres = useSelector(state=>state.genres);

    const initialState = {
        NameAsc: false,
        NameDesc: false,
        RatingAsc: false,
        RatingDesc: false
    };

    const [selectedOption, setSelectedOption] = useState({
        initialState
    });

    const [selectGenreValue, setSelectGenreValue] = useState('all');
    const [selectOriginValue, setSelectOriginValue] = useState('all');
    
    const handlerChange = (e) => {
        let otherRadioButton;

        if(e.target.id === 'NameAsc') otherRadioButton = 'NameDesc';
        if(e.target.id === 'NameDesc') otherRadioButton = 'NameAsc';
        if(e.target.id === 'RatingAsc') otherRadioButton = 'RatingDesc';
        if(e.target.id === 'RatingDesc') otherRadioButton = 'RatingAsc';

        setSelectedOption(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value,
            [otherRadioButton]: null
        }));
    };

    const handlerSelectGenreChange = (e) =>{
        setSelectGenreValue(e.target.value);
    };

    const handlerSelectOrigenChange = (e) => {
        setSelectOriginValue(e.target.value);
    };

    const handlerClean = (e) => {
        e.preventDefault();
        dispatch(cleanFilters());
        setSelectedOption(initialState);
        setSelectGenreValue('all');
        setSelectOriginValue('all');
        setCurrentPage(currentPage=1);
    };

    useEffect(() => {
        dispatch(filters(selectGenreValue, selectOriginValue, selectedOption));
        setCurrentPage(currentPage=1);
    }, [selectGenreValue,selectOriginValue,selectedOption]);

    return (
        <div >
            <form action="" className={style.filterContainer}>
                <div className={style.genderSelect}>
                    <label htmlFor="">Genre</label>
                    <select name="genres" id="" onChange={handlerSelectGenreChange} value={selectGenreValue}>
                        <option value='all'>All</option>
                        {
                            genres.map(genre => {
                                return(
                                    <option key={genre.name} value={genre.name}>{genre.name}</option>
                                    )
                                })
                            }
                    </select>
                </div>

                <div className={style.originSelect}>
                    <label htmlFor="">Origen</label>
                    <select name="origen" id="" onChange={handlerSelectOrigenChange} value={selectOriginValue}>
                        <option value="all">All</option>
                        <option value="api">API</option>
                        <option value="database">Database</option>
                    </select>
                </div>

                <div className={style.orderRatingSelect}>
                    <p>Sort by Rating</p>
                    <div>
                        <input type="radio" name="rating" id="RatingAsc" value="RatingAsc" onChange={handlerChange} checked={selectedOption.RatingAsc}/>
                        <label htmlFor="">Ascending</label><br/>
                    </div>
                    <div>
                        <input type="radio" name="rating" id="RatingDesc" value="RatingDesc" onChange={handlerChange} checked={selectedOption.RatingDesc}/>
                        <label htmlFor="">Descending</label><br/>
                    </div>
                </div>
                <div className={style.orderNameSelect}>
                    <p>Sort by Name</p>
                    <div>
                        <input type="radio" name="name" id="NameAsc" value="NameAsc" onChange={handlerChange} checked={selectedOption.NameAsc}/>
                        <label htmlFor="">Ascending</label><br/>
                    </div>
                    <div>
                        <input type="radio" name="name" id="NameDesc" value="NameDesc" onChange={handlerChange} checked={selectedOption.NameDesc}/>
                        <label htmlFor="">Descending</label><br/>
                    </div>
                </div>

                <div>
                    <button onClick={handlerClean}>Clean</button>
                </div>
            </form>
        </div>
  )
}
