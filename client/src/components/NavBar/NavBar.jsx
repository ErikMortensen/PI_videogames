import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import logo from "../../images/logo_32.png";

export const NavBar = ({handleChange, searchBar}) => {
  return (
    <div className={style.navbar}>
      <div className={style.icon}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div>
          <Link className={style.link} to="/home">Home</Link>
      </div>
      <div>
          <Link className={style.link} to="/create">Create</Link>
      </div>
      <div className={style.search}>
        { searchBar && <form>
          <input type="search" name="" id="" placeholder="Search by name..." onChange={handleChange}/>
        </form>}
      </div>
    </div>
  );
}
