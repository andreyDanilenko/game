<script lang="ts">
//   import { statState } from '../stores/gameStore';
  
  let zoomLevel = 1.0;
  
  function handleZoomChange(event: Event) {
    const target = event.target as HTMLInputElement;
    zoomLevel = parseFloat(target.value);
    
    // Обновляем значение в интерфейсе
    const zoomValue = document.getElementById('zoomValue');
    if (zoomValue) {
      zoomValue.textContent = `${zoomLevel.toFixed(1)}x`;
    }
    
    // Диспатчим событие для игрового движка
    window.dispatchEvent(new CustomEvent('gameSettings', {
      detail: { type: 'zoom', value: zoomLevel }
    }));
  }
</script>

<div class="zoom-control">
  <label for="zoomSlider" class="control-label">Camera Zoom</label>
  <div class="control-container">
    <input 
      type="range" 
      id="zoomSlider" 
      class="zoom-slider control-slider" 
      min="0.5" 
      max="3.0" 
      step="0.1" 
      value={zoomLevel}
      on:input={handleZoomChange}
    >
    <div class="control-value zoom-value" id="zoomValue">{zoomLevel.toFixed(1)}x</div>
  </div>
</div>

<style>
  .zoom-control {
    background: rgba(0, 0, 0, 0.8);
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 10px;
    border: 2px solid #00ffff;
    color: white;
    width: 300px;
    max-width: 300px;
  }

  .control-label {
    display: block;
    color: #00ffff;
    margin-bottom: 0.8rem;
    text-shadow: 0 0 10px #00ffff;
    font-weight: bold;
    font-size: 1.1rem;
  }

  .control-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .control-slider {
    flex: 1;
    height: 8px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.2);
    outline: none;
    -webkit-appearance: none;
  }

  .control-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(45deg, #ff00ff, #00ffff);
    cursor: pointer;
    box-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
  }

  .control-slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(45deg, #ff00ff, #00ffff);
    cursor: pointer;
    border: none;
    box-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
  }

  .control-value {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    color: #ffff00;
    font-weight: bold;
    min-width: 60px;
    text-align: center;
    text-shadow: 0 0 5px #ffff00;
    border: 1px solid rgba(255, 255, 0, 0.3);
  }
</style>
