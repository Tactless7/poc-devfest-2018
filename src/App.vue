<template>
  <div class="display"
    ref="game"
    tabindex="0"
    v-on:keypress.up="sacha.y -= 40"
    v-on:keypress.down="sacha.y += 40"
    v-on:keypress.left="sacha.x -= 40"
    v-on:keypress.right="sacha.x += 40"
  >
    <Scene />
    <!-- <Grid /> -->
    <Sacha
      v-if="sacha.display"
      v-bind:x="sacha.x"
      v-bind:y="sacha.y"
    />
    <div v-if="play.mode === 'battle'">
      <Battle v-on:endOfBattle="play.mode = 'move'"/>
    </div>
    <GreetingsMessage v-on:greetingsFinished="startGame()" />
  </div>
</template>

<script>
import Scene from '@/components/Scene.vue';
import Sacha from '@/components/Sacha.vue';
import Grid from '@/components/Grid.vue';
import GreetingsMessage from '@/components/GreetingsMessage.vue';
import Battle from '@/components/Battle.vue';

export default {
  components: {
    Scene,
    Sacha,
    Grid,
    GreetingsMessage,
    Battle
  },
  data() {
    return {
      sacha: {
        x: 10 * 40 - 20 + 2,
        y: 4 * 40 - 20,
        display: false
      },
      play: {
        mode: 'move'
      } 
    };
  },
  methods: {
    startGame() {
      this.sacha.display = true;
      this.$refs.game.focus();
    }
  },
  created() {
    this.$store.dispatch('getEnvironment');
  },
  watch: {
    'sacha.y': function(y) {
      // For now, until we have proper zone management, we switch to battle mode
      // whenever sacha go at the top of the scene.
      if (y < 90) {
        this.play.mode = 'battle'
      } else {
        this.play.mode = 'move'
      } 
    } 
  }
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
