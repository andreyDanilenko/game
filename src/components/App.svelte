<script lang="ts">
  import { gameState } from '../stores/gameStore';
  import StartScreen from './StartScreen.svelte';
  import LevelComplete from './LevelComplete.svelte';
  import LevelFailed from './LevelFailed.svelte';
  import GameComplete from './GameComplete.svelte';
  
  $: currentScreen = $gameState.currentScreen;
</script>

<!-- Слой UI -->
<div class="svelte-ui-layer">
  {#if currentScreen === 'start'}
    <StartScreen class="interactive" />
  
  {:else if currentScreen === 'levelComplete'}
    <LevelComplete class="interactive" />
  
  {:else if currentScreen === 'levelFailed'}
    <LevelFailed class="interactive" />
  
  {:else if currentScreen === 'gameComplete'}
    <GameComplete class="interactive" />
  {/if}
</div>

<style>
  .svelte-ui-layer {
    position: fixed;
    inset: 0;
    z-index: 1000;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .svelte-ui-layer :global(.interactive),
  .svelte-ui-layer :global(button),
  .svelte-ui-layer :global(input),
  .svelte-ui-layer :global(select) {
    pointer-events: all;
  }
</style>
