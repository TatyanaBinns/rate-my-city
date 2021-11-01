import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import InitialPage from "./components/initialpage.component";
// import Login from "./components/login.component";

function App() {
  return (
    <div className="container">
        <Router>
            <InitialPage />
            <br/>
            <Switch>
                {/* <Route path="/" exact component={InitialPage} /> */}
                {/* <Route path="/login" component={Login} /> */}
            </Switch>
        </Router>
    </div>



    
    // <Router>
    //   <div className="container">
    //     <InitialPage />
    //     <br/>
    //     <Route path="/login" exact component={Login} />

    //     {/* <Route path="/edit/:id" component={EditExercise} />
    //     <Route path="/create" component={CreateExercise} />
    //     <Route path="/user" component={CreateUser} /> */}
    //   </div>
    // </Router>
  );
}

export default App;
