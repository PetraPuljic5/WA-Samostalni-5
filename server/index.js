import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './db.js';

const app = express();

app.use(cors());

let db = await connectToDatabase();

app.use(express.json());

const PORT = 3000;

app.get('/pizze', async (req, res) => {
    let pizze_collection = db.collection('pizze'); 
    let allPizze = await pizze_collection.find().toArray();
    res.status(200).json(allPizze);
    });

app.post('/pizze', async (req, res) => {
    const { naziv, cijena, slika, sastojci } = req.body;
    
    if (!naziv || typeof naziv !== 'string' || !cijena || typeof cijena !== 'number' || !slika || typeof slika !== 'string' || !Array.isArray(sastojci) || sastojci.some(s => typeof s !== 'string')) {
        return res.status(400).json({ error: 'Podaci su neispravni.' });
    }
    
    try {
        let pizze_collection = db.collection('pizze');
        const nova = { naziv, cijena, slika, sastojci };
        const rez = await pizze_collection.insertOne(nova);
        res.status(201).json(rez);
    } catch (error) {
        console.error('Greška u dodavanju', error);
        res.status(500).json({ error: 'Greška.' });
        }
});
    
app.listen(PORT, error => {
    if (error) {
        console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
    } else {
    console.log(`Server dela na http://localhost:${PORT}`);
    }
});