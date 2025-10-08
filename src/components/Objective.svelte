<script lang="ts">
interface LevelObjective {
  type: 'survive' | 'collect' | 'destroy' | 'reach_score';
  target: number;
  description: string;
  current: number;
}
    export let objective: LevelObjective;

  
  const getObjectiveIcon = (objectiveType: string): string => {
    const icons: Record<string, string> = {
      'survive': '⏱️',
      'collect': '⭐', 
      'destroy': '💥',
      'reach_score': '🏆',
      'boss': '👾',
      'power_star': '🔮'
    };
    return icons[objectiveType] || '🎯';
  };

  $: isCompleted = objective.current >= objective.target;
  $: progress = Math.min((objective.current / objective.target) * 100, 100);
</script>

{#if objective.type !== 'survive'}
  <div 
    class="objective {isCompleted ? 'completed' : ''}" 
    data-type={objective.type}
    class:just-completed={isCompleted}
  >
    <div class="objective-icon">{getObjectiveIcon(objective.type)}</div>
    <div class="objective-info">
      <div class="objective-text">{objective.description}</div>
      <div class="objective-progress">
        <div class="progress-bar">
          <div class="progress-fill" style="width: {progress}%"></div>
        </div>
        <span class="progress-text">{objective.current}/{objective.target}</span>
      </div>
    </div>
    {#if isCompleted}
      <div class="objective-check">✓</div>
    {/if}
  </div>
{/if}

<style>
  .objective {
    display: flex;
    align-items: center;
    padding: 5px;
    margin: 3px 0;
    background: rgba(255,255,255,0.1);
    border-radius: 5px;
    border-left: 3px solid #00ff88;
    transition: all 0.3s ease;
  }

  .objective.completed {
    background: rgba(0,255,136,0.2);
    border-left-color: #00ff88;
  }

  .objective.just-completed {
    animation: pulse-glow 2s ease-in-out;
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 5px #00ff88; }
    50% { box-shadow: 0 0 20px #00ff88; }
  }

  .objective-icon {
    font-size: 16px;
    margin-right: 8px;
  }

  .objective-info {
    flex: 1;
  }

  .objective-text {
    font-size: 11px;
    color: white;
  }

  .objective-progress {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .progress-bar {
    flex: 1;
    height: 4px;
    background: rgba(255,255,255,0.2);
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: #00ff88;
    transition: width 0.5s ease;
  }

  .progress-text {
    font-size: 10px;
    color: #00ff88;
    min-width: 30px;
  }

  .objective-check {
    color: #00ff88;
    font-weight: bold;
  }
</style>
