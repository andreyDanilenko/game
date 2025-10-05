<!-- src/components/GameOverScreen.svelte -->
<script lang="ts">
  export let isVisible = false;
  export let title = 'GAME OVER';
  export let finalScore = 0;
  export let survivalTime = 0;
  export let asteroidsDestroyed = 0;
  export let onRestart: () => void = () => {};
</script>

{#if isVisible}
  <div class="game-over" id="gameOver">
    <h2 id="gameResult">{title}</h2>
    <div class="stats">
      <div class="stat-item">Final Score: <span>{finalScore}</span></div>
      <div class="stat-item">Survival Time: <span>{survivalTime}</span>s</div>
      <div class="stat-item">Asteroids Destroyed: <span>{asteroidsDestroyed}</span></div>
    </div>
    <button class="restart-button" on:click={onRestart}>PLAY AGAIN</button>
  </div>
{/if}

<style>
  /* Скопируй стили из CSS для .game-over */
  .game-over {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.8);
    padding: 2rem;
    border-radius: 10px;
    color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .restart-button {
    padding: 0.5rem 1.5rem;
    font-size: 1.1rem;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
