<template>
  <div class="narudzba-pice">
    <h1><strong>Napravite svoju narudžbu</strong></h1>
    
    <form @submit.prevent="posaljiNarudzbu">
      <div class="mb-3">
        <label for="ime" class="form-label">Ime:</label>
        <input v-model="ime" id="ime" type="text" class="form-control" placeholder="Vaše ime" required />
      </div>

      <div class="mb-3">
        <label for="adresa" class="form-label">Adresa:</label>
        <input v-model="adresa" id="adresa" type="text" class="form-control" placeholder="Vaša adresa" required />
      </div>

      <div class="mb-3">
        <label for="telefon" class="form-label">Telefon:</label>
        <input v-model="telefon" id="telefon" type="text" class="form-control" placeholder="Vaš broj telefona" required />
      </div>

      <h2><strong>Odaberite pizze</strong></h2>
      <div v-for="(stavka, index) in pizza_stavke" :key="index" class="pizza-stavka mb-3 p-3 border rounded">
        <div class="mb-3">
          <label for="naziv" class="form-label">Naziv pizze:</label>
          <select v-model="stavka.naziv" id="naziv" class="form-select" required>
            <option disabled value="">Odaberite pizzu</option>
            <option v-for="pizza in sve_pizze" :key="pizza._id" :value="pizza.naziv">
              {{ pizza.naziv }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label for="kolicina" class="form-label">Količina:</label>
          <input v-model.number="stavka.kolicina" id="kolicina" type="number" step="0.5" min="0.5" class="form-control" placeholder="Količina" required />
        </div>

        <div class="mb-3">
          <label for="velicina" class="form-label">Veličina:</label>
          <select v-model="stavka.velicina" id="velicina" class="form-select" required>
            <option disabled value="">Odaberite veličinu</option>
            <option value="mala">Mala</option>
            <option value="srednja">Srednja</option>
            <option value="velika">Velika</option>
          </select>
        </div>

        <button type="button" @click="ukloni_stavku(index)" class="btn btn-light">
          Ukloni ovu stavku
        </button>
      </div>

      <button type="button" @click="dodaj_stavku" class="btn btn-dodaj-pizzu mb-3">
        Dodaj pizzu
      </button>

      <button type="submit" class="btn btn-posaljipnarudzbu">
        Pošalji narudžbu
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ime: '',
      adresa: '',
      telefon: '',
      pizza_stavke: [
        {
          naziv: '',
          kolicina: 1,
          velicina: ''
        }
      ],
      sve_pizze: []
    };
  },
  methods: {
    async fetch_pizze_iz_pizzecollection() {
      try {
        const odg = await fetch('http://localhost:3000/pizze');
        if (!odg.ok) {
          throw new Error('Greska.');
        }
        this.sve_pizze = await odg.json();
      } catch (error) {
        console.error('Greska:', error);
        alert('Greska.');
      }
    },
    dodaj_stavku() {
      this.pizza_stavke.push({
        naziv: '',
        kolicina: 1,
        velicina: ''
      });
    },
    ukloni_stavku(index) {
      this.pizza_stavke.splice(index, 1);
    },
    async posaljiNarudzbu() {
      try {
        const narudzba = {
          ime: this.ime,
          adresa: this.adresa,
          telefon: this.telefon,
          pizza_stavke: this.pizza_stavke
        };

        const odg = await fetch('http://localhost:3000/narudzba', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(narudzba)
        });

        if (!odg.ok) {
          const error_data = await odg.json();
          alert(`Greška: ${error_data.error}`);
        } else {
          const odg_data = await odg.json();
          alert(`Uspješno poslana narudzba! ID: ${odg_data.narudzbaId}`);
          this.resetForm();
        }
      } catch (error) {
        console.error('Greska:', error);
        alert('Greska! Pokusajte ponovno.');
      }
    },
    resetForm() {
      this.ime = '';
      this.adresa = '';
      this.telefon = '';
      this.pizza_stavke = [
        {
          naziv: '',
          kolicina: 1,
          velicina: ''
        }
      ];
    }
  },
  mounted() {
    this.fetch_pizze_iz_pizzecollection();
  }
};
</script>

<style scoped>
.narudzba-pice {
  max-width: 800px;
  margin: 0 auto;
}

form {
  display: flex;
  flex-direction: column;
}

.pizza-stavka {
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 8px;
}

button {
  margin-top: 15px;
  padding: 10px;
  font-size: 16px;
}

button:hover {
  opacity: 0.8;
}

.btn-light {
  background-color: #d3d3d3;
  color: #000;
  border: 1px solid #ccc;
}

.btn-light:hover {
  background-color: #b0b0b0;
  color: #fff;
}

.btn-dodaj-pizzu {
  background-color: #dc6b29;
  color: white;
  border: 1px solid #dc6b29;
}

.btn-dodaj-pizzu:hover {
  background-color: #b8581e;
}

.btn-posaljipnarudzbu {
  background-color: #b61500;
  color: white;
  border: 1px solid #b61500;
}

.btn-posaljipnarudzbu:hover {
  background-color: #9a1300;
}
</style>
