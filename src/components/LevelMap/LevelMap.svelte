<script lang="ts">
  import SpaceBackground from './SpaceBackground.svelte';
  import MapHeader from './MapHeader.svelte';
  import CosmicPath from './CosmicPath.svelte';
  import LevelInfoPanel from './LevelInfoPanel.svelte';
  import { gameEvents } from '../../events/GameEvents';
  import { levels } from '../../stores/levels';

  export let completedLevels = 0;

  function handleStartLevel() {
    gameEvents.emit('startGame');
  }
</script>

<div class="universe-map">
  <SpaceBackground />
  <MapHeader />
  
  <CosmicPath 
    {levels}
    {completedLevels}
    on:startLevel={handleStartLevel}
  />
  
  <LevelInfoPanel {levels} {completedLevels} />
</div>

<style>
  .universe-map {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #0a0a1a, #1a1a3a);
    overflow: hidden;
  }
</style>
