const express = require('express');

const app = express();
const mailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const {readDbFile, writeDbFile} = require('./fs.services');

app.get('/users', async (req, res) => {
    try {
        const users = await readDbFile();
        res.status(200).json({data: users});
    } catch (e) {
        throw new Error(e.message)
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            res.status(400).json('Id not a number')
        }

        const users = await readDbFile();
        const index = users.findIndex(user => user.id === id);

        if (index === -1) {
            throw new Error(`There is no user with id: ${id}`)
        }

        res.status(200).json(users[index])
    } catch (e) {
        res.status(400).json(e.message)
    }
});

app.post('/users', async (req, res) => {
    console.log(req.body);
    try {
        const user = req.body;
        const {name, username, email, age} = user;

        if (!name || name.match(/^[a-zA-Z]{3,}$/)) {
            throw new Error('Name length must be greater than 3');
        }

        if (!username || username.match(/^[a-zA-Z]{3,}$/)) {
            throw new Error('Username length must be greater than 3');
        }

        if (!email || email.match(mailRegex)) {
            throw new Error('Email not valid')
        }

        if (!age || age < 3) {
            throw new Error('Age must be greater than 3');
        }

        const users = await readDbFile();
        user.id = users.length - 1;
        users.push(user);
        await writeDbFile(users);
        res.status(200).json({data: user});

    } catch (e) {
        res.status(400).json(e.message)
    }
})

// app.post('/users', async (req, res) => {
//
//     try {
//         const {email, name, age} = req.body;
//         if (!age || !Number.isInteger(age) || age <= 0 || age > 100) {
//             throw new Error('wrong age');
//         }
//         if (!email || !email.includes('@')) {
//             throw new Error('wrong email');
//         }
//         if (!name || name.length <= 3) {
//             throw new Error('wrong name');
//         }
//         const users = await read();
//
//         const newUser = {id: users[users.length - 1].id + 1, email, name, age};
//         users.push(newUser);
//         await write(users);
//
//         res.status(201).json({data: newUser});
//     } catch (e) {
//         res.status(400).json(e.message);
//     }
// });




const PORT = 5050;
app.listen(PORT, () => {
    console.log('Server is up')
})