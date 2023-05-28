import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../../redux/actions";
import { CardsContainer } from "../../components/CardsContainer/CardsContainer";

export const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getUsers());
    }, []);
    
  return (
    <div>
        <h1>Home</h1>
        <CardsContainer/>
    </div>

    
  )
}
