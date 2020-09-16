import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class SignIn extends Component {
    constructor(props){
        super(props);
        this.onChangefirstname = this.onChangefirstname.bind(this);
        this.onChangelastname = this.onChangelastname.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
          firstname : '',
          lastname : '',
          email : '',
          password : '' 
        }
    }
    onChangefirstname(e){
        this.setState({
            firstname : e.target.value
        });
    }
    onChangelastname(e){
        this.setState({
            lastname : e.target.value
        });
    }
    onChangeemail(e){
        this.setState({
            email : e.target.value
        });
    }
    onChangepassword(e){
      this.setState({
          password : e.target.value
      });
  }
    onSubmit(e){
        e.preventDefault();
        console.log('Form Submited:');
        console.log('Firstname :${this.state.firstname}');
        console.log('Lastname :${this.state.lastname}');
        console.log('Email :${this.state.email}');
        console.log('Password :${this.state.password}');
        const newlogin = {
            firstname : this.state.firstname,
            lastname : this.state.lastname,
            email : this.state.email,
            password : this.state.password
        }
        axios.post('http://localhost:4000/todos/create', newlogin)
            .then(res => console.log(res.data));
           
        this.setState({
            firstname : '',
            lastname : '',
            email : '',
            password : ''
        })
    }
    render() {
        return (
          <div class="container" style={{ marginTop: 10 }}>
            <h3 class="alert alert-danger alert-dismissible fade show">
              Create account
            </h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>firstname : &nbsp;</label>
                <input
                  type="text"
                  className="form-group"
                  value={this.state.firstname}
                  onChange={this.onChangefirstname}
                />
              </div>
              <div className="form-group">
                <label>lastname : &nbsp;</label>
                <input
                  type="text"
                  className="form-group"
                  value={this.state.lastname}
                  onChange={this.onChangelastname}
                />
              </div>
              <div className="form-group">
                <label>email : &nbsp;</label>
                <input
                  type="email"
                  className="form-group"
                  value={this.state.email}
                  onChange={this.onChangeemail}
                />
              </div>
              <div className="form-group">
                <label>password : &nbsp;</label>
                <input
                  type="password"
                  className="form-group"
                  value={this.state.password}
                  onChange={this.onChangepassword}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Create"
                  className="btn btn-primary"
                />
                &nbsp;&nbsp;
                <Link className="btn btn-primary" to={"/"}>
                  login
                </Link>
              </div>
            </form>
          </div>
        );
    }
}