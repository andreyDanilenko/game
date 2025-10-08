<script lang="ts">
import Objective from './Objective.svelte';
// import { LevelObjective } from './types';

 interface LevelObjective {
  type: 'survive' | 'collect' | 'destroy' | 'reach_score';
  target: number;
  description: string;
  current: number;
}

  
let levelObjectives: LevelObjective[] = [
    {
        type: 'collect',
        target: 10,
        current: 5,
        description: 'Collect stars'
    },
    {
        type: 'destroy',
        target: 5, 
        current: 5,
        description: 'Destroy enemies'
    }
];
</script>

<div class="level-objectives">
  {#each levelObjectives as objective (objective.type)}
    <Objective {objective} />
  {/each}
</div>

<style>
  .level-objectives {
    position: absolute;
    top: 20px;
    right: 20px;
    max-height: 150px;
    overflow-y: auto;
  }
</style>
