<script lang="ts">
import { createEventDispatcher } from 'svelte';
import type { LevelConfig } from '../../stores/levels';

const dispatch = createEventDispatcher();

export let level: LevelConfig;
export let index: number;
export let completedLevels: number;

const isUnlocked = index <= completedLevels;

function handleClick() {
    if (isUnlocked) {        
        dispatch('startLevel', level.id);
    }
}
</script>

<div 
  class="planet-container" 
  style="left: {(index + 1) * 20}%"
>
  <div class="orbit"></div>
  
    <button 
        class="planet level-{level.id} {level.difficulty} {isUnlocked ? 'unlocked' : 'locked'}"
        on:click={handleClick}
        disabled={!isUnlocked}
        type="button"
        >
        <div class="planet-surface">
        <div class="planet-crater"></div>
        <div class="planet-crater"></div>
        <div class="planet-crater"></div>
        </div>
        <div class="planet-glow"></div>

        <!-- Номер уровня -->
        <div class="level-number">{level.id}</div>

        <!-- Иконка сложности -->
        <div class="difficulty-badge">
        {#if level.difficulty === 'easy'}🌱
        {:else if level.difficulty === 'medium'}🚀  
        {:else}☄️
        {/if}
    </div>
    </button>
  <!-- Информация об уровне при наведении -->
  {#if isUnlocked}
    <div class="level-tooltip">
      <h3>{level.name}</h3>
      <p>{level.description}</p>
      <div class="tooltip-objectives">
        {#each level.objectives.slice(0, 2) as objective}
          <div class="tooltip-objective">
            {#if objective.type === 'survive'}⏱️
            {:else if objective.type === 'collect'}⭐
            {:else if objective.type === 'destroy'}💥
            {:else}🏆
            {/if}
            {objective.target}
          </div>
        {/each}
      </div>
    </div>
  {/if}
  
</div>

<style>
  .planet-container {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
    pointer-events: all;
  }

  .orbit {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    border: 1px solid rgba(0, 255, 255, 0.2);
    border-radius: 50%;
    animation: orbitSpin 20s linear infinite;
  }

  @keyframes orbitSpin {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }

  .planet {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    transform-style: preserve-3d;
  }

  .planet:hover {
    transform: scale(1.2) rotate(10deg);
  }

  .planet.unlocked {
    cursor: pointer;
    filter: brightness(1.2);
  }

  .planet.locked {
    cursor: not-allowed;
    filter: grayscale(0.8) brightness(0.6);
  }

  /* Стили планет по сложности */
  .planet.easy {
    background: linear-gradient(45deg, #4CAF50, #8BC34A);
    box-shadow: 0 0 30px rgba(76, 175, 80, 0.5);
  }

  .planet.medium {
    background: linear-gradient(45deg, #FF9800, #FF5722);
    box-shadow: 0 0 30px rgba(255, 152, 0, 0.5);
  }

  .planet.hard {
    background: linear-gradient(45deg, #F44336, #9C27B0);
    box-shadow: 0 0 30px rgba(244, 67, 54, 0.5);
  }

  .planet-surface {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }

  .planet-crater {
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
  }

  .planet-crater:nth-child(1) {
    top: 20%;
    left: 30%;
    width: 15px;
    height: 15px;
  }

  .planet-crater:nth-child(2) {
    bottom: 25%;
    right: 20%;
    width: 20px;
    height: 20px;
  }

  .planet-crater:nth-child(3) {
    top: 60%;
    left: 10%;
    width: 12px;
    height: 12px;
  }

  .planet-glow {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 50%;
    background: inherit;
    filter: blur(15px);
    opacity: 0.5;
    z-index: -1;
  }

  .level-number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    text-shadow: 0 0 5px black;
  }

  .difficulty-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 50%;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
  }

  .level-tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(10, 10, 26, 0.95);
    border: 1px solid rgba(0, 255, 255, 0.3);
    border-radius: 10px;
    padding: 1rem;
    width: 200px;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .level-tooltip h3 {
    margin: 0 0 0.5rem 0;
    color: #00ffff;
    font-size: 1rem;
  }

  .level-tooltip p {
    margin: 0 0 0.8rem 0;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.8rem;
    line-height: 1.3;
  }

  .tooltip-objectives {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }

  .tooltip-objective {
    background: rgba(0, 255, 255, 0.2);
    padding: 0.3rem 0.5rem;
    border-radius: 15px;
    font-size: 0.7rem;
    color: white;
  }
</style>
