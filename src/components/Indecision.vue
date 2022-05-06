<template>
  <h1>Indesicion</h1>
  <img v-if="image" :src="image" />
  <br />
  <div class="bg-dark"></div>
  <input type="text" placeholder="Haz una pregunta" v-model="question" />
  <p>Recuerda terminar con un signo de interrogacion (?)</p>

  <div>
    <h2>{{ question }}</h2>
    <h1>{{ answer }}</h1>
  </div>
</template>

<script>
export default {
  name: "Indesicion",
  data() {
    return {
      question: null,
      answer: null,
      image: "https://via.placeholder.com/250",
      isValidQuestion: false,
    };
  },
  methods: {
    async getAnswer() {
      this.answer = "Pensando ...";

      try {
        const { answer, image } = await fetch("https://yesno.wtf/api").then(
          (r) => r.json()
        );

        this.image = image;
        switch (answer) {
          case "yes":
            this.answer = "Si";
            break;
          case "no":
            this.answer = "No";
            break;
        }
      } catch (error) {
        console.log('Indesicion Component',error);
        this.answer = "Error al cargar";
        this.image = null;
      }
    },
  },
  //Observable que sta pendiente del valor actual y anterior de una propiedad
  watch: {
    question(value, oldValue) {
      this.isValidQuestion = false;
      console.log(value);
      if (!value.includes("?")) return;
      this.getAnswer();
    },
  },
};
</script>


