<script lang="ts">
import { statState, playerState } from '../stores/gameStore';

export let customClass: string = '';
export let showPowerBar: boolean = true;
export let compact: boolean = false;

$: level = $statState.level;
$: gameTime = $statState.gameTime;
$: score = $statState.score;
$: power = $statState.power;
$: armor = $playerState.armor;

$: formattedTime = Math.max(0, Math.floor(gameTime));
$: powerPercent = Math.min(100, Math.max(0, power));

  console.log('HUD: statState updated', { score, power, level });
</script>

<div class="hud-panel {customClass}">
  <div class="hud {compact ? 'compact' : ''}" id="hud">
    <div class="level-display">Level: <span id="level">{level}</span></div>
    <div class="time-display">Time: <span id="time">{formattedTime}</span>s</div>
    <div class="score-display">Score: <span id="score">{score}</span></div>
    <div class="armor-display">Armor: <span id="score">{armor}</span></div>
    {#if showPowerBar}
      <div class="power-display">
        Power:
        <div class="power-bar">
          <div 
            class="power-fill" 
            id="powerFill"
            style="width: {powerPercent}%"
          ></div>
        </div>
        {#if !compact}
          <span class="power-percent">{Math.round(powerPercent)}%</span>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .hud-panel {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 1000;
  }

  .hud {
    background: rgba(0, 0, 0, 0.3);
    color: white;
    font-size: 12px;
    font-weight: bold;
    text-shadow: 0 0 10px #00ffff;
    padding: 15px;
    border-radius: 15px;
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .hud.compact {
    padding: 10px;
    gap: 4px;
    font-size: 11px;
  }

  .level-display {
    color: #00ff88;
    text-shadow: 0 0 10px #00ff88;
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
    color: #ff66ff;
    text-shadow: 0 0 10px #ff66ff;
  }

  .power-bar {
    width: 100px;
    height: 8px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .hud.compact .power-bar {
    width: 80px;
    height: 6px;
  }

  .power-fill {
    height: 100%;
    background: linear-gradient(90deg, #ff66ff, #ff00ff);
    border-radius: 4px;
    transition: width 0.3s ease;
    box-shadow: 0 0 8px #ff00ff;
  }

  .power-percent {
    font-size: 10px;
    opacity: 0.8;
  }
</style>
