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
</script>

<div class="level-complete-screen">
  <div class="screen-content">
    <h2 class="title">{data.title || 'Уровень пройден!'}</h2>
    
    <div class="stats">
      <div class="stat-item">Счет: <span>{data.score}</span></div>
      <div class="stat-item">Уничтожено астероидов: <span>{data.asteroidsDestroyed}</span></div>
    </div>
    
    <div class="buttons">
      <button class="btn btn-primary" on:click={handleNextLevel}>
        Следующий уровень
      </button>
      <button class="btn btn-secondary" on:click={handleRestart}>
        Переиграть уровень
      </button>
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
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .screen-content {
    background: rgba(0, 0, 0, 0.8);
    padding: 2rem;
    border-radius: 10px;
    border: 2px solid #00ff88;
    text-align: center;
    color: white;
  }
  
  .title {
    color: #00ff88;
    margin-bottom: 1rem;
    text-shadow: 0 0 10px #00ff88;
  }
  
  .btn {
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-primary {
    background: #00ff88;
    color: black;
  }
  
  .btn-secondary {
    background: #666;
    color: white;
  }
</style>
