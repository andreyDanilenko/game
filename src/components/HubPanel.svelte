<script lang="ts">
  import { statState } from '../stores/gameStore';
  // import SpeedControl from './SpeedControl.svelte';
  // import ZoomControl from './ZoomControl.svelte';

    console.log('statState', statState);

  
//   let showControls = false;
//   $: controlsVisible = showControls && $screenState === 'game';
  
</script>
<div class="hud-panel">
  <div class="hud" id="hud">
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
.hud-panel {
    top: 0;
    left: 0;
    pointer-events: none;
}

.hud {
    position: absolute;
    z-index: 1000;
    top: 20px;
    left: 20px;
    background-color: aqua;
    color: white;
    font-size: 12px;
    font-weight: bold;
    text-shadow: 0 0 10px #00ffff;
    background: rgba(0, 0, 0, 0.3);
    padding: 15px;
    border-radius: 15px;
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.time-display {
    color: #ff6666;
    text-shadow: 0 0 10px #ff6666;
}

.score-display {
    color: #ffff00;
    text-shadow: 0 0 10px #ffff00;
}

.armor-display {
    color: #00ff88;
    text-shadow: 0 0 10px #00ff88;
}

.power-display {
    display: flex;
    gap: 2px;
    color: #ff66ff;
    text-shadow: 0 0 10px #ff66ff;
}

.power-bar {
    width: 100px;
    height: 8px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    margin-top: 5px;
    overflow: hidden;
}

.power-fill {
    height: 100%;
    background: linear-gradient(90deg, #ff66ff, #ff00ff);
    width: 0%;
    transition: width 0.3s ease;
}

</style>
