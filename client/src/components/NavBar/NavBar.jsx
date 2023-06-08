import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

export const NavBar = ({handleChange, searchBar}) => {
  return (
    <div className={style.navBarContainer}>
        <Link to="/home">Home</Link>
        <Link to="/create">Create</Link>
        { searchBar && <form>
          <input type="search" name="" id="" placeholder="Search..." onChange={handleChange}/>
        </form>}

    </div>
  );
}
