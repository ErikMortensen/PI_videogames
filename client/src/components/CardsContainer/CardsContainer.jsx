import { useSelector } from "react-redux";
import { Card } from "../Card/Card";
import style from "./CardsContainer.module.css";

export const CardsContainer = () => {

    const users = useSelector(state=>state.users);

    return (
        <div className={style.cardsContainer}>
            { 
                users.map(user => {
                    return <Card
                        id={user.id}
                        name={user.name}
                        platforms={user.platforms}
                        image={user.image}
                        released={user.released}
                        rating={user.rating}
                    />
                })
            }
        </div>
  )
}
