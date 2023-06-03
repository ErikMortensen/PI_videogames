// import './App.css';

import { Route, /*useLocation*/ } from "react-router-dom";
import { Landing } from "./views/Landing/Landing";
import { Home } from "./views/Home/Home";
import { Detail } from "./views/Detail/Detail";
import { Form } from "./views/Form/Form";
// import { NavBar } from "./components/NavBar/NavBar";


function App() {

  // const location = useLocation();

  return (
    <div >
      {/* {location.pathname !== '/' && <NavBar />} */}
      <Route exact path="/" component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/detail/:id" component={Detail} />
      <Route path="/create" component={Form} />
    </div>
  );
}

export default App;
