import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Todo = (props) => (
  <tr>
    <td className={props.todo.todo_completed ? "completed" : ""}>
      {props.todo.todo_description}
    </td>
    <td className={props.todo.todo_completed ? "completed" : ""}>
      {props.todo.todo_responsible}
    </td>
    <td className={props.todo.todo_completed ? "completed" : ""}>
      {props.todo.todo_priority}
    </td>
    <td>
      <Link className="btn btn-primary" to={"/edit/" + props.todo._id}>
        Edit
      </Link>
      <button className={props.todo._id} onClick={props.deleteClick}>
        Delete
      </button>
    </td>
  </tr>
);
export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
    this.deleteClick = this.deleteClick.bind(this);
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/todos/")
      .then((Response) => {
        this.setState({ todos: Response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  deleteClick(e) {
    console.log("delete called");
    axios
      .delete("http://localhost:4000/todos/delete/" + e.currentTarget.className)
      .then((res) => console.log(res.data));
    window.location.reload();
  }
  todosList() {
    var self = this;
    return this.state.todos.map(function (currentTodo, i) {
     
      return <Todo todo={currentTodo} key={i} deleteClick={self.deleteClick} />;
    });
  }
  render() {
    return (
      <>
      <div className="collpase navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
          <Link to="/list" className="nav-link">
            Todos
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/create" className="nav-link">
            Create Todo
          </Link>
        </li>
      </ul>
    </div>
      <div>
        <h3>Todos List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.todosList()}</tbody>
        </table>
      </div>
      </>
    );
  }
}
