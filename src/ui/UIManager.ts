export class UIManager {
  private els = {
    score: document.getElementById('score')!,
    time: document.getElementById('time')!,
    armor: document.getElementById('armor')!,
    powerFill: document.getElementById('powerFill')!,
    hud: document.getElementById('hud')!,
    speedControl: document.getElementById('speedControl')!,
    zoomControl: document.getElementById('zoomControl')!,
    startScreen: document.getElementById('startScreen')!,
    gameOver: document.getElementById('gameOver')!,
    finalScore: document.getElementById('finalScore')!,
    survivalTime: document.getElementById('survivalTime')!,
    asteroidsDestroyed: document.getElementById('asteroidsDestroyed')!,
    gameResult: document.getElementById('gameResult')!,
    speedSlider: document.getElementById('speedSlider') as HTMLInputElement,
    zoomSlider: document.getElementById('zoomSlider') as HTMLInputElement,
    speedValue: document.getElementById('speedValue')!,
    zoomValue: document.getElementById('zoomValue')!,
    startButton: document.getElementById('startButton') as HTMLButtonElement,
    restartButton: document.getElementById('restartButton') as HTMLButtonElement,
    zoomInBtn: document.getElementById('zoomInBtn') as HTMLButtonElement,
    zoomOutBtn: document.getElementById('zoomOutBtn') as HTMLButtonElement,
    zoomResetBtn: document.getElementById('zoomResetBtn') as HTMLButtonElement,
  };

  updateScore(v: number): void { this.els.score.textContent = v.toString(); }
  updateTime(v: number): void { this.els.time.textContent = Math.ceil(v).toString(); }
  updateArmor(v: number): void { this.els.armor.textContent = v.toString(); }
  updatePower(v: number): void { this.els.powerFill.style.width = `${v}%`; }

  showHud(show: boolean): void {
    this.els.hud.style.display = show ? 'flex' : 'none';
    this.els.speedControl.style.display = show ? 'block' : 'none';
    this.els.zoomControl.style.display = show ? 'block' : 'none';
  }

  showStart(show: boolean): void {
    this.els.startScreen.style.display = show ? 'flex' : 'none';
  }

  showGameOver(show: boolean): void {
    this.els.gameOver.style.display = show ? 'flex' : 'none';
  }

  setGameResult(text: string, color: string, shadow: string): void {
    this.els.gameResult.textContent = text;
    this.els.gameResult.style.color = color;
    this.els.gameResult.style.textShadow = shadow;
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

  getElements() {
    return this.els;
  }
}
