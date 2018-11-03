<template>
  <div class="root">

    <div class="pokemon-name enemy">
      <div> BULBIZARRE </div>
      <div class="hp-zone">
        <HpBar v-bind:hp="enemyPokemeonHp" />
        <div class="arrow part-1"></div>
        <div class="arrow part-2"></div>
        <div class="arrow part-3"></div>
      </div>
    </div>
    <img class="pokemon-image sacha" src="@/assets/Salamèche_dos.png">

    <div class="pokemon-name sacha">
      <div style="float:right"> SALAMECHE </div>
      <div class="hp-zone">
        <HpBar style="float: right; margin-top: -14px;" v-bind:hp="sachaPokemeonHp" />
        <div style="float: right; margin-top: -7px;"> {{sachaPokemeonHp}}/ 10 </div>
        <div class="arrow part-1"></div>
        <div class="arrow part-2"></div>
        <div class="arrow part-3"></div>
      </div>
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
import HpBar from '@/components/HpBar.vue'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const pick = array =>  array[Math.floor(Math.random() * array.length)];

export default {
  components: {
    HpBar
  },
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
        this.$store.commit('RESTORE_ENEMY_POKEMON_HP');
        this.$emit('endOfBattle');
      } else {
        const enemyMove = pick(['FOUET LIANE', 'CHARGE']);
        await this.displayMessage(`BULBIZARRE ennemi utilise ${enemyMove}!`);
        this.$store.commit('DECREASE_SACHA_POKEMON_HP', 3);

        if (this.sachaPokemeonHp === 0) {
          await this.displayMessage(`SALAMECHE est KO!`);
        this.$store.commit('RESTORE_SACHA_POKEMON_HP');
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
  left: 45%;
  width: 53%;
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

.hp-zone {
  border-bottom: 7px solid black;
  border-radius: 5px;
  margin-top: 20px;
}

.sacha .hp-zone {
  width: 80%;
  float: right;
  margin-right: 32px;
  padding-right: 6px;
  padding-bottom: 5px;
  border-right: 7px solid black;
}

.enemy .hp-zone {
  width: 90%;
  margin-left: 8px;
  padding-left: 15px;
  padding-bottom: 15px;
  border-left: 7px solid black;
}

.arrow {
  background: black;
  width: 10px;
  height: 4px;
  position: absolute;
}

.arrow.part-1 {
  bottom: 0;
}
.arrow.part-2 {
  bottom: 6px;
  width: 17px;
}
.arrow.part-3 {
  bottom: 9px;
}

.sacha .arrow.part-1 {
  left: 9px;
}
.sacha .arrow.part-2 {
  left: 22px;
}
.sacha .arrow.part-3 {
  left: 29px;
}

.enemy .arrow.part-1 {
  right: -7px;
}
.enemy .arrow.part-2 {
  right: 6px;
}
.enemy .arrow.part-3 {
  right: 13px;
}

</style>
