import { UIManager } from '../ui/UIManager';
import { Player } from './objects/Player';
import { Star } from './objects/Star';
import { PowerStar } from './objects/PowerStar';
import { Asteroid } from './objects/Asteroid';
import { Explosion } from './objects/Explosion';
import { Particle } from './objects/Particle';
import { WorldSystem } from '../systems/WorldSystem';
import { LevelSystem } from '../systems/LevelSystem';
import { SoundSystem } from '../systems/SoundSystem';
import { LevelConfig } from '../types/LevelTypes';
import { EntityManager } from '../managers/EntityManager';
import { ENTITY_TYPES } from '../constants/gameConstants';
import { ParticleSystem } from '../systems/ParticleSystem';
import { InputController } from './controllers/InputController';

export class Game {
  private canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
  private ctx = this.canvas.getContext('2d')!;
  private ui = new UIManager();
  private player: Player;

  private world: WorldSystem;
  private levelSystem: LevelSystem;
  private soundSystem: SoundSystem;
  private particleSystem: ParticleSystem;

   
  private entityManager: EntityManager;
  private inputController: InputController;

  private score = 0;
  private gameTime = 60;
  private power = 0;
  private gameRunning = false;
  private gameWon = false;
  private animationId: number | null = null;

  private gameSpeed = 1.0;
  private asteroidSpeed = 1.0; 
  private levelAsteroidSpeed = 1.0;

  private asteroidsDestroyed = 0;
  private currentZoomLevel = 1.0;

  constructor() {
    this.player = new Player(400, 600, 20);

    this.world = new WorldSystem(this.canvas, this.ctx);
    this.levelSystem = new LevelSystem();
    this.soundSystem = new SoundSystem();
    this.particleSystem = new ParticleSystem();
    this.entityManager = new EntityManager();

    this.ui.showStart(true);


    this.inputController = new InputController(this.canvas, this, this.ui, this.player, this.world);
  }


  public handleSpaceAction(): void {
    if (this.gameRunning) this.explodeAllObjects();
  }

  public adjustZoom(delta: number): void {
    this.setWorldZoom(this.currentZoomLevel + delta);
  }

  public resetZoom(): void {
    this.resetWorldZoom();
  }

  public setGameSpeed(speed: number): void {
    this.gameSpeed = speed;
  }

  public cancelAnimation(): void {
    if (this.animationId) cancelAnimationFrame(this.animationId);
  }

  public setWorldZoom(zoomLevel: number): void {
    this.currentZoomLevel = Math.max(0.5, Math.min(3.0, zoomLevel));
    this.world.setScale(this.currentZoomLevel);
    
    if (this.ui.setZoomDisplay) {
      this.ui.setZoomDisplay(this.currentZoomLevel);
    }
  }

  public resetWorldZoom(): void {
    this.currentZoomLevel = 1.0;
    this.world.setScale(1.0);
    
    const elements = this.ui.getElements();
    if (elements.zoomSlider) {
      elements.zoomSlider.value = '1.0';
    }
    if (this.ui.setZoomDisplay) {
      this.ui.setZoomDisplay(1.0);
    }
  }

  private init(): void {
    const level = this.levelSystem.getCurrentLevel();

    this.soundSystem.playMusic(level.music);
    this.applyLevelWorldSettings(level);
    this.resetGameState(level);
      
    this.gameSpeed = 1.0;
    this.levelAsteroidSpeed = level.gameSpeed;
    this.asteroidSpeed = this.levelAsteroidSpeed;
    this.ui.setSpeedDisplay(this.gameSpeed);

    this.spawnLevelObjects();
    this.updateUI();
    this.updateLevelUI();
  }

  private applyLevelWorldSettings(level: LevelConfig): void {
    this.world.setScale(level.worldScale);
  }

  private resetGameState(level: LevelConfig): void {
    this.score = 0;
    this.gameTime = level.duration;
    this.player.armor = 3;
    this.power = 0;
    this.asteroidsDestroyed = 0;
    this.gameWon = false;
    
    this.player.x = this.world.worldWidth / 2;
    this.player.y = this.world.worldHeight / 2;
    
    this.entityManager.clearEntities();
  }

  private spawnLevelObjects(): void {
    const settings = this.levelSystem.getCurrentLevel().spawnSettings;
    
    for (let i = 0; i < settings.stars; i++) this.createStar();
    for (let i = 0; i < settings.powerStars; i++) this.createPowerStar();
    for (let i = 0; i < settings.asteroids; i++) this.createBouncingAsteroid();
  }

  private createStar(): void {
    const spawnArea = this.world.getSpawnArea();
    const x = Math.random() * (spawnArea.width - 200) + 100;
    const y = Math.random() * (spawnArea.height - 200) + 100;
    const r = Math.random() * 8 + 4;
    this.entityManager.addEntity(ENTITY_TYPES.STARS, new Star(x, y, r));
  }

  private createPowerStar(): void {
    const spawnArea = this.world.getSpawnArea();
    const x = Math.random() * (spawnArea.width - 200) + 100;
    const y = Math.random() * (spawnArea.height - 200) + 100;
    const r = Math.random() * 10 + 6;
    this.entityManager.addEntity(ENTITY_TYPES.POWER_STARS, new PowerStar(x, y, r));
  }

  private createBouncingAsteroid(): void {
    const spawnArea = this.world.getSpawnArea();
    const size = Math.random() * 25 + 15;
    const x = Math.random() * (spawnArea.width - size * 4) + size * 2;
    const y = Math.random() * (spawnArea.height - size * 4) + size * 2;
    
    const baseSpeed = (Math.random() * 2 + 1) * this.levelAsteroidSpeed;
    const angle = Math.random() * Math.PI * 2;
  
    this.entityManager.addEntity(ENTITY_TYPES.ASTEROIDS, new Asteroid(
      x, y, size, 
      Math.cos(angle) * baseSpeed, 
      Math.sin(angle) * baseSpeed
    ));
  }

  private createParticles(x: number, y: number, color: string, count = 10): void {
    for (let i = 0; i < count; i++) {
      const vx = (Math.random() - 0.5) * 8;
      const vy = (Math.random() - 0.5) * 8;
      const r = Math.random() * 4 + 1;
      this.entityManager.addEntity(ENTITY_TYPES.PARTICLES, new Particle(x, y, vx, vy, r, color));
    }
  }

  private createExplosion(x: number, y: number, radius: number, color: string): void {
    this.entityManager.addEntity(ENTITY_TYPES.EXPLOSIONS, new Explosion(x, y, radius, color));
    this.createParticles(x, y, color, 30);
  }

  private createExplosionWave(centerX: number, centerY: number, power: number, color: string): void {
    const baseRadius = 30 + (power * 0.5);
    const waveCount = 2 + Math.floor(power / 50);
    const waveDelay = 150;
    const radiusIncrement = 20 + (power * 0.3);
    
    for (let i = 0; i < waveCount; i++) {
      setTimeout(() => {
        const currentRadius = baseRadius + (i * radiusIncrement);
        
        this.createExplosion(centerX, centerY, currentRadius, color);
        
        if (power > 50 && i > 0) {
          const circlePoints = 4 + Math.floor(power / 25);
          const angleStep = (2 * Math.PI) / circlePoints;
          
          for (let j = 0; j < circlePoints; j++) {
            const angle = j * angleStep;
            const offsetDistance = currentRadius * 0.6;
            const offsetX = Math.cos(angle) * offsetDistance;
            const offsetY = Math.sin(angle) * offsetDistance;
            
            this.createExplosion(
              centerX + offsetX,
              centerY + offsetY,
              currentRadius * 0.3,
              color
            );
          }
        }
      }, i * waveDelay);
    }
  }

  private explodeAllObjects(): void {
    const explosionPower = this.power;
    
    this.power = 0;
    this.ui.updatePower(0);
    
    this.createExplosionWave(this.player.x, this.player.y, explosionPower, '#ff66ff');
    this.destroyObjectsInRadius(this.player.x, this.player.y, explosionPower);
    
    const spawnDelay = 600 + (explosionPower * 2);
    
    setTimeout(() => {
      this.spawnLevelObjects();
      this.updateUI();
    }, spawnDelay);
  }

  private destroyObjectsInRadius(centerX: number, centerY: number, power: number): void {
    const explosionRadius = 100 + (power * 3);
    
    // Уничтожение астероидов
    const asteroidsToDestroy = this.entityManager.asteroids.filter(asteroid => {
      const dx = asteroid.x - centerX;
      const dy = asteroid.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance <= explosionRadius) {
        this.createExplosion(asteroid.x, asteroid.y, 15, '#ff6666');
        return true;
      }
      return false;
    });

    this.asteroidsDestroyed += asteroidsToDestroy.length;
    this.levelSystem.updateObjectiveProgress('asteroid_destroyed', asteroidsToDestroy.length);
    
    asteroidsToDestroy.forEach(asteroid => {
      this.entityManager.removeEntity(ENTITY_TYPES.ASTEROIDS, asteroid);
    });
    
    // Сбор звезд
    const starsCollected = this.collectStarsInRadius(centerX, centerY, explosionRadius, ENTITY_TYPES.STARS, '#ffffff', 8, 15);
    const powerStarsCollected = this.collectStarsInRadius(centerX, centerY, explosionRadius, ENTITY_TYPES.POWER_STARS, '#ff66ff', 12, 25);
    
    const starsScore = starsCollected * 15;
    const powerStarsScore = powerStarsCollected * 25;
    this.score += starsScore + powerStarsScore;
    
    this.levelSystem.updateObjectiveProgress('star_collected', starsCollected);
    this.levelSystem.updateObjectiveProgress('power_star_collected', powerStarsCollected);
    this.levelSystem.updateObjectiveProgress('score', starsScore + powerStarsScore);
  }

  private collectStarsInRadius(
    centerX: number, 
    centerY: number, 
    radius: number, 
    type: typeof ENTITY_TYPES.STARS | typeof ENTITY_TYPES.POWER_STARS,
    particleColor: string,
    particleCount: number,
    points: number
  ): number {
    const stars = type === ENTITY_TYPES.STARS ? this.entityManager.stars : this.entityManager.powerStars;
    const starsToRemove = stars.filter(star => {
      const dx = star.x - centerX;
      const dy = star.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance <= radius) {
        this.createParticles(star.x, star.y, particleColor, particleCount);
        return true;
      }
      return false;
    });

    starsToRemove.forEach(star => {
      this.entityManager.removeEntity(type, star);
    });

    return starsToRemove.length;
  }

  private updateUI(): void {
    this.ui.updateScore(this.score);
    this.ui.updateTime(this.gameTime);
    this.ui.updateArmor(this.player.armor);
    this.ui.updatePower(this.power);
  }

  private updateLevelUI(): void {
    const level = this.levelSystem.getCurrentLevel();
    const progress = this.levelSystem.getLevelProgress();
    this.ui.updateLevelObjectives(level.objectives);
    this.ui.updateLevelInfo(level.name, progress);
  }

  private checkCollisions(): void {
    // Звезды
    for (let i = this.entityManager.stars.length - 1; i >= 0; i--) {
      const star = this.entityManager.stars[i];
      const dx = star.x - this.player.x;
      const dy = star.y - this.player.y;
      if (Math.sqrt(dx * dx + dy * dy) < this.player.radius + star.radius) {
        this.handleStarCollection(star);
      }
    }

    // Power stars
    for (let i = this.entityManager.powerStars.length - 1; i >= 0; i--) {
      const powerStar = this.entityManager.powerStars[i];
      const dx = powerStar.x - this.player.x;
      const dy = powerStar.y - this.player.y;
      if (Math.sqrt(dx * dx + dy * dy) < this.player.radius + powerStar.radius) {
        this.handlePowerStarCollection(powerStar);
      }
    }

    // Астероиды
    for (let i = this.entityManager.asteroids.length - 1; i >= 0; i--) {
      const asteroid = this.entityManager.asteroids[i];
      const dx = asteroid.x - this.player.x;
      const dy = asteroid.y - this.player.y;
      if (Math.sqrt(dx * dx + dy * dy) < this.player.radius + asteroid.radius) {
        this.handleAsteroidCollision(asteroid);
      }
    }
  }

  private handleStarCollection(star: Star): void {
    this.entityManager.removeEntity(ENTITY_TYPES.STARS, star);
    this.score += 10;
    this.soundSystem.playEffect('collect_star');
    this.levelSystem.updateObjectiveProgress('star_collected', 1);
    this.levelSystem.updateObjectiveProgress('score', 10);
    this.particleSystem.createParticles(star.x, star.y, 'star_collect', this.entityManager);
    this.createStar();
    this.updateUI();
    this.updateLevelUI();
  }

  private handlePowerStarCollection(powerStar: PowerStar): void {
    this.entityManager.removeEntity(ENTITY_TYPES.POWER_STARS, powerStar);
    this.player.armor++;
    this.power = Math.min(100, this.power + 30);
    this.score += 25;
    this.levelSystem.updateObjectiveProgress('power_star_collected', 1);
    this.levelSystem.updateObjectiveProgress('score', 25);
    
    this.particleSystem.createParticles(powerStar.x, powerStar.y, 'power_star_collect', this.entityManager);

    this.createPowerStar();
    this.updateUI();
    this.updateLevelUI();
  }

  private handleAsteroidCollision(asteroid: Asteroid): void {
    if (this.player.armor > 0) {
      this.player.armor--;
      this.entityManager.removeEntity(ENTITY_TYPES.ASTEROIDS, asteroid);
      this.asteroidsDestroyed++;
      this.levelSystem.updateObjectiveProgress('asteroid_destroyed', 1);


      this.particleSystem.createParticles(asteroid.x, asteroid.y, 'asteroid_destroy', this.entityManager);


      this.createBouncingAsteroid();
      this.updateUI();
      this.updateLevelUI();
    } else {
      this.gameOver();
    }
  }

  private update(): void {
    if (!this.gameRunning) return;    

    this.world.update();

    if (this.gameTime > 0 && !this.gameWon) {
      this.gameTime -= 1 / 60;
      this.levelSystem.updateObjectiveProgress('time', 1/60);
      this.ui.updateTime(this.gameTime);
      
      if (this.gameTime <= 0) {
        this.checkLevelCompletion();
        return;
      }
    }

    if (this.power < 100) {
      this.power += 0.5;
      this.ui.updatePower(this.power);
    }

    const worldBounds = {
      width: this.world.worldWidth,
      height: this.world.worldHeight
    };
    
    this.asteroidSpeed = this.levelAsteroidSpeed * this.gameSpeed;
    this.asteroidSpeed = this.levelAsteroidSpeed * this.gameSpeed;
    this.entityManager.updateAllWithIndividualSpeeds(
      this.asteroidSpeed,
      worldBounds.width,
      worldBounds.height
    );
      
    this.cleanupExpiredEntities();
    this.checkCollisions();
  }

  private render(): void {
    this.world.clearCanvas(this.ctx, '#0a0a1a');
    this.world.applyWorldTransform();
    this.world.renderBackground(this.ctx, {
      zoomLevel: this.currentZoomLevel,
      starColor: 'rgba(255,255,255,0.2)',
      starCountMultiplier: 150
    });
  

    this.entityManager.renderEntities(this.ctx);
    this.player.render(this.ctx);
    this.world.restoreTransform();
  }

  private cleanupExpiredEntities(): void {
    const aliveParticles = this.entityManager.particles.filter(p => p.life > 0);
    this.entityManager.clearEntities(ENTITY_TYPES.PARTICLES);
    aliveParticles.forEach(p => this.entityManager.addEntity(ENTITY_TYPES.PARTICLES, p));
    
    const aliveExplosions = this.entityManager.explosions.filter(e => e.life > 0);
    this.entityManager.clearEntities(ENTITY_TYPES.EXPLOSIONS);
    aliveExplosions.forEach(e => this.entityManager.addEntity(ENTITY_TYPES.EXPLOSIONS, e));
  }

  private gameLoop = (): void => {
    if (!this.gameRunning) {
      this.animationId = null;
      return;
    }
    this.update();
    this.render();
    this.animationId = requestAnimationFrame(this.gameLoop);
  };

  private checkLevelCompletion(): void {
    const completion = this.levelSystem.checkLevelCompletion();
        
    if (completion.completed) {
      this.completeLevel();
    } else {
      this.failLevel();
    }
  }

  public startNewGame(): void {
    console.log('🎮 StartNewGame: начало новой игры с уровня 1');
    
    if (this.gameRunning && this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    this.ui.showStart(false);
    this.ui.showHud(true);
    this.gameRunning = true;
    
    if (!this.levelSystem) {
      this.levelSystem = new LevelSystem();
    } else {
      this.levelSystem.loadLevel(1);
    }
    
    this.init();
    this.gameLoop();
  }

  public startNextLevel(): void {
    const nextLevelId = this.levelSystem.getCurrentLevel().id + 1;
    console.log(`🎮 StartNextLevel: переход на уровень ${nextLevelId}`);
    
    this.levelSystem.loadLevel(nextLevelId);
    this.startLevel(nextLevelId);
  }

  public restartCurrentLevel(): void {
    const currentLevelId = this.levelSystem.getCurrentLevel().id;
    console.log(`🎮 RestartCurrentLevel: рестарт уровня ${currentLevelId}`);
    
    this.levelSystem.loadLevel(currentLevelId);
    this.startLevel(currentLevelId);
  }

  private startLevel(levelId: number): void {
    console.log(`🎮 StartLevel: запуск уровня ${levelId}`);
    
    this.gameRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    this.ui.showGameOver(false);
    this.ui.showHud(true);
    this.gameRunning = true;
    this.init();
    this.gameLoop();
  }

  private failLevel(): void {
    this.gameOver();
  }

  private completeLevel(): void {
    this.gameRunning = false;
    if (this.animationId) cancelAnimationFrame(this.animationId);

    this.soundSystem.playEffect('game_over');
    this.soundSystem.stopMusic();
    
    const completion = this.levelSystem.checkLevelCompletion();
    
    if (completion.completed) {
      if (this.levelSystem.hasNextLevel()) {
        this.showLevelCompleteScreen();
      } else {
        this.showGameCompleteScreen();
      }
    } else {
      this.showLevelFailedScreen();
    }
  }

  private showLevelCompleteScreen(): void {
    const level = this.levelSystem.getCurrentLevel();
    const stats = this.levelSystem.getLevelStats();
    
    this.ui.getElements().survivalTime.textContent = level.duration.toString();
    this.ui.getElements().finalScore.textContent = stats.score.toString();
    this.ui.getElements().asteroidsDestroyed.textContent = stats.asteroidsDestroyed.toString();
    this.ui.setGameResult(`УРОВЕНЬ ${level.id} ПРОЙДЕН!`, '#00ff88', '0 0 20px #00ff88');
    
    this.showNextLevelButton();
  }

  private showNextLevelButton(): void {
    const restartBtn = this.ui.getElements().restartButton;
    restartBtn.textContent = 'СЛЕДУЮЩИЙ УРОВЕНЬ';
    
    const originalHandler = restartBtn.onclick;
    restartBtn.onclick = () => {
      this.startNextLevel();
      restartBtn.onclick = originalHandler;
      restartBtn.textContent = 'PLAY AGAIN';
    };
    
    this.ui.showGameOver(true);
  }

  private showRestartLevelButton(): void {
    const restartBtn = this.ui.getElements().restartButton;
    restartBtn.textContent = 'ПОВТОРИТЬ УРОВЕНЬ';
    this.ui.showGameOver(true);
  }

  private showGameCompleteScreen(): void {
    const stats = this.levelSystem.getLevelStats();
    
    this.ui.getElements().survivalTime.textContent = this.levelSystem.getCurrentLevel().duration.toString();
    this.ui.getElements().finalScore.textContent = stats.score.toString();
    this.ui.getElements().asteroidsDestroyed.textContent = stats.asteroidsDestroyed.toString();
    this.ui.setGameResult('ВСЯ ИГРА ПРОЙДЕНА!', '#ffff00', '0 0 20px #ffff00');
    
    const restartBtn = this.ui.getElements().restartButton;
    restartBtn.textContent = 'ГЛАВНОЕ МЕНЮ';
    
    const originalHandler = restartBtn.onclick;
    restartBtn.onclick = () => {
      this.returnToMainMenu();
      restartBtn.onclick = originalHandler;
      restartBtn.textContent = 'PLAY AGAIN';
    };
    
    this.ui.showGameOver(true);
  }

  private showLevelFailedScreen(): void {
    const level = this.levelSystem.getCurrentLevel();
    const stats = this.levelSystem.getLevelStats();
    
    this.ui.getElements().survivalTime.textContent = Math.ceil(this.gameTime).toString();
    this.ui.getElements().finalScore.textContent = stats.score.toString();
    this.ui.getElements().asteroidsDestroyed.textContent = stats.asteroidsDestroyed.toString();
    this.ui.setGameResult(`УРОВЕНЬ ${level.id} ПРОВАЛЕН`, '#ff4444', '0 0 20px #ff4444');
    
    this.showRestartLevelButton();
  }

  public startGame(): void {
    if (this.gameRunning && this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    this.ui.showStart(false);
    this.ui.showHud(true);
    this.gameRunning = true;
    
    if (!this.levelSystem) {
      this.levelSystem = new LevelSystem();
    } else {
      console.log('🔄 StartGame: сброс на уровень 1');
      this.levelSystem.loadLevel(1);
    }
    
    this.init();
    this.gameLoop();
  }

  private returnToMainMenu(): void {
    console.log('🏠 ReturnToMainMenu: возврат в главное меню');
    
    this.gameRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    this.score = 0;
    this.gameTime = 60;
    this.power = 0;
    this.asteroidsDestroyed = 0;
    this.gameWon = false;
    
    this.entityManager.clearEntities();
    this.player.x = 400;
    this.player.y = 300;
    this.player.armor = 3;
    
    this.ui.showGameOver(false);
    this.ui.showHud(false);
    this.ui.showStart(true);
  }

  public restartEntireGame(): void {
    this.levelSystem.loadLevel(1);
    this.startLevel(1);
  }

  private gameOver(): void {
    this.gameRunning = false;
    if (this.animationId) { 
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    
    this.showLevelFailedScreen(); 
  }
}
