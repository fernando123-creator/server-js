import express from 'express';
import fs from 'fs';

const app = express();
const readData = fs.readFileSync('users.json', 'utf-8');
const PORT = 3000;

app.use(express.json());


//obteniendo usuarios
app.get('/', (req, res) => {
    res.json(JSON.parse(readData))
})

//obtener usuarios por id
app.get('/users/:id', (req, res) => {
    const {id} = req.params;
    const readFile = JSON.parse(readData)
    const searchID = readFile.find(user => user.id === Number(id));
    
    if (!searchID) {
        return res.status(400).json({message: 'id no encontrado!!'});
    }

    res.status(200).json(searchID);
});

//crear usuario
app.post('/users', (req, res)=> {
    const { nombre, email} = req.body;
    const users = JSON.parse(readData);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombre || !email) {
        return res.status(400).json({message: 'los campos de nombre y email son obligatorios'})
    }

    if (!regex.test(email)) {
        return res.status(400).json({message: 'el email es invalido'})
    }

    const newUser = {
        id: users.length + 1,
        nombre,
        email
    };

    users.push(newUser);

    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
    res.status(201).json({user: newUser});

});

app.listen(PORT, () => {
    console.log('SERVIDOR CORRIENDO....');
});
