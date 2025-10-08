<script lang="ts">
  export let completedLevels: number;
  export let position: { x: number; y: number } = { x: 0, y: 0 };
  
</script>

<div 
  class="spaceship" 
  style="transform: translate({position.x}px, {position.y}px)"
>
  <div class="ship-body">🚀</div>
  <div class="ship-glow"></div>
</div>

<style>
  .spaceship {
    position: absolute;
    top: 0;
    left: 0;
    transition: all 1s ease;
    z-index: 5;
    pointer-events: none;
  }

  .ship-body {
    font-size: 2rem;
    filter: drop-shadow(0 0 10px #00ffff);
    animation: float 2s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  .ship-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    background: #00ffff;
    border-radius: 50%;
    filter: blur(20px);
    opacity: 0.3;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.4; transform: translate(-50%, -50%) scale(1.2); }
  }
</style>
