const dotenv = require('dotenv').config();


const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Todo = require('./models/index');

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());


const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useUnifiedTopology: true })
    .then(() => {
        console.log("MONGOOSE CONNECTION SUCCESSFULL");
    })
    .catch((err) => {
        console.log(" MONGOOSE CONNECTION FAILED");
        console.log(err);
    })



app.get('/todos', async (req, res) => {
    const data = await Todo.find({});
    res.json(data);
})

app.post('/todo/new', async (req, res) => {
    const todo = new Todo({
        text:req.body.text
    })
    await todo.save();
    res.json(todo);
})

app.put('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    try {
            todo.complete = !todo.complete;
            await todo.save();
            res.json(todo);
    }
    catch (err) {
        console.log(err);
    }
      

})

app.delete('/todo/delete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    try {
        if (todo._id) {
            const result = await Todo.findByIdAndDelete(req.params.id);    
            res.json(result);
        } 
    }
    catch (err) {
        console.log(err);
    }
    
})

app.listen(3001, () => {
    console.log('listening on port 3001');
})