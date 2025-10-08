<script lang="ts">
  import { gameEvents } from '../events/GameEvents';
  import { screenData, screenState } from '../stores/gameStore';
  
  let data = $screenData.gameComplete;
  
  function handleRestartGame() {
    gameEvents.emit('restartGame');
  }
  
  function handleMainMenu() {
    screenState.set('start');
  }
</script>

<div class="game-complete-screen">
  <div class="screen-content">
    <div class="trophy">🏆</div>
    <h2 class="title">ПОБЕДА!</h2>
    <div class="subtitle">Игра пройдена!</div>
    
    <div class="stats">
      <div class="stat-item">
        <span class="stat-label">Финальный счет:</span>
        <span class="stat-value">{data.finalScore}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Уровней пройдено:</span>
        <span class="stat-value">{data.levelsCompleted}</span>
      </div>
    </div>
    
    <div class="buttons">
      <button class="btn btn-primary" on:click={handleRestartGame}>
        Новая игра
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
    background: rgba(10, 10, 26, 0.95);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .screen-content {
    background: rgba(68, 255, 136, 0.1);
    padding: 2rem;
    margin: 20px;
    border-radius: 20px;
    border: 2px solid #ffff00;
    text-align: center;
    color: white;
    width: 100%;
    max-width: 500px;
    backdrop-filter: blur(10px);
  }
  
  .trophy {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: bounce 2s ease-in-out infinite;
  }
  
  .title {
    color: #ffff00;
    font-size: 2rem;
    margin-bottom: 0.5rem;
    text-shadow: 0 0 20px #ffff00;
  }
  
  .subtitle {
    color: #88ffaa;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }
  
  .stats {
    margin: 2rem 0;
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 10px;
  }
  
  .stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
  }
  
  .stat-label {
    color: #ccccff;
  }
  
  .stat-value {
    color: #ffffff;
    font-weight: bold;
  }
  
  .buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 2rem 0;
  }
  
  .btn {
    padding: 1rem 2rem;
    border: none;
    border-radius: 25px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
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
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
</style>
