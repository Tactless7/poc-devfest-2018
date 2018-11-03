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
        <button class="next-move-button" v-on:click="moveSelected('GRIFFE')">GRIFFE</button>
        <br/>
        <button class="next-move-button" v-on:click="moveSelected('FLAMECHE')">FLAMECHE</button>
        <br/>
        <button class="next-move-button">-</button>
        <br/>
        <button class="next-move-button">-</button>
      </div>
      <div v-if="message !== ''">
       {{ message }}
      </div>
    </div>

  </div>
</template>

<script>
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const pick = array =>  array[Math.floor(Math.random() * array.length)];

export default {
  data() {
    return {
      message: '',
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
    async displayMessage(message) {
      this.message = message;
      await delay(2000);
      this.message = '';
    },
    async moveSelected(move) {
      this.step = 'resolve battle turn';

      await this.displayMessage(`SALAMECHE utilise ${move}!`);
      this.$store.commit('DECREASE_ENEMY_POKEMON_HP', 4);

      if (this.enemyPokemeonHp === 0) {
        await this.displayMessage(`BULBIZARRE ennemi est KO!`);
        await this.displayMessage(`SALAMECHE a gagné 83 points EXP.!`);
        this.$emit('endOfBattle');
      } else {
        const enemyMove = pick(['FOUET LIANE', 'CHARGE']);
        await this.displayMessage(`BULBIZARRE ennemi utilise ${enemyMove}!`);
        this.$store.commit('DECREASE_SACHA_POKEMON_HP', 2);

        if (this.sachaPokemeonHp === 0) {
          await this.displayMessage(`SALAMECHE est KO!`);
          this.$emit('endOfBattle');
        } else {
          this.step = 'ask for next move';
        }
      }
      // 'Coup critique!'
      // 'C'est super efficace!'
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
