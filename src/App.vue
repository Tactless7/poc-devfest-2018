<template>
  <div class="display"
    ref="game"
    tabindex="0"
    v-on:keypress.up="move('up')"
    v-on:keypress.down="move('down')"
    v-on:keypress.left="move('left')"
    v-on:keypress.right="move('right')"
  >
    <Scene />
    <!-- <Grid /> -->
    <Sacha
      v-if="sacha.display"
    />
    <GreetingsMessage v-on:greetingsFinished="startGame()" />
  </div>
</template>

<script>
import Scene from '@/components/Scene.vue';
import Sacha from '@/components/Sacha.vue';
import Grid from '@/components/Grid.vue';
import GreetingsMessage from '@/components/GreetingsMessage.vue';

export default {
  components: {
    Scene,
    Sacha,
    Grid,
    GreetingsMessage,
  },
  data() {
    return {
      sacha: {
        display: false,
      },
    };
  },
  computed: {
    typeOfCurrentSquare() {
      return this.$store.getters.typeOfCurrentSquare;
    }
  },
  watch: {
    typeOfCurrentSquare(type) {
      if (type === 'grass') {
        alert('Battle!');
      }
    }
  },
  methods: {
    startGame() {
      this.sacha.display = true;
      this.$refs.game.focus();
    },
    move(orientation) {
      this.$store.dispatch('moveSacha', orientation);
    },
  },
  created() {
    this.$store.dispatch('getEnvironment');
  },
};
</script>

<style>
@font-face {
  font-family: pokemon;
  src: url(/fonts/pokemon-font.woff);
}

.display {
  position: relative;
  display: inline-block;
  font-family: pokemon;
  outline: none;

  /* center the display (for this we have to specify precise width and height
  here */
  width: 802px;
  height: 722px;
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
