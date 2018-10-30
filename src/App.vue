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
    <Sacha
      v-if="sacha.display"
      v-bind:x="sacha.x"
      v-bind:y="sacha.y"
    />
    <GreetingsMessage v-on:greetingsFinished="startGame()" />
  </div>
</template>

<script>
import Scene from '@/components/Scene.vue';
import Sacha from '@/components/Sacha.vue';
import GreetingsMessage from '@/components/GreetingsMessage.vue';

export default {
  components: {
    Scene,
    Sacha,
    GreetingsMessage,
  },
  data() {
    return {
      sacha: {
        x: 400,
        y: 150,
        display: false,
      },
    };
  },
  methods: {
    startGame() {
      this.sacha.display = true;
      this.$refs.game.focus();
    },
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
}
</style>
