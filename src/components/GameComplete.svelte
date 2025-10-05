<script lang="ts">
  import { screenData, gameState } from '../stores/gameStore';
  
  let data = $screenData.gameComplete;
  
  function handleRestartGame() {
    window.dispatchEvent(new CustomEvent('gameAction', {
      detail: { action: 'restartGame' }
    }));
  }
  
  function handleMainMenu() {
    gameState.update(state => ({
      ...state,
      currentScreen: 'start'
    }));
  }
</script>

<div class="game-complete-screen">
  <div class="screen-content">
    <h2 class="title">ВСЯ ИГРА ПРОЙДЕНА!</h2>
    <div class="subtitle">Поздравляем с полным прохождением!</div>
    
    <div class="stats">
      <div class="stat-item">Финальный счет: <span>{data.finalScore}</span></div>
      <div class="stat-item">Пройдено уровней: <span>{data.levelsCompleted}</span></div>
    </div>
    
    <div class="buttons">
      <button class="btn btn-primary" on:click={handleRestartGame}>
        Начать заново
      </button>
      <button class="btn btn-secondary" on:click={handleMainMenu}>
        Главное меню
      </button>
    </div>
  </div>
</div>

<style>
  .game-complete-screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .screen-content {
    background: rgba(0, 0, 0, 0.8);
    padding: 2rem;
    border-radius: 10px;
    border: 2px solid #ffff00;
    text-align: center;
    color: white;
    max-width: 500px;
  }
  
  .title {
    color: #ffff00;
    margin-bottom: 0.5rem;
    text-shadow: 0 0 20px #ffff00;
    font-size: 2.5rem;
  }
  
  .subtitle {
    color: #00ff88;
    margin-bottom: 2rem;
    font-size: 1.2rem;
  }
  
  .stats {
    margin: 2rem 0;
  }
  
  .stat-item {
    margin: 1rem 0;
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }
  
  .btn {
    padding: 0.8rem 1.5rem;
    margin: 0.5rem;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: bold;
    transition: all 0.3s ease;
  }
  
  .btn-primary {
    background: linear-gradient(45deg, #ffff00, #ffcc00);
    color: black;
  }
  
  .btn-primary:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 255, 0, 0.5);
  }
  
  .btn-secondary {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
  
  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.3);
  }
</style>
