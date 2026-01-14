const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); 
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const fs = require('fs');
const path = require('path');
const userFilePath = path.join(__dirname, 'users.json')
console.log(userFilePath);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/form', (req, res) => {
    const { name, email } = req.body;
    res.json({message: 'Form submitted successfully', data: { name, email }});
});

app.post('/data', (req, res) => {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'No data provided' });
    }

    res.json({ message: 'Data received successfully', data });
});

app.get('/users', (req, res) => {
  fs.readFile(userFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({message: "valiste verga bro"})
    }

    const user = JSON.parse(data);
    res.json(user);

  })
});


app.post('/usuarios', (req, res) => {
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ message: 'Faltan datos obligatorios: nombre y email' });
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)){
    return res.status(400).json({ message: 'Formato de email no válido' });
  }

  if(nombre.length < 3){
    return res.status(400).json({ message: 'El nombre debe tener almenos 3 caracteres' });
  }

  fs.readFile(userFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error al leer el archivo de usuarios' });
    }
    const users = JSON.parse(data);

    const newUser = {
      id: users.length + 1,
       nombre,
       email
    }; 
    users.push(newUser);

    fs.writeFile(userFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al guardar el nuevo usuario' });
      }

      res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});