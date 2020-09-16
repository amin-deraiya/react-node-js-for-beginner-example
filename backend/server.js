const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const todoRoutes = express.Router();
const PORT = 4000;
const saltRounds = 10;
app.use(cors());
app.use(bodyParser.json());
let Todo = require('./todo.model');
let Login = require('./login.model');

todoRoutes.route('/create').post(function (req, res) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        Login.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash
        }).then(function (data) {
            if (data) {
                console.log('success')
                return res.status(200).send()
            }
        });
    });
});
// todoRoutes.route('/create').post(async(req, res) => {
//     const salt =await bcrypt.genSalt();
//     const password = await bcrypt.hash(req.body.password,salt);
//     const user = {
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         email: req.body.email,
//         password: password
//     }
    
//     // console.log(salt);
//     // console.log(password)
//     // console.log(user)
//     let login = new Login(user);
//     login.save()
//         .then(login => {
//             //console.log(login);
//             res.status(200).json({'login': 'successfully'});
//         })
//         .catch(err => {
//             res.status(400).send(' failed');
//         });
// });
// todoRoutes.route('/login').post( async (req, res) => {
//     // const user = Login.find(email = req.body.email);
//     // if(user == null){
//     //     return res.status(404).send('User not found');
//     // }
//     // try{
//     //     if (await bcrypt.compare(req.body.password, user.password)) {
//     //         res.send('success')
//     //     }else{
//     //         res.send('not allowed')
//     //     }
//     // }catch{
//     //     res.status(500).send('errer')
//     // }
//     var email = req.body.email;
//     var password = req.body.password;
//     Login.findOne({email : email , password : password},function(err,user){
        
//         if(err){
//             return res.status(500).send('error');
//         }
//         if(!user){
//             return res.status(404).send('User not found');
//         }
//         return res.status(200).send("login success");
//     })
// });
todoRoutes.route('/login').post(function (req, res) {
    Login.findOne({
            email: req.body.email
    }).then(function (login) {
        if (!login) {
            console.log('not found')
            res.status(404).send();
        } else {
            bcrypt.compare(req.body.password, login.password, function (err, result) {
                if (result === true) {
                    console.log('success')
                    res.status(200).send(); 
                } else {
                    console.log('Incorrect password')
                    res.status(500).send();
                }
            });
        }
    });
});
app.use('/todos', todoRoutes);
todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});
todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});
todoRoutes.route('/add').post(function(req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});
todoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated!');
            })
            .catch(err => { 
                res.status(400).send("Update not possible");
            });
    });
});
todoRoutes.route('/delete/:id').delete(function(req, res) {
    Todo.findByIdAndRemove(req.params.id, function(err, todo) {
        if (!err){
            console.log("Deleted");
        }
        
        else
            console.log("error");
    });
});
mongoose.connect('mongodb://127.0.0.1:27017/todos',{useNewUrlParser :true});
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})
app.listen(PORT,function(){
    console.log("Server is running on Port: " + PORT);
});