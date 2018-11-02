<template>
  <div class="root">

    <div class="pokemon-name enemy">
      BULBIZARRE
      <br />
      HP: 7 
    </div>
    <img class="pokemon-image sacha" src="@/assets/Salamèche_dos.png">

    <div class="pokemon-name sacha">
      SALAMECHE
      <br />
      HP: 10/10
    </div>
    <img class="pokemon-image enemy" src="@/assets/Bulbizarre.png">

  </div>
</template>

<script>
export default {
  
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

</style>
