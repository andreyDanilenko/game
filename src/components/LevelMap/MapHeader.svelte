<script lang="ts">
  import { gameEvents } from "../../events/GameEvents";

  function handleMainMenu() {
    gameEvents.emit('mainMenu');
  }

</script>

<div class="map-header">
  <button class="back-button" on:click={handleMainMenu}>
    ⬅ НАЗАД
  </button>
</div>

<style>
  .map-header {
    position: absolute;
    top: 2rem;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 3rem;
    z-index: 10;
  }

  /* .galaxy-title {
    font-size: 1.5rem;
    color: white;
    text-shadow: 0 0 20px #ff00ff, 0 0 40px #00ffff;
    margin: 0;
  } */

  .back-button {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 0.4rem 1.0rem;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1.0rem;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
  }

  .back-button:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: #ff00ff;
    box-shadow: 0 0 15px #ff00ff;
  }
</style>
