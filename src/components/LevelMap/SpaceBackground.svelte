<script lang="ts">
  let stars = Array.from({ length: 200 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100
  }));
</script>

<div class="space-background">
  {#each stars as star}
    <div 
      class="star" 
      style="top: {star.top}%; left: {star.left}%"
    ></div>
  {/each}
  <div class="nebula nebula-1"></div>
  <div class="nebula nebula-2"></div>
</div>

<style>
  .space-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .star {
    position: absolute;
    width: 2px;
    height: 2px;
    background: white;
    border-radius: 50%;
    animation: twinkle 3s infinite;
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }

  .nebula {
    position: absolute;
    border-radius: 50%;
    filter: blur(50px);
    opacity: 0.1;
  }

  .nebula-1 {
    top: 20%;
    left: 10%;
    width: 300px;
    height: 300px;
    background: #ff00ff;
  }

  .nebula-2 {
    bottom: 30%;
    right: 15%;
    width: 400px;
    height: 400px;
    background: #00ffff;
  }
</style>
