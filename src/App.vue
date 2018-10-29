<template>
  <div class="display">
    <Scene />
    <Sacha v-if="displaySacha" />
    <GreetingsMessage v-on:greetingsFinished="displaySacha = true" />
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
      displaySacha: false,
    };
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
