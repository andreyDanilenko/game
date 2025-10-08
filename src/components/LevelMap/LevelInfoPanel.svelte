<script lang="ts">
  import type { LevelConfig } from '../../stores/levels';
  
  export let levels: LevelConfig[];
  export let completedLevels: number;
</script>

<div class="level-info-panel">
  <div class="info-card">
    <h3>Текущая миссия</h3>
    <div class="mission-stats">
      <div class="stat">
        <span class="stat-label">Прогресс галактики:</span>
        <span class="stat-value">{completedLevels}/{levels.length}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Следующая цель:</span>
        <span class="stat-value">Уровень {completedLevels + 1}</span>
      </div>
    </div>
  </div>
</div>

<style>
  .level-info-panel {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .info-card {
    background: rgba(10, 10, 26, 0.8);
    border: 1px solid rgba(0, 255, 255, 0.3);
    border-radius: 15px;
    padding: 1.5rem;
    backdrop-filter: blur(10px);
    min-width: 300px;
    text-align: center;
  }

  .info-card h3 {
    margin: 0 0 1rem 0;
    color: #00ffff;
    font-size: 1.2rem;
  }

  .mission-stats {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .stat {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .stat-label {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
  }

  .stat-value {
    color: #00ffff;
    font-weight: bold;
    font-size: 1rem;
  }
</style>
