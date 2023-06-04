import { Card } from "../Card/Card";
import style from "./CardsContainer.module.css";

export const CardsContainer = ({games}) => {

    return (
        <div className={style.cardsContainer}>
            { 
                games.map(game => {
                    return <Card
                        key={game.id}
                        id={game.id}
                        name={game.name}
                        image={game.image}
                        rating={game.rating}
                        genres={game.genres}
                    />
                })
            }
        </div>
  )
}
