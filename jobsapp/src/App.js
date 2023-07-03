import {BrowserRouter,Route,Switch,Redirect} from "react-router-dom"
import Login from "./components/Login/index"
import ProtectedRouter from "./components/ProtectedRouter/index"
import Home from "./components/Home/index"
import Jobs from "./components/Jobs/index"
import NotFound from "./components/NotFound/index"

import './App.css';

const App=()=>(
  <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <ProtectedRouter exact path="/" component={Home}/>
        <ProtectedRouter exact path="/jobs" component={Jobs}/>
        <ProtectedRouter exact path="/not found" component={NotFound}/>
        <Redirect to="/not found"/>
       
      </Switch>
  </BrowserRouter>
)

export default App;
