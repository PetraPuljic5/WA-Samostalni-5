<template>
  <div id="app">
    <!-- Header -->
    <header class="bg-primary text-white text-center py-5">
      <h1>Petra's Crust</h1>
      <p>Bla bla, nešto nešto.</p>
    </header>

    <main class="container my-5">
      <div class="row">
        <div 
          class="col-md-4 mb-4" 
          v-for="pizza in pizzas" 
          :key="pizza._id"
        >
          <div class="card" style="width: 100%;">
            <img 
              :src="pizza.slika" 
              class="card-img-top" 
              :alt="pizza.naziv"
            >
            <div class="card-body">
              <h5 class="card-title">{{ pizza.naziv }}</h5>
              <p class="card-text"><strong>Cijena:</strong> {{ pizza.cijena }} €</p>
              <p class="card-text"><strong>Sastojci:</strong> {{ pizza.sastojci.join(', ') }}</p>
              <a :href="'/pizze/' + pizza._id" class="btn btn-primary">Saznaj više</a>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-dark text-white text-center py-4">
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
</style>
