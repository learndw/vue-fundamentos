<template>
<div class="container">
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <counter title="Primero"></counter> -->
  <!-- <counter :start="5"></counter> -->
  <indecision></indecision>
</div>
</template>

<script>
//import  Counter from "@/components/Counter.vue";
import  Indecision from "@/components/Indecision.vue";
export default {
  name: 'App',
  components: {
    Indecision
  }
}
</script>

<style>
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
}

img{
  width: 250px;
}

button{
  margin: 3px;
  font-size: 18px;
}
</style>