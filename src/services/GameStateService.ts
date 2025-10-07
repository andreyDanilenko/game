import { get } from 'svelte/store';
import { ScreenState, screenState, StatState, statState, ScreenData, screenData, LevelCompleteData, LevelFailedData, GameCompleteData, resetGame, resetStore, resetScreenState, resetScreenData } from '../stores/gameStore';


export class GameStateService {
  private static instance: GameStateService;

  // Singleton pattern
  public static getInstance(): GameStateService {
    if (!GameStateService.instance) {
      GameStateService.instance = new GameStateService();
    }
    return GameStateService.instance;
  }

  // ===== SCREEN STATE METHODS =====
  
  public setScreen(state: ScreenState['value']): void {
    screenState.set(state);
  }

  public getScreen(): ScreenState['value'] {
    return get(screenState);
  }

  public goToGame(): void {
    this.setScreen('game');
  }

  public goToStart(): void {
    this.setScreen('start');
  }

  public goToLevelComplete(): void {
    this.setScreen('levelComplete');
  }

  public goToLevelFailed(): void {
    this.setScreen('levelFailed');
  }

  public goToGameComplete(): void {
    this.setScreen('gameComplete');
  }

  public isInGame(): boolean {
    return this.getScreen() === 'game';
  }

  // ===== STAT STATE METHODS =====
  
  public updateStats(updates: Partial<StatState>): void {
    statState.update(state => ({ ...state, ...updates }));
  }

  public getStats(): StatState {
    return get(statState);
  }

  public addScore(points: number): void {
    const current = this.getStats();
    this.updateStats({ score: current.score + points });
  }

  public setScore(score: number): void {
    this.updateStats({ score });
  }

  public getScore(): number {
    return this.getStats().score;
  }

  public setLevel(level: number): void {
    this.updateStats({ level });
  }

  public getLevel(): number {
    return this.getStats().level;
  }

  public levelUp(): void {
    const current = this.getStats();
    this.updateStats({ level: current.level + 1 });
  }

  public setGameTime(time: number): void {
    this.updateStats({ gameTime: time });
  }

  public getGameTime(): number {
    return this.getStats().gameTime;
  }

  public decreaseGameTime(delta: number): void {
    const current = this.getStats();
    this.updateStats({ gameTime: Math.max(0, current.gameTime - delta) });
  }

  public setPower(power: number): void {
    this.updateStats({ power });
  }

  public getPower(): number {
    return this.getStats().power;
  }

  public increasePower(amount: number): void {
    const current = this.getStats();
    this.updateStats({ power: current.power + amount });
  }

  public decreasePower(amount: number): void {
    const current = this.getStats();
    this.updateStats({ power: Math.max(0, current.power - amount) });
  }

  public setGameRunning(running: boolean): void {
    this.updateStats({ gameRunning: running });
  }

  public getGameRunning(): boolean {
    return this.getStats().gameRunning;
  }

  public toggleGameRunning(): void {
    const current = this.getStats();
    this.updateStats({ gameRunning: !current.gameRunning });
  }

  public setGameWon(won: boolean): void {
    this.updateStats({ gameWon: won });
  }

  public getGameWon(): boolean {
    return this.getStats().gameWon;
  }

  // ===== SCREEN DATA METHODS =====
  
  public updateScreenData(updates: Partial<ScreenData>): void {
    screenData.update(data => ({ ...data, ...updates }));
  }

  public getScreenData(): ScreenData {
    return get(screenData);
  }

  // Level Complete Data
  public setLevelCompleteData(data: LevelCompleteData): void {
    this.updateScreenData({ levelComplete: data });
  }

  public getLevelCompleteData(): LevelCompleteData {
    return this.getScreenData().levelComplete;
  }

  // Level Failed Data
  public setLevelFailedData(data: LevelFailedData): void {
    this.updateScreenData({ levelFailed: data });
  }

  public getLevelFailedData(): LevelFailedData {
    return this.getScreenData().levelFailed;
  }

  // Game Complete Data
  public setGameCompleteData(data: GameCompleteData): void {
    this.updateScreenData({ gameComplete: data });
  }

  public getGameCompleteData(): GameCompleteData {
    return this.getScreenData().gameComplete;
  }

  // ===== GAME FLOW METHODS =====
  
  public startNewGame(): void {
    resetGame();
    this.setScreen('game');
    this.setGameRunning(true);
  }

  public completeLevel(asteroidsDestroyed: number = 0): void {
    const stats = this.getStats();
    this.setLevelCompleteData({
      title: `Level ${stats.level} Complete!`,
      score: stats.score,
      asteroidsDestroyed
    });
    this.setScreen('levelComplete');
    this.setGameRunning(false);
  }

  public failLevel(survivalTime: number, asteroidsDestroyed: number = 0): void {
    const stats = this.getStats();
    this.setLevelFailedData({
      title: 'Level Failed',
      score: stats.score,
      survivalTime,
      asteroidsDestroyed
    });
    this.setScreen('levelFailed');
    this.setGameRunning(false);
  }

  public completeGame(): void {
    const stats = this.getStats();
    this.setGameCompleteData({
      finalScore: stats.score,
      levelsCompleted: stats.level
    });
    this.setScreen('gameComplete');
    this.setGameRunning(false);
  }

  public restartLevel(): void {
    const stats = this.getStats();
    this.updateStats({
      gameTime: 60,
      gameRunning: true
    });
    this.setScreen('game');
  }

  // ===== RESET METHODS =====
  
  public resetAll(): void {
    resetStore();
  }

  public resetGameStats(): void {
    resetGame();
  }

  public resetScreen(): void {
    resetScreenState();
  }

  public resetData(): void {
    resetScreenData();
  }

  // ===== SUBSCRIPTION METHODS =====
  
  public subscribeToScreen(callback: (state: ScreenState['value']) => void): () => void {
    return screenState.subscribe(callback);
  }

  public subscribeToStats(callback: (stats: StatState) => void): () => void {
    return statState.subscribe(callback);
  }

  public subscribeToScreenData(callback: (data: ScreenData) => void): () => void {
    return screenData.subscribe(callback);
  }

  // ===== VALIDATION METHODS =====
  
  public validateGameState(): boolean {
    const stats = this.getStats();
    return stats.gameTime >= 0 && stats.power >= 0 && stats.score >= 0;
  }

  public isGameActive(): boolean {
    return this.isInGame() && this.getGameRunning();
  }

  public getGameSummary(): object {
    return {
      screen: this.getScreen(),
      stats: this.getStats(),
      screenData: this.getScreenData()
    };
  }
}

// Экспорт синглтона для удобства
export const gameState = GameStateService.getInstance();
