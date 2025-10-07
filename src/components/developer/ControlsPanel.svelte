<script lang="ts">
  import { screenState } from '../../stores/gameStore';
  // import SpeedControl from './SpeedControl.svelte';
  // import ZoomControl from './ZoomControl.svelte';

  console.log();
  
  
  let showControls = false;
  // $: controlsVisible = showControls && $screenState === 'game';
  
</script>

<div class="controls-panel">
  <div class="hud" id="hud" style="display: none;">
    <div class="armor-display">Level: <span id="level">1</span></div>
    <div class="time-display">Time: <span id="time">60</span>s</div>
    <div class="score-display">Score: <span id="score">0</span></div>
    <div class="armor-display">Armor: <span id="armor">3</span></div>
    <div class="power-display">Power:
      <div class="power-bar">
        <div class="power-fill" id="powerFill"></div>
      </div>
    </div>
  </div>
</div>

<style>
  .controls-panel {
    opacity: 0.5;
    position: absolute;
    left: 20px;
    top: 20px;

  }

</style>
