import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import {Provider} from 'react-import { connect } from 'react-redux';
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import DeleteTodo from "./components/todos-list.component";
import Login from "./components/login.component";
import SignIn from "./components/sign.component";
import './new.css'
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid" align="center">
          <nav className="nav-wrapper red darken-3">
            <div className="container">
              < a className = "brand-logo" > MERN - Stack Todo App 
               
              </a>
            </div>
            <Link to="/" className="navbar-brand">
              MERN-Stack Todo App
            </Link>
            <Link className="navbar-brand" style={{fontSize : 15}} to="/">logout</Link>
          </nav>
          <br />
          <Route path="/list" exact component={TodosList} />
          <Route path="/" exact component={Login} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
          <Route path="/delete" component={DeleteTodo} />
        </div>
      </Router>
    );
  }
}

export default App;
