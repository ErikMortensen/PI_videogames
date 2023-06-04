import { useDispatch, useSelector} from "react-redux";
import { cleanFilters, filterByGenre, sortAsc } from "../../redux/actions";
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

    const handleSelectChange = (e) =>{
        console.log(e.target.value);
        dispatch(filterByGenre(e.target.value));
    };

    const handleClean = (e) => {
        e.preventDefault();
        dispatch(cleanFilters());
        setSelectedOption(initialState);
    };

    return (
        <div>
        <form action="">
            <label htmlFor="">Genre</label>
            <select name="genres" id="" onChange={handleSelectChange}>
                <option value='all'>All</option>

                {
                    genres.map(genre => {
                        return(
                            <option value={genre.name}>{genre.name}</option>
                        )
                    })
                }
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
