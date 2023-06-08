import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import logo from "../../images/logo_32.png";

export const NavBar = ({handleChange, searchBar}) => {
  return (
    <div className={style.navbar}>
      <div className={style.icon}>
          <img src={logo} alt="logo" />
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
    // <div className={style.navBarContainer}>
    //   <div className={style.navBarMenu}>
    //       <img src={logo} alt="logo" />
    //       <Link className={style.navBarLink} to="/home">Home</Link>
    //       <Link className={style.navBarLink} to="/create">Create</Link>
    //   </div>
    //   <div>
    //     { searchBar && <form>
    //       <input type="search" name="" id="" placeholder="Search..." onChange={handleChange}/>
    //     </form>}
    //   </div>
    // </div>
  );
}
