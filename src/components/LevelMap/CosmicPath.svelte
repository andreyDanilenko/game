<script lang="ts">
  import type { LevelConfig } from '../../stores/levels';
  import PlanetLevel from './PlanetLevel.svelte';
  import Spaceship from './Spaceship.svelte';
  
  export let levels: LevelConfig[];
  export let completedLevels: number;
</script>

<div class="cosmic-path">
  <div class="path-line"></div>
  
  <!-- Планеты-уровни -->
  {#each levels as level, index}
    <PlanetLevel 
      {level}
      {index}
      {completedLevels}
      on:startLevel
    />
  {/each}

  <!-- Космический корабль -->
  <Spaceship {completedLevels} />
</div>

<style>
  .cosmic-path {
    position: absolute;
    top: 50%;
    left: 5%;
    width: 90%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ffff, transparent);
  }

  .path-line {
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(0, 255, 255, 0.3) 20%,
      rgba(0, 255, 255, 0.6) 50%,
      rgba(0, 255, 255, 0.3) 80%,
      transparent 100%
    );
    animation: pathGlow 2s infinite;
  }

  @keyframes pathGlow {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
</style>
