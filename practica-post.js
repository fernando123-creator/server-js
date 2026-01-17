import express from 'express';
import fs from 'fs';

const app = express();
const readData = fs.readFileSync('users.json', 'utf-8');
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    const data = JSON.parse(readData);
    res.json(data);
})


app.post('/users', (req, res) => {
    const { nombre, email} = req.body;
    const users = JSON.parse(readData);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!nombre || !email) {
        return res.status(400).json({message: 'los campos nombre y email son obligatorios'});
    };

    if (!regex.test(email)) {
        return res.status(400).json({message: 'revisa el email por favor!!'});
    }

    const newUser = {
        id: users.length + 1,
        nombre,
        email
    };
    
    users.push(newUser);

    try {
        fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
    } catch (error) {
        return res.status(500).json({message: 'error al guaradar el archivo'});
    }
    
    res.status(201).json({message: 'usuario creado correctamente', newUser});

})


app.listen(PORT, () => {
    console.log(`SERVIDOR ESCUCHANDO EN EL PUERTO ${PORT}`);
});

