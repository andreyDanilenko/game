<script lang="ts">
  import { screenData, gameState } from '../stores/gameStore';
    import { gameEvents } from '../events/GameEvents';

  let data = $screenData.levelFailed;
  
//   function handleRestartLevel() {
//     window.dispatchEvent(new CustomEvent('gameAction', {
//       detail: { action: 'restartLevel' }
//     }));
//   }
  
//   function handleMainMenu() {
//     gameState.update(state => ({
//       ...state,
//       currentScreen: 'start'
//     }));
//   }


  function handleRestartLevel() {
    gameEvents.emit('restartLevel');
  }

  function handleMainMenu() {
    gameEvents.emit('mainMenu');
  }

  
  function handleRetryTips() {
    // Можно добавить советы по прохождению
    alert('💡 Советы:\n• Собирайте энергетические звезды для усиления волны\n• Используйте броню для защиты\n• Управляйте кораблем плавно');
  }
</script>

<div class="level-failed-screen">
  <div class="screen-content">
    <!-- Анимация провала -->
    <div class="failure-animation">
      <div class="explosion">💥</div>
      <div class="sparks">
        {#each Array(8) as _, i}
          <div class="spark" style="--i: {i};"></div>
        {/each}
      </div>
    </div>
    
    <!-- Заголовок -->
    <h2 class="title">{data.title || 'Уровень провален'}</h2>
    <div class="subtitle">Не отчаивайтесь! Попробуйте еще раз</div>
    
    <!-- Статистика -->
    <div class="stats">
      <div class="stat-item">
        <span class="stat-label">Счет:</span>
        <span class="stat-value">{data.score}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Выжили:</span>
        <span class="stat-value">{data.survivalTime} сек</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Уничтожено астероидов:</span>
        <span class="stat-value">{data.asteroidsDestroyed}</span>
      </div>
    </div>
    
    <!-- Кнопки действий -->
    <div class="buttons">
      <button class="btn btn-retry" on:click={handleRestartLevel}>
        <span class="btn-icon">🔄</span>
        Попробовать снова
      </button>
      
      <button class="btn btn-tips" on:click={handleRetryTips}>
        <span class="btn-icon">💡</span>
        Советы
      </button>
      
      <button class="btn btn-menu" on:click={handleMainMenu}>
        <span class="btn-icon">🏠</span>
        Главное меню
      </button>
    </div>
    
    <!-- Мотивационное сообщение -->
    <div class="motivation">
      "Каждая неудача - шаг к успеху! 🚀"
    </div>
  </div>
</div>

<style>
  .level-failed-screen {
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
    background: rgba(255, 68, 68, 0.1);
    padding: 3rem;
    border-radius: 20px;
    border: 2px solid #ff4444;
    text-align: center;
    color: white;
    max-width: 500px;
    backdrop-filter: blur(10px);
  }
  
  .failure-animation {
    position: relative;
    margin-bottom: 2rem;
  }
  
  .explosion {
    font-size: 4rem;
    animation: explode 1s ease-out;
  }
  
  .sparks {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
  }
  
  .spark {
    position: absolute;
    width: 4px;
    height: 20px;
    background: #ffaa00;
    border-radius: 2px;
    transform: rotate(calc(var(--i) * 45deg)) translateY(-40px);
    animation: spark 1s ease-out forwards;
    animation-delay: calc(var(--i) * 0.1s);
    opacity: 0;
  }
  
  .title {
    color: #ff4444;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    text-shadow: 0 0 20px #ff4444;
  }
  
  .subtitle {
    color: #ff8888;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
  
  .stats {
    margin: 2rem 0;
    background: rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
    border-radius: 10px;
  }
  
  .stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.8rem 0;
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 5px;
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
  
  .btn-retry {
    background: linear-gradient(45deg, #ff4444, #ff6666);
    color: white;
  }
  
  .btn-retry:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 68, 68, 0.5);
  }
  
  .btn-tips {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
  
  .btn-tips:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  .btn-menu {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
  
  .btn-menu:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  .motivation {
    color: #ff8888;
    font-style: italic;
    margin-top: 1rem;
    font-size: 0.9rem;
  }
  
  @keyframes explode {
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  
  @keyframes spark {
    0% { transform: rotate(calc(var(--i) * 45deg)) translateY(0); opacity: 1; }
    100% { transform: rotate(calc(var(--i) * 45deg)) translateY(-40px); opacity: 0; }
  }
</style>
