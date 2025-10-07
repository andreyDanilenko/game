<script lang="ts">
  import { screenState } from '../stores/gameStore';
  import StartScreen from './StartScreen.svelte';
  import LevelComplete from './LevelComplete.svelte';
  import LevelFailed from './LevelFailed.svelte';
  import GameComplete from './GameComplete.svelte';
    import HubPanel from './HubPanel.svelte';
  
  $: currentScreen = $screenState;
</script>

<div class="game-container">
  <canvas id="gameCanvas"></canvas>
  
  <!-- Существующий HTML UI (пока оставляем для HUD и контролов) -->
  <div class="ui-overlay">
    <!-- HUD -->
    <div class="hud" id="hud" style="display: none;">
      <div class="armor-display">Level: <span id="level">1</span></div>
      <div class="time-display">Time: <span id="time">60</span>s</div>
      <div class="score-display">Score: <span id="score">0</span></div>
      <div class="armor-display">: <span id="armor">3</span></div>
      <div class="power-display">:
        <div class="power-bar">
          <div class="power-fill" id="powerFill"></div>
        </div>
      </div>
    </div>
    
    <!-- Level Objectives -->
    <div class="level-objectives" id="levelObjectives">
      <!-- Динамически будет заполняться через JS -->
    </div>
  </div>
</div>

<div class="svelte-ui-layer">
  {#if currentScreen === 'start'}
    <StartScreen class="interactive" />
  {:else if currentScreen === 'game'}
    <HubPanel class="interactive" />
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
