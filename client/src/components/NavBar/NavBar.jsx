import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

export const NavBar = () => {
  return (
    <div className={style.navBarContainer}>
        <Link to="/home">Home</Link>
        <Link to="/create">Create</Link>
    </div>
  )
}
