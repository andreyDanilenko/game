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
import { SmartAsteroid } from './objects/SmartAsteroid';

import { playerState, screenData, screenState, statState } from '../stores/gameStore';
import { gameEvents } from '../events/GameEvents';
import { objectives } from '../stores/levelStore';

export class Game {
  private canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
  private ctx = this.canvas.getContext('2d')!;
  private player: Player;

  private world: WorldSystem;
  private levelSystem: LevelSystem;
  private soundSystem: SoundSystem;
  private particleSystem: ParticleSystem;

  private entityManager: EntityManager;
  //@ts-ignore
  private inputController: InputController;

  private score = 0;
  private level = 1;
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

  // Конструктор класса Game
  constructor() {
    this.player = new Player(400, 600, 20);

    this.world = new WorldSystem(this.canvas, this.ctx);
    this.levelSystem = new LevelSystem();
    this.soundSystem = new SoundSystem();
    this.particleSystem = new ParticleSystem();
    this.entityManager = new EntityManager();

    this.inputController = new InputController(this.canvas, this, this.player, this.world);
    this.setupGameEventListeners();
  }

  // Обработчик действия по нажатию пробела
  public handleSpaceAction(): void {
    if (this.gameRunning) this.explodeAllObjects();
  }

  // Метод для изменения уровня масштабирования
  public adjustZoom(delta: number): void {
    this.setWorldZoom(this.currentZoomLevel + delta);
  }

  // Метод для установки скорости игры
  public setGameSpeed(speed: number): void {
    this.gameSpeed = speed;
  }

  // Метод для отмены анимации
  public cancelAnimation(): void {
    if (this.animationId) cancelAnimationFrame(this.animationId);
  }

  // Метод для установки масштаба мира
  public setWorldZoom(zoomLevel: number): void {
    this.currentZoomLevel = Math.max(0.5, Math.min(3.0, zoomLevel));
    this.world.setScale(this.currentZoomLevel);
  }

  // Метод инициализации игры
  private init(): void {
    const level = this.levelSystem.getCurrentLevel();

    this.soundSystem.playMusic(level.music);
    this.applyLevelWorldSettings(level);
    this.resetGameState(level);
      
    this.gameSpeed = 1.0;
    this.levelAsteroidSpeed = level.gameSpeed;
    this.asteroidSpeed = this.levelAsteroidSpeed;
    this.spawnLevelObjects();
    this.updateUI();
    this.updateLevelUI();
  }

  // Метод применения настроек мира для уровня
  private applyLevelWorldSettings(level: LevelConfig): void {
    this.world.setScale(level.worldScale);
  }

  // Метод сброса состояния игры
  private resetGameState(level: LevelConfig): void {
    console.log('resetGameState');
    // resetStore()
    this.score = 0;
    this.level = level.id;
    this.gameTime = level.duration;
    this.player.armor = 3;
    this.power = 0;
    this.asteroidsDestroyed = 0;
    this.gameWon = false;
    
    this.player.x = this.world.worldWidth / 2;
    this.player.y = this.world.worldHeight / 2;
    
    this.entityManager.clearEntities();
  }

  // Метод создания объектов уровня
  private spawnLevelObjects(): void {
    const settings = this.levelSystem.getCurrentLevel().spawnSettings;
    
    for (let i = 0; i < settings.stars; i++) this.createStar();
    for (let i = 0; i < settings.powerStars; i++) this.createPowerStar();
    for (let i = 0; i < settings.asteroids; i++) this.createBouncingAsteroid();
    
    const deathCount = settings.deathAsteroids ?? 0;
    for (let i = 0; i < deathCount; i++) this.createSmartAsteroid();
  }

  // Метод создания звезды
  private createStar(): void {
    const spawnArea = this.world.getSpawnArea();
    const x = Math.random() * (spawnArea.width - 200) + 100;
    const y = Math.random() * (spawnArea.height - 200) + 100;
    const r = Math.random() * 8 + 4;
    this.entityManager.addEntity(ENTITY_TYPES.STARS, new Star(x, y, r));
  }

  // Метод создания умного астероида
  private createSmartAsteroid(): void {
    const spawnArea = this.world.getSpawnArea();
    const size = Math.random() * 25 + 20;
    const x = Math.random() * spawnArea.width;
    const y = Math.random() * spawnArea.height;
    const vx = (Math.random() - 0.5) * 5;
    const vy = (Math.random() - 0.5) * 5;

    this.entityManager.addEntity(
      ENTITY_TYPES.ASTEROIDS,
      new SmartAsteroid(x, y, size, vx, vy)
    );
  }

  // Метод создания силовой звезды
  private createPowerStar(): void {
    const spawnArea = this.world.getSpawnArea();
    const x = Math.random() * (spawnArea.width - 200) + 100;
    const y = Math.random() * (spawnArea.height - 200) + 100;
    const r = Math.random() * 10 + 6;
    this.entityManager.addEntity(ENTITY_TYPES.POWER_STARS, new PowerStar(x, y, r));
  }

  // Метод создания отскакивающего астероида
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

  // Метод создания частиц
  private createParticles(x: number, y: number, color: string, count = 10): void {
    for (let i = 0; i < count; i++) {
      const vx = (Math.random() - 0.5) * 8;
      const vy = (Math.random() - 0.5) * 8;
      const r = Math.random() * 4 + 1;
      this.entityManager.addEntity(ENTITY_TYPES.PARTICLES, new Particle(x, y, vx, vy, r, color));
    }
  }

  // Метод создания взрыва
  private createExplosion(x: number, y: number, radius: number, color: string): void {
    this.entityManager.addEntity(ENTITY_TYPES.EXPLOSIONS, new Explosion(x, y, radius, color));
    this.createParticles(x, y, color, 30);
  }

  // Метод создания волны взрыва
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

  // Метод взрыва всех объектов
  private explodeAllObjects(): void {
    const explosionPower = this.power;
    
    this.power = 0;

    statState.update(state => ({
      ...state, 
      power: this.power,
    }));
    
    this.createExplosionWave(this.player.x, this.player.y, explosionPower, '#ff66ff');
    this.destroyObjectsInRadius(this.player.x, this.player.y, explosionPower);
    
    const spawnDelay = 600 + (explosionPower * 2);
    
    setTimeout(() => {
      this.spawnLevelObjects();
      this.updateUI();
    }, spawnDelay);
  }

  // Метод уничтожения объектов в радиусе
  private destroyObjectsInRadius(centerX: number, centerY: number, power: number): void {
          const explosionRadius = 100 + (power * 3);
          
          // Уничтожение астероидов
          const asteroidsToDestroy = this.entityManager.asteroids.filter(asteroid => {
            const dx = asteroid.x - centerX;
            const dy = asteroid.y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if ((asteroid as any).immortal) return false; // <-- неуничтожаемый

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

          const updatedObjectives = this.levelSystem.getCurrentLevel().objectives;
          objectives.set(updatedObjectives);
  }

  // Метод сбора звезд в радиусе
  private collectStarsInRadius(
    centerX: number, 
    centerY: number, 
    radius: number, 
    type: typeof ENTITY_TYPES.STARS | typeof ENTITY_TYPES.POWER_STARS,
    particleColor: string,
    particleCount: number,
    _points: number
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

  // Метод обновления интерфейса
  private updateUI(): void {
    const armor = this.player.armor
    statState.update(state => ({
      ...state, 
      score: this.score,
      power: this.power,
    }));

    playerState.update(state => ({
      ...state, 
      armor
    }));
  }

  // Метод обновления интерфейса уровня
  private updateLevelUI(): void {
    const level = this.levelSystem.getCurrentLevel();
    // const progress = this.levelSystem.getLevelProgress();
    
    console.log(level.objectives);
    
    objectives.set(level.objectives);
    // this.ui.updateLevelInfo(level.name, progress);
  }

  // Метод проверки столкновений
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
          if (asteroid instanceof SmartAsteroid) {
            this.gameOver();
          } else {
            this.handleAsteroidCollision(asteroid);
          }
      }
    }
  }

  // Метод обработки сбора звезды
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

  // Метод обработки сбора силовой звезды
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

  // Метод обработки столкновения с астероидом
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

  // Метод обновления игрового состояния
  private update(): void {
    if (!this.gameRunning) return;    

    this.world.update();

    if (this.gameTime > 0 && !this.gameWon) {
      this.gameTime -= 1 / 60;
      this.levelSystem.updateObjectiveProgress('time', 1/60);
      statState.update(state => ({...state, gameTime: this.gameTime }));
      
      if (this.gameTime <= 0) {        
        this.checkLevelCompletion();
        return;
      }
    }

    if (this.power < 100) {
      this.power += 0.5;
      statState.update(state => ({
        ...state, 
        power: this.power,
      }));
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

  // Метод отрисовки игры
  private render(): void {
    this.world.clearCanvas(this.ctx, '#0a0a1a');
    this.world.applyWorldTransform();
    this.world.renderBackground(this.ctx, {
      zoomLevel: this.currentZoomLevel,
      starColor: 'rgba(255,255,255,0.5)',
      starCountMultiplier: 750
    });
  

    this.entityManager.renderEntities(this.ctx);
    this.player.render(this.ctx);
    this.world.restoreTransform();
  }

  // Метод очистки устаревших сущностей
  private cleanupExpiredEntities(): void {
    const aliveParticles = this.entityManager.particles.filter(p => p.life > 0);
    this.entityManager.clearEntities(ENTITY_TYPES.PARTICLES);
    aliveParticles.forEach(p => this.entityManager.addEntity(ENTITY_TYPES.PARTICLES, p));
    
    const aliveExplosions = this.entityManager.explosions.filter(e => e.life > 0);
    this.entityManager.clearEntities(ENTITY_TYPES.EXPLOSIONS);
    aliveExplosions.forEach(e => this.entityManager.addEntity(ENTITY_TYPES.EXPLOSIONS, e));
  }

  // Главный игровой цикл
  private gameLoop = (): void => {
    if (!this.gameRunning) {
      this.animationId = null;
      return;
    }
    this.update();
    this.render();
    this.animationId = requestAnimationFrame(this.gameLoop);
  };

  // Метод проверки завершения уровня
  private checkLevelCompletion(): void {
    const completion = this.levelSystem.checkLevelCompletion();
    this.soundSystem.stopMusic();    
  
    if (completion.completed) {
      this.completeLevel();
    } else {
      this.failLevel();
    }
  }

  // Метод начала новой игры
  public startNewGame(): void {
    console.log('🎮 StartNewGame: начало новой игры с уровня 1');
    if (this.gameRunning && this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    this.gameRunning = true;
    
    if (!this.levelSystem) {
      this.levelSystem = new LevelSystem();
    } else {
      this.levelSystem.loadLevel(1);
    }

    screenState.set('game');
    this.init();
    this.gameLoop();
  }

  // Метод начала следующего уровня
  public startNextLevel(): void {
    const nextLevelId = this.levelSystem.getCurrentLevel().id + 1;
    console.log(`🎮 StartNextLevel: переход на уровень ${nextLevelId}`);

    screenState.set('game');
    this.levelSystem.loadLevel(nextLevelId);
    this.startLevel(nextLevelId);
  }

  // Метод перезапуска текущего уровня
  public restartCurrentLevel(): void {
    const currentLevelId = this.levelSystem.getCurrentLevel().id;
    console.log(`🎮 RestartCurrentLevel: рестарт уровня ${currentLevelId}`);

    screenState.set('game');
    this.levelSystem.loadLevel(currentLevelId);
    this.startLevel(currentLevelId);
  }

  // Метод запуска уровня
  private startLevel(levelId: number): void {
    console.log(`🎮 StartLevel: запуск уровня ${levelId}`);
    statState.update(state => ({
      ...state, 
      level: this.level,
    }));
    this.gameRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    screenState.set('game');

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

    if (this.levelSystem.hasNextLevel()) {
      this.showLevelCompleteScreen();
    } else {
      this.showGameCompleteScreen();
    }
  }

  private showGameCompleteScreen(): void {
    const stats = this.levelSystem.getLevelStats();

    screenData.update(data => ({
      ...data,
      gameComplete: {
        finalScore: stats.score,
        levelsCompleted: this.levelSystem.getCurrentLevel().id,
      }
    }));
    
    screenState.set('gameComplete');
  }

  private showLevelCompleteScreen(): void {
    const level = this.levelSystem.getCurrentLevel();
    const stats = this.levelSystem.getLevelStats();

    screenData.update(data => ({
      ...data,
      levelComplete: {
        title: `УРОВЕНЬ ${level.id} ПРОЙДЕН!`,
        survivalTime: level.duration,
        score: stats.score,
        asteroidsDestroyed: stats.asteroidsDestroyed
      }
    }));
    
    screenState.set('levelComplete');
  }

  private showLevelFailedScreen(): void {
    const level = this.levelSystem.getCurrentLevel();
    const stats = this.levelSystem.getLevelStats();

    screenData.update(data => ({
      ...data,
      levelFailed: {
        title: `УРОВЕНЬ ${level.id} ПРОВАЛЕН`,
        score: stats.score,
        survivalTime: Math.ceil(this.gameTime),
        asteroidsDestroyed: stats.asteroidsDestroyed
      }
    }));
    
    // Показываем экран
    screenState.set('levelFailed');
  }

  // Обработчик событий от Svelte компонентов
    private setupGameEventListeners(): void {
      gameEvents.on((action) => {
        console.log('🎮 Game action:', action);
        switch (action) {
          case 'startGame': this.startNewGame(); break;
          case 'nextLevel': this.startNextLevel(); break;
          case 'restartLevel': this.restartCurrentLevel(); break;
          case 'restartGame': this.restartEntireGame(); break;
          case 'mainMenu': this.returnToMainMenu(); break;
        }
      });
    }


  // Метод начала игры
  public startGame(): void {
    if (this.gameRunning && this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    this.gameRunning = true;
    
    if (!this.levelSystem) {
      this.levelSystem = new LevelSystem();
    } else {
      console.log('🔄 StartGame: сброс на уровень 1');
      this.levelSystem.loadLevel(1);
    }

    screenState.set('game');
    
    this.init();
    this.gameLoop();
  }

  // Метод возврата в главное меню
  private returnToMainMenu(): void {
    console.log('🏠 ReturnToMainMenu: возврат в главное меню');
    
    this.gameRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    this.score = 0;
    this.level = 1;
    this.gameTime = 60;
    this.power = 0;
    this.asteroidsDestroyed = 0;

    this.gameWon = false;
    
    this.entityManager.clearEntities();
    this.player.x = 400;
    this.player.y = 300;
    this.player.armor = 3;
    screenState.set('start');
  }

  // Метод перезапуска всей игры
  public restartEntireGame(): void {
    this.levelSystem.loadLevel(1);
    this.startLevel(1);
  }

  // Метод завершения игры
  private gameOver(): void {
    this.gameRunning = false;
    if (this.animationId) { 
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    console.log('game over');
    this.showLevelFailedScreen(); 
  }
}
