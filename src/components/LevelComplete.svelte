<!-- LevelComplete.svelte -->
<script lang="ts">
  import { gameEvents } from '../events/GameEvents';
  import { screenData } from '../stores/gameStore';
  
  let data = $screenData.levelComplete;
  
  function handleNextLevel() {
    gameEvents.emit('nextLevel');
  }
  
  function handleRestart() {   
    gameEvents.emit('restartLevel');
  }

  function handleMainMenu() {
    gameEvents.emit('mainMenu');
  }
</script>

<div class="level-complete-screen">
  <div class="screen-content">
    <!-- Анимация успеха -->
    <div class="success-animation">
      <div class="confetti">🎉</div>
      <div class="stars">
        {#each Array(6) as _, i}
          <div class="star" style="--i: {i};"></div>
        {/each}
      </div>
    </div>
    
    <!-- Заголовок -->
    <h2 class="title">{data.title || 'Уровень пройден!'}</h2>
    <div class="subtitle">Отличная работа! Так держать!</div>
    
    <!-- Статистика -->
    <div class="stats">
      <div class="stat-item">
        <span class="stat-label">Счет:</span>
        <span class="stat-value">{data.score}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Время прохождения:</span>
        <span class="stat-value">{data.survivalTime} сек</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Уничтожено астероидов:</span>
        <span class="stat-value">{data.asteroidsDestroyed}</span>
      </div>
    </div>
    
    <!-- Кнопки действий -->
    <div class="buttons">
      <button class="btn btn-next" on:click={handleNextLevel}>
        Следующий уровень
      </button>
      
      <button class="btn btn-retry" on:click={handleRestart}>
        Переиграть уровень
      </button>
      
      <button class="btn btn-menu" on:click={handleMainMenu}>
        Главное меню
      </button>
    </div>
    
    <!-- Поздравление -->
    <div class="congratulation">
      "Превосходный результат!"
    </div>
  </div>
</div>

<style>
  .level-complete-screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(10, 26, 10, 0.95);
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
    border: 2px solid #00ff88;
    text-align: center;
    color: white;
    max-width: 500px;
    backdrop-filter: blur(10px);
  }
  
  .success-animation {
    position: relative;
    margin-bottom: 2rem;
  }
  
  .confetti {
    position: absolute;
    top: -10px;
    left: -20px;
    font-size: 3rem;
    animation: celebrate 1s ease-out;
  }
  
  .stars {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
  }
  
  .star {
    position: absolute;
    width: 4px;
    height: 20px;
    background: #ffff00;
    border-radius: 2px;
    transform: rotate(calc(var(--i) * 60deg)) translateY(-40px);
    animation: star 1s ease-out forwards;
    animation-delay: calc(var(--i) * 0.1s);
    opacity: 0;
  }
  
  .title {
    color: #00ff88;
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    text-shadow: 0 0 20px #00ff88;
  }
  
  .subtitle {
    color: #88ffaa;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }
  
  .stats {
    margin: 2rem 0;
    background: rgba(255, 255, 255, 0.1);
    padding: 0.5rem;
    border-radius: 10px;
  }
  
  .stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
  }
  
  .stat-label {
    color: #ccffcc;
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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    padding: 1rem 2rem;
    border: none;
    border-radius: 25px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .btn-next {
    background: linear-gradient(45deg, #00ff88, #66ffaa);
    color: #003311;
  }
  
  .btn-next:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
  }
  
  .btn-retry {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
  
  .btn-retry:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  .btn-menu {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
  
  .btn-menu:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  .congratulation {
    color: #88ffaa;
    font-style: italic;
    margin-top: 1rem;
    font-size: 0.9rem;
  }
  
  @keyframes celebrate {
    0% { transform: scale(0) rotate(0deg); opacity: 0; }
    50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
    100% { transform: scale(1) rotate(360deg); opacity: 1; }
  }
  
  @keyframes star {
    0% { transform: rotate(calc(var(--i) * 60deg)) translateY(0); opacity: 1; }
    100% { transform: rotate(calc(var(--i) * 60deg)) translateY(-40px); opacity: 0; }
  }
</style>
