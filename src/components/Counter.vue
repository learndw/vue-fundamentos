<template>
  <h1>{{ defaultTitle }}</h1>
  <p data-testid="start">{{ valueReceive }}</p>
  <p data-testid="counter">{{ counter }}</p>
  <div>
    <button v-on:click="increase()">+</button>
    <button v-on:click="decrease()">-</button>
  </div>
</template>

<script>
export default {
  name: "Counter",
  props: {
    title: String,
    start: {
      type: Number,
      default: 100,
      //Significa que es obligatorio a menos que venga una valor por default lo cual ya seri innecearia esta validacion
      //required: true,

      validator(value) {
        return value > 0;
      },
    },
  },
  data() {
    return {
      counter: 2,
    };
  },
  methods: {
    increase() {
      return this.counter++;
    },
    decrease() {
      return this.counter--;
    },
  },
  computed: {
    defaultTitle() {
      return this.title || "Defecto";
    },
    valueReceive() {
      return this.start;
    },
  },
};
</script>

