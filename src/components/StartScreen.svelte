<script lang="ts">
    import { gameEvents } from "../events/GameEvents";

  function handleStartGame() {
    // Пока просто меняем экран
        gameEvents.emit('startGame');

    
    // window.dispatchEvent(new CustomEvent('gameAction', {
    //   detail: { action: 'startGame' }
    // }));
  }
</script>

<div class="start-screen">
  <h1 class="game-title">КОСМИЧЕСКОЕ ВЫЖИВАНИЕ</h1>
  <div class="game-mode">Многоуровневое космическое приключение</div>
  
  <p class="instructions">
    Собирайте обычные звезды для очков!<br>
    Собирайте энергетические звезды для усиления волны!<br>
    Уклоняйтесь от астероидов или используйте броню!
  </p>
  
  <p class="features">
    <strong>Управление на компьютере:</strong><br>
    • Мышь: Корабль следует за курсором<br>
    • ПРОБЕЛ: Энергетическая волна (тратит энергию)<br>
  </p>
  
  <button class="start-button" on:click={handleStartGame}>
    НАЧАТЬ ИГРУ
  </button>
</div>

<style>
  .start-screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(10, 10, 26, 0.95);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
    padding: 2rem;
  }
  
  .game-title {
    font-size: 3rem;
    margin-bottom: 1rem;
    text-shadow: 0 0 20px #ff00ff;
  }
  
  .start-button {
    background: linear-gradient(45deg, #ff00ff, #00ffff);
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.2rem;
    border-radius: 50px;
    cursor: pointer;
    margin-top: 2rem;
  }
</style>
