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
    <div class="scene-shadow" v-if="play.mode === 'battle'">
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
        display: false,
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
    },
    move(orientation) {
      this.$store.dispatch('moveSacha', orientation);
    },
  },
  created() {
    this.$store.dispatch('getEnvironment');
  },
  watch: {
    "sacha.y": function (y) {
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
}

.scene-shadow {
  position: absolute;
  background: rgba(255, 255, 255, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
} 
</style>
