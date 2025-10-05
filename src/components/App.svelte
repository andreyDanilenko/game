<script lang="ts">
  import { gameState } from '../stores/gameStore';
  import StartScreen from './StartScreen.svelte';
  import LevelComplete from './LevelComplete.svelte';
  import LevelFailed from './LevelFailed.svelte';
  import GameComplete from './GameComplete.svelte';
  
  $: currentScreen = $gameState.currentScreen;

  console.log('currentScreen');
  
</script>

<div class="svelte-ui-layer">
  {#if currentScreen === 'start'}
    <StartScreen />
  
  {:else if currentScreen === 'levelComplete'}
    <LevelComplete />
  
  {:else if currentScreen === 'levelFailed'}
    <LevelFailed />
  
  {:else if currentScreen === 'gameComplete'}
    <GameComplete />
  {/if}
</div>

<style>
  .svelte-ui-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    pointer-events: none;
  }
  
  .svelte-ui-layer > * {
    pointer-events: all;
  }
</style>
