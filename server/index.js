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

app.post('/narudzba', async (req, res) => {
    const { ime, adresa, telefon, pizza_stavke } = req.body;

    if (!ime || !adresa || !telefon || !Array.isArray(pizza_stavke)) {
        return res.status(400).json({ error: 'Podaci su neispravni!' });
    }

    if (!/^\d+$/.test(telefon)) {
        return res.status(400).json({ error: 'Telefon mora sadrzavati samo brojeve!' });
    }

    for (const stavka of pizza_stavke) {
        const { naziv, kolicina, velicina } = stavka;
        if (!naziv || !kolicina || !velicina) {
            return res.status(400).json({ error: 'Svaka stavka mora imati naziv, kolicinu i veličinu!' });
        }
        if (!['mala', 'srednja', 'velika'].includes(velicina)) {
            return res.status(400).json({ error: 'Veličina pizze mora biti mala, srednja ili velika!' });
        }
    }

    try {
        const pizze_collection = db.collection('pizze');
        const svePizze = await pizze_collection.find().toArray();

        let ukupna_cijena = 0;

        for (const stavka of pizza_stavke) {
            const pizza = svePizze.find(p => p.naziv === stavka.naziv);
            if (!pizza) {
                return res.status(400).json({ error: `Pizza ${stavka.naziv} ne postoji u bazi podataka!` });
            }
            const cijenaPizze = pizza.cijena;
            ukupna_cijena += cijenaPizze * stavka.kolicina;
        }

        const narudzba = {
            ime,
            adresa,
            telefon,
            pizza_stavke,
            ukupna_cijena,
            datum: new Date()
        };

        const narudzbe_collection = db.collection('pizza_narudzbe');
        const rez = await narudzbe_collection.insertOne(narudzba);

        res.status(201).json({ message: 'Narudžba uspješno dodana!', narudzbaId: rez.insertedId });
    } catch (error) {
        console.error('Greška u dodavanju narudžbe:', error);
        res.status(500).json({ error: 'Dogodila se greška prilikom spremanja narudžbe.' });
    }
});

app.listen(PORT, error => {
    if (error) {
        console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
    } else {
    console.log(`Server dela na http://localhost:${PORT}`);
    }
});