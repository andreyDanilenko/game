<script lang="ts">
  import { gameEvents } from '../events/GameEvents';
  import { screenData, screenState } from '../stores/gameStore';
  import { onMount } from 'svelte';
  
  let data = $screenData.gameComplete;
  let confettiActive = false;
  
  function handleRestartGame() {
    gameEvents.emit('restartGame');
  }
  
  function handleMainMenu() {
    screenState.set('start');
  }
  
  function createConfetti() {
    confettiActive = true;
  }
  
  onMount(() => {
    setTimeout(() => createConfetti(), 500);
  });
</script>

<div class="game-complete-screen">
  <!-- Фон с частицами -->
  <div class="particles">
    {#each Array(20) as _, i}
      <div class="particle" style="--i: {i}; --delay: {Math.random() * 2}s;"></div>
    {/each}
  </div>
  
  <!-- Конфетти -->
  <div class="confetti-container">
    {#each Array(50) as _, i}
      <div class="confetti" style="--i: {i}; --color: {['#ffff00', '#ff4444', '#00ff88', '#4488ff', '#ff00ff'][i % 5]}"></div>
    {/each}
  </div>
  
  <!-- Сияющая рамка -->
  <div class="glow-border"></div>
  
  <div class="screen-content">
    <!-- Анимированный заголовок -->
    <div class="title-container">
      <div class="trophy">🏆</div>
      <h2 class="title">ПОБЕДА!</h2>
      <div class="title-glow"></div>
    </div>
    
    <div class="subtitle">Вы прошли все испытания! Легендарный результат!</div>
    
    <!-- Медаль достижений -->
    <div class="achievement-medal">
      <div class="medal-icon">⭐</div>
      <div class="medal-text">МАСТЕР ИГРЫ</div>
    </div>
    
    <!-- Статистика в стиле трофеев -->
    <div class="stats">
      <div class="stat-item stat-gold">
        <div class="stat-icon">💎</div>
        <div class="stat-info">
          <div class="stat-label">Финальный счет</div>
          <div class="stat-value">{data.finalScore}</div>
        </div>
      </div>
      
      <div class="stat-item stat-silver">
        <div class="stat-icon">🏅</div>
        <div class="stat-info">
          <div class="stat-label">Пройдено уровней</div>
          <div class="stat-value">{data.levelsCompleted}</div>
        </div>
      </div>
      
      <div class="stat-item stat-bronze">
        <div class="stat-icon">⏱️</div>
        <div class="stat-info">
          <div class="stat-label">Общее время</div>
          <div class="stat-value">{data.totalTime || '00:00'}</div>
        </div>
      </div>
    </div>
    
    <!-- Кнопки с иконками -->
    <div class="buttons">
      <button class="btn btn-gold" on:click={handleRestartGame}>
        <span class="btn-icon">🔄</span>
        <span class="btn-text">Новая игра</span>
      </button>
      
      <button class="btn btn-silver" on:click={handleMainMenu}>
        <span class="btn-icon">🏠</span>
        <span class="btn-text">Главное меню</span>
      </button>
    </div>
    
    <!-- Секретное достижение -->
    <div class="secret-achievement">
      <div class="secret-text">🎉 Секретное достижение разблокировано! 🎉</div>
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
    background: linear-gradient(135deg, #0a0a1a 0%, #1a0a2a 50%, #0a1a2a 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .particles {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  
  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #ffff00;
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
    animation-delay: var(--delay);
    top: calc(var(--i) * 5%);
    left: calc(var(--i) * 5%);
  }
  
  .confetti-container {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  
  .confetti {
    position: absolute;
    width: 12px;
    height: 12px;
    background: var(--color);
    top: -20px;
    left: calc(var(--i) * 2%);
    animation: confetti-fall 3s linear forwards;
    animation-delay: calc(var(--i) * 0.1s);
    opacity: 0;
  }
  
  .glow-border {
    position: absolute;
    width: 90%;
    height: 90%;
    border: 4px solid transparent;
    border-image: linear-gradient(45deg, #ffff00, #ff4444, #00ff88, #4488ff, #ffff00);
    border-image-slice: 1;
    animation: border-glow 3s ease-in-out infinite;
    border-radius: 20px;
  }
  
  .screen-content {
    background: rgba(10, 10, 26, 0.95);
    padding: 3rem;
    border-radius: 20px;
    border: 3px solid #ffff00;
    text-align: center;
    color: white;
    max-width: 600px;
    position: relative;
    z-index: 10;
    backdrop-filter: blur(10px);
    box-shadow: 0 0 50px rgba(255, 255, 0, 0.3);
  }
  
  .title-container {
    position: relative;
    margin-bottom: 1rem;
  }
  
  .trophy {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: bounce 2s ease-in-out infinite;
  }
  
  .title {
    color: #ffff00;
    margin-bottom: 0.5rem;
    text-shadow: 0 0 30px #ffff00;
    font-size: 3rem;
    font-weight: bold;
    background: linear-gradient(45deg, #ffff00, #ffcc00, #ffff00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: title-shine 2s ease-in-out infinite;
  }
  
  .title-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 100px;
    background: radial-gradient(circle, rgba(255,255,0,0.4) 0%, transparent 70%);
    filter: blur(20px);
    z-index: -1;
  }
  
  .subtitle {
    color: #88ffaa;
    margin-bottom: 2rem;
    font-size: 1.3rem;
    font-style: italic;
  }
  
  .achievement-medal {
    background: linear-gradient(135deg, #ffff00, #ffcc00);
    color: #000;
    padding: 1rem 2rem;
    border-radius: 50px;
    margin: 2rem 0;
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    font-weight: bold;
    animation: medal-pulse 2s ease-in-out infinite;
  }
  
  .medal-icon {
    font-size: 2rem;
  }
  
  .stats {
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease;
  }
  
  .stat-item:hover {
    transform: translateX(10px);
  }
  
  .stat-gold { border-left: 4px solid #ffff00; }
  .stat-silver { border-left: 4px solid #c0c0c0; }
  .stat-bronze { border-left: 4px solid #cd7f32; }
  
  .stat-icon {
    font-size: 2rem;
  }
  
  .stat-info {
    text-align: left;
    flex-grow: 1;
  }
  
  .stat-label {
    color: #ccccff;
    font-size: 0.9rem;
  }
  
  .stat-value {
    color: #ffffff;
    font-weight: bold;
    font-size: 1.3rem;
  }
  
  .buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin: 2rem 0;
  }
  
  .btn {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1rem 2rem;
    border: none;
    border-radius: 25px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 180px;
  }
  
  .btn-gold {
    background: linear-gradient(45deg, #ffff00, #ffcc00);
    color: black;
  }
  
  .btn-gold:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(255, 255, 0, 0.7);
  }
  
  .btn-silver {
    background: linear-gradient(45deg, #c0c0c0, #e0e0e0);
    color: black;
  }
  
  .btn-silver:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(192, 192, 192, 0.7);
  }
  
  .secret-achievement {
    margin-top: 2rem;
    padding: 1rem;
    background: rgba(255, 0, 255, 0.2);
    border-radius: 10px;
    border: 1px solid #ff00ff;
    animation: secret-pulse 2s ease-in-out infinite;
  }
  
  .secret-text {
    color: #ff88ff;
    font-weight: bold;
  }
  
  /* Анимации */
  @keyframes confetti-fall {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
  }
  
  @keyframes border-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 0, 0.5); }
    50% { box-shadow: 0 0 40px rgba(255, 255, 0, 0.8); }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes title-shine {
    0%, 100% { filter: brightness(1); }
    50% { filter: brightness(1.5); }
  }
  
  @keyframes medal-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-20px) translateX(10px); }
  }
  
  @keyframes secret-pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }
</style>
