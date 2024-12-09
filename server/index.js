import express from 'express';
import { connectToDatabase } from './db.js';

const app = express();

let db = await connectToDatabase();

app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Pizzeria');
});

app.get('/pizze', async (req, res) => {
    let pizze_collection = db.collection('pizze'); 
    let allPizze = await pizze_collection.find().toArray();
    res.status(200).json(allPizze);
    });

app.listen(PORT, error => {
    if (error) {
        console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
    } else {
    console.log(`Server dela na http://localhost:${PORT}`);
    }
});