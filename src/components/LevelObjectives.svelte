<script lang="ts">
import { objectives } from '../stores/levelStore';
import Objective from './Objective.svelte';

$: objectivesLevel = $objectives;

</script>

<div class="level-objectives">
  {#each objectivesLevel as objective (objective.type)}
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
