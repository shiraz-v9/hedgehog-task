import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Actions } from "./components/actions";
import { Home } from "./components/home";
import { SignIn } from "./components/signin";
import { Nav } from "./components/nav";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/login" exact component={SignIn}></Route>
          <Route path="/actions" exact component={Actions}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
