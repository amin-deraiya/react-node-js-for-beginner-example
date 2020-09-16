import React, { Component } from 'react';
import axios from 'axios';
    axios.delete('http://localhost:4000/todos/delete/'+this.props.match.params.id)
            .then(res => console.log(res.data));
        
       // this.props.history.push('/');