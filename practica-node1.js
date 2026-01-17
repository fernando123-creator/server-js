import express from 'express';
import path from 'path';
import fs from 'fs'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';


dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

const readData = fs.readFileSync('users.json', 'utf-8')


app.use(bodyParser.json());


    


app.get('/', (req, res) => {
    res.send('WLLCOME TO SERVER');
})

app.get('/users', (req, res) => {
    res.json(JSON.parse(readData));
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;

    const readFile = JSON.parse(readData);

    const buscarID = readFile.find(user => user.id === Number(id));

    if (!buscarID) {
        return res.status(404).json({message: 'usuario no encontrado'});
    }

    res.status(200).json(buscarID);
});

app.post('/users', (req, res) => {
    const { nombre, email } = req.body;
    const users = JSON.parse(readData)
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombre || !email) {
        return res.status(400).json({message: 'los campos nombre y email son obligatorios'});
    };
    
    if (!regex.test(email)) {
        return res.status(400).json({message: 'email no valido'})
    }

    const newUser = {
        id: users.length + 1,
        nombre,
        email
    }

    users.push(newUser);

    
    try {
        fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
    } catch (error) {
        return res.status(500).json({message: 'error al guaradar el archivo'});
    }

    res.status(201).json({message: 'usuario guardado con exito', user: newUser});
});



app.listen(PORT, ()=>{
    console.log('servidor corriendo...');
})