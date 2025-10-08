<script lang="ts">
    import { gameEvents } from '../events/GameEvents';
  import { screenState } from '../stores/gameStore';
  
  function startGame() {
    gameEvents.emit('startGame');
  }

  function startMap() {
    screenState.set('mapGame');
  }
  
  function showStats() {
    // переход к статистике
  }
  
  function showRules() {
    // переход к правилам
  }
  
  function showCreators() {
    // переход к создателям
  }
  
  function showLevelEditor() {
    // переход к редактору уровней
  }
</script>

<div class="main-menu-screen">
  <div class="screen-content">
    <!-- Заголовок -->
    <h1 class="game-title">КОСМИЧЕСКИЙ БОЙ</h1>
    <div class="game-subtitle">Защити галактику!</div>
    
    <!-- Основные кнопки -->
    <div class="menu-buttons">
      <button class="menu-btn btn-primary" on:click={startGame}>
        <span class="btn-text">Начать игру</span>
      </button>

      <button class="menu-btn" on:click={startMap}>
        <span class="btn-text">Карта</span>
      </button>
      
      <button class="menu-btn" on:click={showStats}>
        <span class="btn-text">Статистика</span>
      </button>
      
      <button class="menu-btn" on:click={showRules}>
        <span class="btn-text">Правила</span>
      </button>
      
      <button class="menu-btn" on:click={showCreators}>
        <span class="btn-text">Создатели</span>
      </button>
      
      <button class="menu-btn btn-special" on:click={showLevelEditor}>
        <span class="btn-text">Собрать свой уровень</span>
        <span class="badge">SOON</span>
      </button>
    </div>
    
    <div class="footer">
      <div class="version">Версия 1.4.1</div>
    </div>
  </div>
</div>

<style>
  .main-menu-screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #0a0a1a 0%, #1a0a2a 50%, #0a1a2a 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .screen-content {
    background: rgba(10, 10, 26, 0.95);
    padding: 3rem 2rem;
    margin: 20px;
    border-radius: 20px;
    border: 2px solid #00ff88;
    text-align: center;
    color: white;
    max-width: 500px;
    width: 90%;
    backdrop-filter: blur(10px);
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.2);
  }
  
  .game-title {
    color: #00ff88;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    text-shadow: 0 0 20px #00ff88;
    background: linear-gradient(45deg, #00ff88, #88ffaa, #00ff88);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .game-subtitle {
    color: #88ffaa;
    margin-bottom: 3rem;
    font-size: 1.2rem;
    font-style: italic;
  }
  
  .menu-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .menu-btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    padding: 0.6rem 1rem;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
  }
  
  .menu-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateX(10px);
  }
  
  .btn-primary {
    background: linear-gradient(45deg, #00ff88, #66ffaa);
    border-color: #00ff88;
    color: #003311;
  }
  
  .btn-primary:hover {
    background: linear-gradient(45deg, #66ffaa, #88ffcc);
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
  }
  
  .btn-special {
    background: linear-gradient(45deg, #4488ff, #66aaff);
    border-color: #4488ff;
    color: white;
  }
  
  .btn-special:hover {
    background: linear-gradient(45deg, #66aaff, #88ccff);
    box-shadow: 0 0 20px rgba(68, 136, 255, 0.3);
  }
  
  /* .btn-icon {
    font-size: 1.5rem;
    width: 30px;
    text-align: center;
  } */
  
  .btn-text {
    flex-grow: 1;
    text-align: center;
  }
  
  .badge {
    background: #ff4444;
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: bold;
    animation: pulse 2s ease-in-out infinite;
  }
  
  .footer {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .version {
    color: #8888ff;
    font-size: 0.9rem;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
</style>
