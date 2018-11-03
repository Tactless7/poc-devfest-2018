<template>
  <div class="root">

    <div class="pokemon-name enemy">
      BULBIZARRE
      <br />
      HP: {{ enemyPokemeonHp }}
    </div>
    <img class="pokemon-image sacha" src="@/assets/Salamèche_dos.png">

    <div class="pokemon-name sacha">
      SALAMECHE
      <br />
      HP: {{sachaPokemeonHp}}/ 10
    </div>
    <img class="pokemon-image enemy" src="@/assets/Bulbizarre.png">

    <div class="message">
      <div class="move-buttons" v-if="step === 'ask for next move'">
        <button class="next-move-button" v-on:click="moveSelected">CHARGE</button>
        <br/>
        <button class="next-move-button" v-on:click="moveSelected">FOUET LIANE</button>
        <br/>
        <button class="next-move-button">-</button>
        <br/>
        <button class="next-move-button">-</button>
      </div>

    </div>

  </div>
</template>

<script>
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export default {
  data() {
    return {
      step: 'ask for next move'
    };
  },
  computed: {
    enemyPokemeonHp() {
      return this.$store.state.enemy.pokemon.hp
    },
    sachaPokemeonHp() {
      return this.$store.state.sacha.pokemon.hp
    }
  },
  methods: {
    async moveSelected() {
      this.step = 'show results'
      await delay(2000)
      this.step = 'ask for next move';
    }
  }
}
</script>

<style scoped>

.root {
  position: absolute;
  width: 70%;
  height: 70%;
  top: 15%;
  left: 15%;
  background: #f8f8f8;
  z-index: 2;
  border:#aaa solid 2px; 
}

.pokemon-image {
  image-rendering: pixelated;
  position: absolute;
  width: 35%;
}

.sacha.pokemon-image  {
  left: 4%;
  bottom: 30%;
}

.enemy.pokemon-image {
  right: 3%;
  top: 0;;
}

.pokemon-name {
  position: absolute;
  font-size: 180%;
  color: black;
}

.sacha.pokemon-name {
  top: 40%;
  left: 50%;
}

.enemy.pokemon-name {
  top: 0%;
  left: 5%;
}

.message {
  position: absolute;
  width: 85%;
  height: 15%;
  bottom: 0;
  left: 0;
  border: #888 solid 2px;
}

.move-buttons {
  position: absolute;
  width: 60%;
  top: 0;
  right: 0;
}

.next-move-button {
  margin-top: -8px;
  border: 0px;
  background: transparent;
  font-family: pokemon;
  font-size: 160%;
}
</style>
