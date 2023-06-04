import { useDispatch, useSelector} from "react-redux";
import { cleanFilters, filterByGenre, filterByOrigen, sortAsc } from "../../redux/actions";
import { useState } from "react";

export const FilterBar = () => {
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

    const [selectGenreValue, setSelectGenreValue] = useState('');
    const [selectOriginValue, setSelectOriginValue] = useState('');
    
    const handleChange = (e) => {
        dispatch(sortAsc(e.target.value));

        let otherRadioButton;

        if(e.target.id === 'NameAsc') otherRadioButton = 'NameDesc';
        if(e.target.id === 'NameDesc') otherRadioButton = 'NameAsc';
        if(e.target.id === 'RatingAsc') otherRadioButton = 'RatingDesc';
        if(e.target.id === 'RatingDesc') otherRadioButton = 'RatingAsc';

        setSelectedOption({
            ...selectedOption,
            [e.target.id]: e.target.value,
            [otherRadioButton]: null
        });
    };

    const handleSelectGenreChange = (e) =>{
        setSelectGenreValue(e.target.value);
        dispatch(filterByGenre(e.target.value));
    };

    const handleSelectOrigenChange = (e) => {
        setSelectOriginValue(e.target.value);
        dispatch(filterByOrigen(e.target.value));
    };

    const handleClean = (e) => {
        e.preventDefault();
        dispatch(cleanFilters());
        setSelectedOption(initialState);
        setSelectGenreValue('all');
        setSelectOriginValue('all');
    };

    return (
        <div>
        <form action="">
            <label htmlFor="">Genre</label>
            <select name="genres" id="" onChange={handleSelectGenreChange} value={selectGenreValue}>
                <option value='all'>All</option>

                {
                    genres.map(genre => {
                        return(
                            <option value={genre.name}>{genre.name}</option>
                        )
                    })
                }
            </select>

            <label htmlFor="">Origen</label>
            <select name="origen" id="" onChange={handleSelectOrigenChange} value={selectOriginValue}>
                <option value="all">All</option>
                <option value="api">API</option>
                <option value="database">Database</option>
            </select>

            <p>Sort Name</p>
            <input type="radio" name="name" id="NameAsc" value="NameAsc" onChange={handleChange} checked={selectedOption.NameAsc}/>
            <label htmlFor="">Ascending</label><br/>
            <input type="radio" name="name" id="NameDesc" value="NameDesc" onChange={handleChange} checked={selectedOption.NameDesc}/>
            <label htmlFor="">Descending</label><br/>
            <p>Sort Rating</p>
            <input type="radio" name="rating" id="RatingAsc" value="RatingAsc" onChange={handleChange} checked={selectedOption.RatingAsc}/>
            <label htmlFor="">Ascending</label><br/>
            <input type="radio" name="rating" id="RatingDesc" value="RatingDesc" onChange={handleChange} checked={selectedOption.RatingDesc}/>
            <label htmlFor="">Descending</label><br/>

            <button onClick={handleClean}>Clean</button>
        </form>
    </div>
  )
}
