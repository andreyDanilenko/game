<script lang="ts">
  export let isVisible = false;
  export let title = 'GAME OVER';
  export let finalScore = 0;
  export let survivalTime = 0;
  export let asteroidsDestroyed = 0;
  export let buttonText = 'PLAY AGAIN';
  export let onButtonClick: () => void = () => {};
  
  export let showStats = true;
  export let titleColor = '#ffffff';
  export let titleShadow = '0 0 10px rgba(255,255,255,0.5)';
</script>

{#if isVisible}
  <div class="game-over" id="gameOver">
    <h2 id="gameResult" style="color: {titleColor}; text-shadow: {titleShadow};">{title}</h2>
    
    {#if showStats}
      <div class="stats">
        <div class="stat-item">Final Score: <span>{finalScore}</span></div>
        <div class="stat-item">Survival Time: <span>{survivalTime}</span>s</div>
        <div class="stat-item">Asteroids Destroyed: <span>{asteroidsDestroyed}</span></div>
      </div>
    {/if}
    
    <button class="restart-button" on:click={onButtonClick}>{buttonText}</button>
  </div>
{/if}

<style>
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
    z-index: 1000;
  }
  .restart-button {
    padding: 0.5rem 1.5rem;
    font-size: 1.1rem;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
  }
  .restart-button:hover {
    background: #45a049;
  }
</style>
