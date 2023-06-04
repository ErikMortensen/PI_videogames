import { useDispatch} from "react-redux";
import { cleanFilters, sortAsc } from "../../redux/actions";
import { useState } from "react";

export const FilterBar = () => {
    const dispatch = useDispatch();

    const initialState = {
        NameAsc: null,
        NameDesc: null,
        RatingAsc: null,
        RatingDesc: null
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

    const handleClean = (e) => {
        e.preventDefault();
        dispatch(cleanFilters());
        setSelectedOption(initialState);
    };

    return (
        <div>
        <form action="">
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
