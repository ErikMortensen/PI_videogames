// import { useSelector } from "react-redux";
import { Card } from "../Card/Card";
import style from "./CardsContainer.module.css";

export const CardsContainer = ({games}) => {

    // const games = useSelector(state=>state.games);

    return (
        <div className={style.cardsContainer}>
            { 
                games.map(game => {
                    return <Card
                        key={game.id}
                        id={game.id}
                        name={game.name}
                        // platforms={user.platforms}
                        image={game.image}
                        // released={user.released}
                        // rating={user.rating}
                        genres={game.genres}
                    />
                })
            }
        </div>
  )
}
