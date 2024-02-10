<script setup lang="ts">
import {ref, onMounted} from 'vue';
import Engine from './game/Engine.ts';
import {Player} from './game/objects/Player.ts';
import {Keyboard} from './game/Keyboard.ts';
import {Background} from './game/objects/Background.ts';

const screen1 = ref();
const screen2 = ref();

function loop() {
  // console.log('loop');
}

onMounted(() => {
  if(!screen1.value || !screen2.value) return;

  Keyboard.init();

  Engine.init({
    screens: [
      {
        key: 'red',
        canvas: screen1.value
      },
      {
        key: 'blue',
        canvas: screen2.value
      }
    ],
    updateLoop: loop
  });

  const backgroundSpreadSize = 1000;
  const halfBackgroundSpreadSize = backgroundSpreadSize / 2;

  for (let index = 0; index < 20; index++) {
    const x = Math.round(Math.random()*backgroundSpreadSize) - halfBackgroundSpreadSize;
    const y = Math.round(Math.random()*backgroundSpreadSize) - halfBackgroundSpreadSize;

    new Background(x, y);
  }

  new Player(10, 10, 'red');
  new Player(100, 100, 'blue');
});
</script>

<template>
  <div class="app">
    <div class="game">
      <canvas class="screen1" ref="screen1"></canvas>
      <canvas class="screen2" ref="screen2"></canvas>
    </div>
    <div class="info">
      <div>Use WASD keys to move the red shape</div>
      <div>Use the arrow keys to move the blue shape</div>
    </div>
  </div>
</template>

<style scoped>
  .app {
    width: 100vw;
    height: 100vh;
    position: relative;
  }

  .game {
    background-color: white;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    gap: 1px;
  }

  .info {
    position: absolute;
    color: white;
    z-index: 10;
    display: flex;
    width: 100%;
    justify-content: space-around;
  }

  .screen1 {
    width: 50%;
    height: 100%;
  }
  .screen2 {
    width: 50%;
    height: 100%;
  }
</style>
