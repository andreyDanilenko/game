import { LevelObjective } from "../types/LevelTypes";

export class UIManager {
  private els = {
    level: document.getElementById('level')!,
    score: document.getElementById('score')!,
    time: document.getElementById('time')!,
    armor: document.getElementById('armor')!,
    powerFill: document.getElementById('powerFill')!,
    hud: document.getElementById('hud')!,
    speedControl: document.getElementById('speedControl')!,
    zoomControl: document.getElementById('zoomControl')!,
    startScreen: document.getElementById('startScreen')!,
    speedSlider: document.getElementById('speedSlider') as HTMLInputElement,
    zoomSlider: document.getElementById('zoomSlider') as HTMLInputElement,
    speedValue: document.getElementById('speedValue')!,
    zoomValue: document.getElementById('zoomValue')!,
    zoomInBtn: document.getElementById('zoomInBtn') as HTMLButtonElement,
    zoomOutBtn: document.getElementById('zoomOutBtn') as HTMLButtonElement,
    zoomResetBtn: document.getElementById('zoomResetBtn') as HTMLButtonElement,

    levelObjectives: document.getElementById('levelObjectives') as HTMLButtonElement,
    volumeSlider: document.getElementById('volumeSlider') as HTMLButtonElement,
    muteButton: document.getElementById('muteButton') as HTMLButtonElement,
  };

  updateLevel(v: number): void { 
    this.els.level.textContent = v.toString(); 
  }

  updateScore(v: number): void { 
    this.els.score.textContent = v.toString(); 
  }
  
  updateTime(v: number): void { 
    this.els.time.textContent = Math.ceil(v).toString(); 
  }
  
  updateArmor(v: number): void { 
    this.els.armor.textContent = v.toString(); 
  }
  
  updatePower(v: number): void { 
    this.els.powerFill.style.width = `${v}%`; 
  }

  showHud(show: boolean): void {
    this.els.hud.style.display = show ? 'block' : 'none';
    this.els.speedControl.style.display = show ? 'block' : 'none';
    this.els.zoomControl.style.display = show ? 'block' : 'none';
  }

  showStart(show: boolean): void {
    this.els.startScreen.style.display = show ? 'flex' : 'none';
  }

  getSpeed(): number {
    return parseFloat(this.els.speedSlider.value);
  }

  setSpeedDisplay(value: number): void {
    this.els.speedValue.textContent = value.toFixed(1) + 'x';
  }

  getZoom(): number {
    return parseFloat(this.els.zoomSlider.value);
  }

  setZoomDisplay(value: number): void {
    this.els.zoomValue.textContent = value.toFixed(1) + 'x';
  }

  updateLevelInfo(levelName: string, progress: number): void {
    const levelInfoElement = document.getElementById('levelInfo');
    if (levelInfoElement) {
      levelInfoElement.innerHTML = `
        <div style="font-weight: bold; color: #00ff88;">${levelName}</div>
        <div style="font-size: 12px;">Progress: ${Math.round(progress)}%</div>
      `;
      levelInfoElement.style.display = 'block';
    }
  }

  getElements() {
    return this.els;
  }


  updateLevelObjectives(objectives: LevelObjective[]): void {
    const container = this.els.levelObjectives;
    
    container.innerHTML = objectives.map(obj => {
      if (obj.type === 'survive') return 

      const isCompleted = obj.current >= obj.target;
      const progress = Math.min((obj.current / obj.target) * 100, 100);
      
      return `
        <div class="objective ${isCompleted ? 'completed' : ''}" 
             data-type="${obj.type}">
          <div class="objective-icon">${this.getObjectiveIcon(obj.type)}</div>
          <div class="objective-info">
            <div class="objective-text">${obj.description}</div>
            <div class="objective-progress">
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
              </div>
              <span class="progress-text">${obj.current}/${obj.target}</span>
            </div>
          </div>
          ${isCompleted ? '<div class="objective-check">✓</div>' : ''}
        </div>
      `;
    }).join('');
  }

  // НОВЫЙ МЕТОД: Иконки для разных типов целей (масштабируемо)
  private getObjectiveIcon(objectiveType: string): string {
    const icons: Record<string, string> = {
      'survive': '⏱️',
      'collect': '⭐', 
      'destroy': '💥',
      'reach_score': '🏆',
      'boss': '👾',
      'power_star': '🔮'
      // Легко добавлять новые типы целей
    };
    return icons[objectiveType] || '🎯';
  }

  // НОВЫЙ МЕТОД: Визуальные эффекты при выполнении цели
  showObjectiveCompleteEffect(objectiveType: string): void {
    const completedObjective = this.els.levelObjectives.querySelector(
      `[data-type="${objectiveType}"]`
    );
    
    if (completedObjective) {
      // Добавляем класс для анимации
      completedObjective.classList.add('just-completed');
      
      // Создаем частицы эффекта
      this.createCompletionParticles(completedObjective);
      
      // Убираем класс через время
      setTimeout(() => {
        completedObjective.classList.remove('just-completed');
      }, 2000);
    }
  }

  // НОВЫЙ МЕТОД: Частицы для визуального эффекта
  private createCompletionParticles(element: Element): void {
    // Можно добавить систему частиц для эффектов выполнения
    console.log(`🎉 Цель выполнена: ${element.getAttribute('data-type')}`);
    // Здесь можно добавить реальные частицы/анимации
  }
}
