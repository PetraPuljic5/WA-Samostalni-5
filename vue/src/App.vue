<template>
  <div id="app">
    <header class="header py-5">
      <h1>
        <i class="fa-solid fa-pizza-slice"></i> Petra's Crust
      </h1>
      <p>Tamo gdje tijesto postaje umjetnost!</p>
    </header>

    <main class="container my-5">
      <div class="row">
        <div 
          class="col-md-4 mb-4" 
          v-for="pizza in pizzas" 
          :key="pizza._id"
        >
          <div class="card">
            <img 
              :src="pizza.slika" 
              class="card-img-top" 
              :alt="pizza.naziv"
            >
            <div class="card-body">
              <h5 class="card-title">{{ pizza.naziv }}</h5>
              <p class="card-text"><strong>Cijena:</strong> {{ pizza.cijena }} €</p>
              <p class="card-text"><strong>Sastojci:</strong> {{ pizza.sastojci.join(', ') }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer py-4">
      <p>© 2024 Pizzeria Petra’s Crust.</p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      pizzas: []
    };
  },
  mounted() {
    axios.get('http://localhost:3000/pizze')
      .then(response => {
        this.pizzas = response.data;
      })
      .catch(error => {
        console.error('Greška pri dohvaćanju podataka:', error);
      });
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Lobster&family=Bungee&family=Chewy&family=Fredericka+the+Great&display=swap');

body {
  background-color: #f3c681;
  font-family: 'Arial', sans-serif;
  color: #b61500;
  margin: 0;
  padding: 0;
}

.header {
  background-color: #dc6b29;
  color: #ffffff;
  text-align: center;
}

.header h1 {
  font-family: 'Chewy', cursive;
  font-size: 3.5rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.header p {
  font-size: 1.2rem;
  margin-top: 0.5rem;
}

.card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid #dc6b29;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-img-top {
  max-height: 200px;
  object-fit: cover;
}

.card-body {
  padding: 1rem;
  background-color: #fff;
}

.card-title {
  color: #b61500;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.card-text {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.card:hover {
  transform: scale(1.02);
  transition: transform 0.3s ease;
}

.footer {
  background-color: #b61500;
  color: #ffffff;
  text-align: center;
}

.footer p {
  margin: 0;
}
</style>