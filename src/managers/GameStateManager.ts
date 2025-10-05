export class GameStateManager {
  private score: number = 0;
  private gameTime: number = 0;
  private power: number = 0;
  private gameRunning: boolean = false;
  private gameWon: boolean = false;

  getScore(): number { return this.score; }
  getGameTime(): number { return this.gameTime; }
  getPower(): number { return this.power; }
  isGameRunning(): boolean { return this.gameRunning; }
  isGameWon(): boolean { return this.gameWon; }

  setScore(value: number): void { this.score = value; }
  setGameTime(value: number): void { this.gameTime = value; }
  setPower(value: number): void { this.power = Math.max(0, Math.min(100, value)); }
  setGameRunning(value: boolean): void { this.gameRunning = value; }
  setGameWon(value: boolean): void { this.gameWon = value; }

  addScore(value: number): void { this.score += value; }
  addPower(value: number): void { this.setPower(this.power + value); }
  decreaseTime(deltaTime: number): void { this.gameTime -= deltaTime; }

  reset(): void {
    this.score = 0;
    this.gameTime = 0;
    this.power = 0;
    this.gameRunning = false;
    this.gameWon = false;
  }
}
