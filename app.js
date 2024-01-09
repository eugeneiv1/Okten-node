const express = require('express');
const fs = require('fs');
const path = require('path');


const app = express();
const dbPath = path.resolve(__dirname, 'db.json');
const mailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/users', (req, res) => {
    fs.readFile(dbPath, {encoding: 'utf-8'},(err, data) => {
        if(err) throw new Error()
        const users = JSON.parse(data);
        res.send(users);
    });
});

app.get('/users/:id', (req, res)=>{
    const { id } = req.params;
    fs.readFile(dbPath, {encoding: 'utf-8'},(err, data) => {
        if(err) throw new Error()
        const users = JSON.parse(data);
        if (users[+id-1]) {
            res.json({
                data: users[+id - 1],
            });
        } else {
            res.status(406).json(
                {
                    message: `There is no user with id:${id}`
                }
            );
        }
    });
});


app.post('/users', (req, res) => {
    const user = req.body;
    const {name, username, age, email} = user;
    if (
        name.match(/^[a-zA-Z]{3,}$/)
        && username.match(/^[a-zA-Z]{3,}$/)
        && age >= 0
        && (email && email.match(mailRegex))
    ) {
        fs.readFile(dbPath, {encoding: 'utf-8'}, (err, data) => {
            if (err) throw new Error()
            const users = JSON.parse(data);
            users.push(user)
            fs.writeFile(dbPath, JSON.stringify(users), (err) => {
                if (err) throw new Error();
                res.status(201).json(user);
            });
        });
    } else {
        res.status(406).json(
            {
                message: "Name, username, age or email is not valid"
            }
        )
    }
});

app.put('/users/:id', (req, res) => {
    const updateUser = req.body;
    const {id} = req.params
    fs.readFile(dbPath, {encoding: 'utf-8'},(err, data) => {
        if(err) throw new Error();
        const users = JSON.parse(data);
        if (users[+id-1]) {
            users[+id - 1] = updateUser;
            fs.writeFile(dbPath, JSON.stringify(users), (err) => {
                if (err) throw new Error();
                res.sendStatus(201);
            });
        } else {
            res.status(406).json(
                {
                    message: `There is no user with id:${id}`
                }
            )
        }
    });
});

app.delete('/users/:id', (req, res)=>{
    const { id } = req.params;
    fs.readFile(dbPath, {encoding: 'utf-8'},(err, data) => {
        if(err) throw new Error();
        const users = JSON.parse(data);
        if (users[+id-1]) {
            users.splice(+id - 1, 1);
            fs.writeFile(dbPath, JSON.stringify(users), (err) => {
                if (err) throw new Error();
                res.sendStatus(204);
            });
        } else {
            res.status(406).json({
                message: `There is no user with id:${id}`
            });
        }
    });
})




const PORT = 5050;
app.listen(PORT, () => {
    console.log("Server up")
})