import { UIManager } from '../ui/UIManager';
import { Player } from './objects/Player';
import { Star } from './objects/Star';
import { PowerStar } from './objects/PowerStar';
import { Asteroid } from './objects/Asteroid';
import { Explosion } from './objects/Explosion';
import { Particle } from './objects/Particle';

export class Game {
  private canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
  private ctx = this.canvas.getContext('2d')!;
  private ui = new UIManager();
  private player: Player;
  
  private stars: Star[] = [];
  private powerStars: PowerStar[] = [];
  private asteroids: Asteroid[] = [];
  private particles: Particle[] = [];
  private explosions: Explosion[] = [];

  private score = 0;
  private gameTime = 60;
  private power = 0;
  private gameRunning = false;
  private gameWon = false;
  private animationId: number | null = null;
  private gameSpeed = 1.0;
  private asteroidsDestroyed = 0;
  private mouseX = 400;
  private mouseY = 300;

  

  constructor() {
    this.player = new Player(400, 300, 20);
    this.initEventListeners();
    this.ui.showStart(true);
  }

  private initEventListeners(): void {
    this.ui.getElements().startButton.addEventListener('click', () => this.startGame());
    this.ui.getElements().restartButton.addEventListener('click', () => {
      this.ui.showGameOver(false);
      this.startGame();
    });

    this.ui.getElements().speedSlider.addEventListener('input', () => {
      this.gameSpeed = this.ui.getSpeed();
      this.ui.setSpeedDisplay(this.gameSpeed);
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && this.gameRunning) {
        this.explodeAllObjects();
      }
    });

    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.touches[0].clientX - rect.left;
      this.mouseY = e.touches[0].clientY - rect.top;
    });
  }

  private init(): void {
    this.score = 0;
    this.gameTime = 60;
    this.player.armor = 3;
    this.power = 0;
    this.asteroidsDestroyed = 0;
    this.gameWon = false;

    this.updateUI();

    this.stars = [];
    this.powerStars = [];
    this.asteroids = [];
    this.particles = [];
    this.explosions = [];

    for (let i = 0; i < 8; i++) this.createStar();
    for (let i = 0; i < 2; i++) this.createPowerStar();
    for (let i = 0; i < 6; i++) this.createBouncingAsteroid();
  }

  private createStar(): void {
    const x = Math.random() * 700 + 50;
    const y = Math.random() * 500 + 50;
    const r = Math.random() * 8 + 4;
    this.stars.push(new Star(x, y, r));
  }

  private createPowerStar(): void {
    const x = Math.random() * 700 + 50;
    const y = Math.random() * 500 + 50;
    const r = Math.random() * 10 + 6;
    this.powerStars.push(new PowerStar(x, y, r));
  }

  private createBouncingAsteroid(): void {
    const size = Math.random() * 25 + 15;
    const x = Math.random() * (800 - size * 2) + size;
    const y = Math.random() * (600 - size * 2) + size;
    const speed = Math.random() * 2 + 1;
    const angle = Math.random() * Math.PI * 2;
    this.asteroids.push(new Asteroid(x, y, size, Math.cos(angle) * speed, Math.sin(angle) * speed));
  }

  private createParticles(x: number, y: number, color: string, count = 10): void {
    for (let i = 0; i < count; i++) {
      const vx = (Math.random() - 0.5) * 8;
      const vy = (Math.random() - 0.5) * 8;
      const r = Math.random() * 4 + 1;
      this.particles.push(new Particle(x, y, vx, vy, r, color));
    }
  }

  private createExplosion(x: number, y: number, radius: number, color: string): void {
    this.explosions.push(new Explosion(x, y, radius, color));
    this.createParticles(x, y, color, 30);
  }

  private explodeAllObjects(): void {
    if (this.power >= 100) {
      this.power = 0;
      this.ui.updatePower(0);
      

      this.createExplosion(400, 300, 50, '#ff66ff');
      this.asteroidsDestroyed += this.asteroids.length;
      this.asteroids = [];

      for (let i = 0; i < 4; i++) this.createBouncingAsteroid();

      this.score += this.stars.length * 15 + this.powerStars.length * 25;
      this.stars = [];
      this.powerStars = [];

      for (let i = 0; i < 6; i++) this.createStar();
      for (let i = 0; i < 1; i++) this.createPowerStar();

      this.updateUI();
    }
  }

  private updateUI(): void {
        console.log('explodeAllObjects');

    this.ui.updateScore(this.score);
    this.ui.updateTime(this.gameTime);
    this.ui.updateArmor(this.player.armor);
    this.ui.updatePower(this.power);
  }

  private checkCollisions(): void {
    // Stars
    for (let i = this.stars.length - 1; i >= 0; i--) {
      const s = this.stars[i];
      const dx = s.x - this.player.x;
      const dy = s.y - this.player.y;
      if (Math.sqrt(dx * dx + dy * dy) < this.player.radius + s.radius) {
        this.stars.splice(i, 1);
        this.score += 10;
        this.createParticles(s.x, s.y, '#ffff00', 15);
        this.createStar();
        this.updateUI();
      }
    }

    // Power stars
    for (let i = this.powerStars.length - 1; i >= 0; i--) {
      const p = this.powerStars[i];
      const dx = p.x - this.player.x;
      const dy = p.y - this.player.y;
      if (Math.sqrt(dx * dx + dy * dy) < this.player.radius + p.radius) {
        this.powerStars.splice(i, 1);
        this.player.armor++;
        this.power = Math.min(100, this.power + 30);
        this.score += 25;
        this.createParticles(p.x, p.y, '#ff66ff', 25);
        this.createPowerStar();
        this.updateUI();
      }
    }

    // Asteroids
    for (let i = this.asteroids.length - 1; i >= 0; i--) {
      const a = this.asteroids[i];
      const dx = a.x - this.player.x;
      const dy = a.y - this.player.y;
      if (Math.sqrt(dx * dx + dy * dy) < this.player.radius + a.radius) {
        if (this.player.armor > 0) {
          this.player.armor--;
          this.asteroids.splice(i, 1);
          this.asteroidsDestroyed++;
          this.createParticles(a.x, a.y, '#ff4444', 20);
          this.createBouncingAsteroid();
          this.updateUI();
        } else {
          this.gameOver();
          return;
        }
      }
    }
  }

  private update(): void {
    if (!this.gameRunning) return;

    if (this.gameTime > 0 && !this.gameWon) {
      this.gameTime -= 1 / 60;
      this.ui.updateTime(this.gameTime);
      if (this.gameTime <= 0) {
        this.win();
        return;
      }
    }

    if (this.power < 100) {
      this.power += 0.5 * this.gameSpeed;
      this.ui.updatePower(this.power);
    }

    this.player.x = Math.max(this.player.radius, Math.min(800 - this.player.radius, this.mouseX));
    this.player.y = Math.max(this.player.radius, Math.min(600 - this.player.radius, this.mouseY));

    this.stars.forEach(s => s.update(this.gameSpeed));
    this.powerStars.forEach(p => p.update(this.gameSpeed));
    this.asteroids.forEach(a => a.update(this.gameSpeed));
    this.explosions.forEach(e => e.update(this.gameSpeed));
    this.particles.forEach(p => p.update(this.gameSpeed));

    this.explosions = this.explosions.filter(e => e.life > 0);
    this.particles = this.particles.filter(p => p.life > 0);

    this.checkCollisions();
  }

  private render(): void {
    this.ctx.fillStyle = '#0a0a1a';
    this.ctx.fillRect(0, 0, 800, 600);

    // Background stars
    this.ctx.fillStyle = 'rgba(255,255,255,0.2)';
    for (let i = 0; i < 150; i++) {
      const x = (i * 41) % 800;
      const y = (i * 67) % 600;
      const size = Math.sin(Date.now() * 0.001 + i) * 0.3 + 1;
      this.ctx.beginPath();
      this.ctx.arc(x, y, size, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.explosions.forEach(e => e.render(this.ctx));
    this.stars.forEach(s => s.render(this.ctx));
    this.powerStars.forEach(p => p.render(this.ctx));
    this.asteroids.forEach(a => a.render(this.ctx));
    this.player.render(this.ctx);
    this.particles.forEach(p => p.render(this.ctx));
  }

  private gameLoop = (): void => {
    this.update();
    this.render();
    this.animationId = requestAnimationFrame(this.gameLoop);
  };

  private gameOver(): void {
    this.gameRunning = false;
    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.ui.getElements().survivalTime.textContent = (60 - Math.ceil(this.gameTime)).toString();
    this.ui.getElements().finalScore.textContent = this.score.toString();
    this.ui.getElements().asteroidsDestroyed.textContent = this.asteroidsDestroyed.toString();
    this.ui.setGameResult('GAME OVER', '#ff4444', '0 0 20px #ff4444');
    this.ui.showGameOver(true);
  }

  private shouldTriggerAutoExplosion(): boolean {
    if (this.player.armor < 5) return false;
    
    // Проверяем: есть ли хоть один астероид в радиусе 200 от игрока?
    const nearbyAsteroid = this.asteroids.some(asteroid => {
        const dx = asteroid.x - this.player.x;
        const dy = asteroid.y - this.player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < 200;
    });
    
    // Если рядом НЕТ астероидов → можно триггерить
    return !nearbyAsteroid;
    }

  private win(): void {
    this.gameRunning = false;
    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.ui.getElements().survivalTime.textContent = '60';
    this.ui.getElements().finalScore.textContent = this.score.toString();
    this.ui.getElements().asteroidsDestroyed.textContent = this.asteroidsDestroyed.toString();
    this.ui.setGameResult('YOU SURVIVED!', '#00ff88', '0 0 20px #00ff88');
    this.ui.showGameOver(true);
  }

  public startGame(): void {
    this.ui.showStart(false);
    this.ui.showHud(true);
    this.gameRunning = true;
    this.init();
    this.gameLoop();
  }
}
