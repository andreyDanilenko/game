<script lang="ts">
import { screenState } from '../stores/gameStore';
import StartScreen from './StartScreen.svelte';
import LevelComplete from './LevelComplete.svelte';
import LevelFailed from './LevelFailed.svelte';
import GameComplete from './GameComplete.svelte';
import HubPanel from './HubPanel.svelte';
import LevelObjectives from './LevelObjectives.svelte';
import LevelMap from './LevelMap/LevelMap.svelte';

$: currentScreen  = $screenState;
</script>

<div class="game-container">
  <canvas id="gameCanvas"></canvas>
</div>

<div class="svelte-ui-layer">
  {#if currentScreen === 'start'}
    <StartScreen />
  {:else if currentScreen === 'mapGame'}
    <LevelMap />
  {:else if currentScreen === 'game'}
    <HubPanel  />
    <LevelObjectives />
  {:else if currentScreen === 'levelComplete'}
    <LevelComplete  />
  {:else if currentScreen === 'levelFailed'}
    <LevelFailed  />
  {:else if currentScreen === 'gameComplete'}
    <GameComplete  />
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

.svelte-ui-layer :global(button),
.svelte-ui-layer :global(input),
.svelte-ui-layer :global(select) {
  pointer-events: all;
}
</style>
