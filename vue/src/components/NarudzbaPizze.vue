<template>
    <div>
      <h1>Naruči pizzu</h1>
      <p>Odaberite pizzu i unesite svoje podatke za narudžbu!</p>
      <button @click="submitOrder">Potvrdi narudžbu</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NarudzbaPizze', // Promijenjeno ime komponente u višerječno
    methods: {
      submitOrder() {
        alert('Narudžba potvrđena!');
      }
    }
  }
  </script>
  
  <style scoped>
  /* Stiliziranje komponente, ako je potrebno */
  h1 {
    color: #b61500;
  }
  </style>
  