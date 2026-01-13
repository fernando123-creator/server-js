import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

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



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});