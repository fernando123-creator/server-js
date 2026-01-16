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


app.listen(PORT, ()=>{
    console.log('servidor corriendo...');
})