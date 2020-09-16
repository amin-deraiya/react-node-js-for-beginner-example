import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const mystyle = {
  
}
export default class Login extends Component {
    constructor(props){
        super(props);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
          email : '',
          password : '' 
        }
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
        const login = {
            email : this.state.email,
            password : this.state.password
        }
        axios.post('http://localhost:4000/todos/login', login)
            .then((res) => {
              console.log(res);
              
              if(res.status === 200){
                alert("login success");
                this.props.history.push('/list');
              }
            }).catch((err)=>{
              console.log(err)
              alert(err)
            });
            
        this.setState({
           
            email : '',
            password : ''
        })
    }
    render() {
        return (
          <div class="container" style={{ marginTop: 10 }}>
            <h3 class="alert alert-success alert-dismissible fade show">
              Login Account
            </h3>
            <form onSubmit={this.onSubmit}>
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
                  value="login"
                  className="btn btn-primary"
                />
                &nbsp;&nbsp;
                <Link className="btn btn-primary" to={"/signin"}>
                  sign up
                </Link>
              </div>
              
            </form>
          </div>
        );
    }
}