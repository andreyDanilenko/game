import { UIManager } from '../ui/UIManager';
import { Player } from './objects/Player';
import { Star } from './objects/Star';
import { PowerStar } from './objects/PowerStar';
import { Asteroid } from './objects/Asteroid';
import { Explosion } from './objects/Explosion';
import { Particle } from './objects/Particle';
import { WorldSystem } from '../systems/WorldSystem';
import { LevelSystem } from '../systems/LevelSystem';
import { LevelConfig } from '../types/LevelTypes';

export class Game {
  private canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
  private ctx = this.canvas.getContext('2d')!;
  private ui = new UIManager();
  private player: Player;

  // Система мира
  private world: WorldSystem;

  // Система уровней
  private levelSystem: LevelSystem;
  private currentLevel: LevelConfig;
  
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

  private currentZoomLevel = 1.0;

  constructor() {
    this.levelSystem = new LevelSystem();
    this.currentLevel = this.levelSystem.getCurrentLevel();

    this.player = new Player(400, 300, 20);
    this.world = new WorldSystem(this.canvas, this.ctx);
    this.initEventListeners();
    this.ui.showStart(true);
    this.setupZoomControls();
  }

  private setupZoomControls(): void {
    const elements = this.ui.getElements();
    
    if (elements.zoomSlider) {
      elements.zoomSlider.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        const zoomValue = parseFloat(target.value);
        this.setWorldZoom(zoomValue);
        this.ui.setZoomDisplay(zoomValue);
      });
    }

    if (elements.zoomInBtn) {
      elements.zoomInBtn.addEventListener('click', () => {
        this.setWorldZoom(this.currentZoomLevel + 0.5);
      });
    }

    if (elements.zoomOutBtn) {
      elements.zoomOutBtn.addEventListener('click', () => {
        this.setWorldZoom(this.currentZoomLevel - 0.5);
      });
    }

    if (elements.zoomResetBtn) {
      elements.zoomResetBtn.addEventListener('click', () => {
        this.resetWorldZoom();
      });
    }
  }


  private setWorldZoom(zoomLevel: number): void {
    this.currentZoomLevel = Math.max(0.5, Math.min(3.0, zoomLevel));
    this.world.setScale(this.currentZoomLevel);
    
    // Обновляем UI
    if (this.ui.setZoomDisplay) {
      this.ui.setZoomDisplay(this.currentZoomLevel);
    }
  }

  private resetWorldZoom(): void {
    this.currentZoomLevel = 1.0;
    this.world.setScale(1.0);
    
    // Обновляем UI элементы
    const elements = this.ui.getElements();
    if (elements.zoomSlider) {
      elements.zoomSlider.value = '1.0';
    }
    if (this.ui.setZoomDisplay) {
      this.ui.setZoomDisplay(1.0);
    }
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
      
      // Конвертируем в мировые координаты
      const worldPos = this.world.screenToWorld(this.mouseX, this.mouseY);
      
      // Ограничиваем движение игрока в пределах мира
      this.player.x = Math.max(this.player.radius, 
        Math.min(this.world.worldWidth - this.player.radius, worldPos.x));
      this.player.y = Math.max(this.player.radius, 
        Math.min(this.world.worldHeight - this.player.radius, worldPos.y));
    });

    // Добавляем колесо мыши для зума мира
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomDelta = e.deltaY > 0 ? -0.2 : 0.2;
      this.setWorldZoom(this.currentZoomLevel + zoomDelta);
    });

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && this.gameRunning) {
        this.explodeAllObjects();
      }
      // Горячие клавиши для зума мира
      if (e.code === 'Equal' || e.code === 'NumpadAdd') {
        e.preventDefault();
        this.setWorldZoom(this.currentZoomLevel + 0.5);
      }
      if (e.code === 'Minus' || e.code === 'NumpadSubtract') {
        e.preventDefault();
        this.setWorldZoom(this.currentZoomLevel - 0.5);
      }
      if (e.code === 'Digit0') {
        this.resetWorldZoom();
      }
    });

    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.touches[0].clientX - rect.left;
      this.mouseY = e.touches[0].clientY - rect.top;
      
      const worldPos = this.world.screenToWorld(this.mouseX, this.mouseY);
      this.player.x = Math.max(this.player.radius, 
        Math.min(this.world.worldWidth - this.player.radius, worldPos.x));
      this.player.y = Math.max(this.player.radius, 
        Math.min(this.world.worldHeight - this.player.radius, worldPos.y));
    });
  }

  private init(): void {
    this.score = 0;
    this.gameTime = 60;
    this.player.armor = 3;
    this.power = 0;
    this.asteroidsDestroyed = 0;
    this.gameWon = false;

    // Сбрасываем мир
    this.resetWorldZoom();
    this.world.reset();

    // Перемещаем игрока в центр нового мира
    this.player.x = this.world.worldWidth / 2;
    this.player.y = this.world.worldHeight / 2;

    this.updateUI();

    this.stars = [];
    this.powerStars = [];
    this.asteroids = [];
    this.particles = [];
    this.explosions = [];

    // Создаем объекты с учетом нового размера мира
    for (let i = 0; i < 8; i++) this.createStar();
    for (let i = 0; i < 2; i++) this.createPowerStar();
    for (let i = 0; i < 6; i++) this.createBouncingAsteroid();
  }

  private createStar(): void {
    const spawnArea = this.world.getSpawnArea();
    const x = Math.random() * (spawnArea.width - 100) + 50;
    const y = Math.random() * (spawnArea.height - 100) + 50;
    const r = Math.random() * 8 + 4;
    this.stars.push(new Star(x, y, r));
  }

  private createPowerStar(): void {
    const spawnArea = this.world.getSpawnArea();
    const x = Math.random() * (spawnArea.width - 100) + 50;
    const y = Math.random() * (spawnArea.height - 100) + 50;
    const r = Math.random() * 10 + 6;
    this.powerStars.push(new PowerStar(x, y, r));
  }

  private createBouncingAsteroid(): void {
    const spawnArea = this.world.getSpawnArea();
    const size = Math.random() * 25 + 15;
    const x = Math.random() * (spawnArea.width - size * 2) + size;
    const y = Math.random() * (spawnArea.height - size * 2) + size;
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

private createExplosionWave(centerX: number, centerY: number, power: number, color: string): void {
  const baseRadius = 30 + (power * 0.5); // Базовый радиус зависит от мощности
  const waveCount = 2 + Math.floor(power / 50); // Количество волн зависит от мощности
  const waveDelay = 150; // Задержка между волнами
  const radiusIncrement = 20 + (power * 0.3); // Увеличение радиуса зависит от мощности
  
  for (let i = 0; i < waveCount; i++) {
    setTimeout(() => {
      const currentRadius = baseRadius + (i * radiusIncrement);
      const particleCount = 15 + (i * 8) + Math.floor(power / 10);
      
      // Основной взрыв
      this.createExplosion(centerX, centerY, currentRadius, color);
      
      // Дополнительные взрывы для мощных волн
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
    // Взрыв всегда происходит, но масштаб зависит от мощности
    const explosionPower = this.power; // Сохраняем текущую мощность
    
    // Сбрасываем мощность
    this.power = 0;
    this.ui.updatePower(0);
    
    // Создаем волну взрывов из позиции игрока
    this.createExplosionWave(this.player.x, this.player.y, explosionPower, '#ff66ff');
    
    // Уничтожаем объекты в радиусе в зависимости от мощности
    this.destroyObjectsInRadius(this.player.x, this.player.y, explosionPower);
    
    // Задержка перед спауном новых объектов
    const spawnDelay = 600 + (explosionPower * 2); // Задержка тоже зависит от мощности
    
    setTimeout(() => {
      // Спауним новые объекты
      for (let i = 0; i < 4; i++) this.createBouncingAsteroid();
      for (let i = 0; i < 6; i++) this.createStar();
      for (let i = 0; i < 1; i++) this.createPowerStar();
      
      this.updateUI();
    }, spawnDelay);
  }

  // Новая функция для уничтожения объектов в радиусе
  private destroyObjectsInRadius(centerX: number, centerY: number, power: number): void {
    const explosionRadius = 100 + (power * 3); 
    
    // Уничтожаем астероиды в радиусе
    const asteroidsToDestroy: Asteroid[] = [];
    this.asteroids.forEach(asteroid => {
      const dx = asteroid.x - centerX;
      const dy = asteroid.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance <= explosionRadius) {
        asteroidsToDestroy.push(asteroid);
        // Создаем маленький взрыв на астероиде
        this.createExplosion(asteroid.x, asteroid.y, 15, '#ff6666');
      }
  });
  
  this.asteroidsDestroyed += asteroidsToDestroy.length;
  this.asteroids = this.asteroids.filter(a => !asteroidsToDestroy.includes(a));
  
  // Собираем звезды в радиусе
  let starsCollected = 0;
  let powerStarsCollected = 0;
  
  this.stars.forEach(star => {
    const dx = star.x - centerX;
    const dy = star.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance <= explosionRadius) {
      starsCollected++;
      this.createParticles(star.x, star.y, '#ffffff', 8);
    }
  });
  
  this.powerStars.forEach(powerStar => {
    const dx = powerStar.x - centerX;
    const dy = powerStar.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance <= explosionRadius) {
      powerStarsCollected++;
      this.createParticles(powerStar.x, powerStar.y, '#ff66ff', 12);
    }
  });
  
  // Начисляем очки
  this.score += starsCollected * 15 + powerStarsCollected * 25;
  
  // Удаляем собранные объекты
  this.stars = this.stars.filter(star => {
    const dx = star.x - centerX;
    const dy = star.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance > explosionRadius;
  });
  
  this.powerStars = this.powerStars.filter(powerStar => {
    const dx = powerStar.x - centerX;
    const dy = powerStar.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance > explosionRadius;
  });
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

// В методе update класса Game
private update(): void {
  if (!this.gameRunning) return;

  // Обновляем мир
  this.world.update();

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

  // Получаем текущие границы мира
  const worldBounds = {
    width: this.world.worldWidth,
    height: this.world.worldHeight
  };

  this.stars.forEach(s => s.update(this.gameSpeed));
  this.powerStars.forEach(p => p.update(this.gameSpeed));
  
  // Передаем динамические границы астероидам
  this.asteroids.forEach(a => {
    a.update(this.gameSpeed, worldBounds.width, worldBounds.height);
  });
  
  this.explosions.forEach(e => e.update(this.gameSpeed));
  this.particles.forEach(p => p.update(this.gameSpeed));

  this.explosions = this.explosions.filter(e => e.life > 0);
  this.particles = this.particles.filter(p => p.life > 0);

  this.checkCollisions();
}
  private render(): void {
    this.ctx.fillStyle = '#0a0a1a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Применяем трансформации мира
    this.world.applyWorldTransform();

    // Background stars (теперь масштабируются с миром)
    this.ctx.fillStyle = 'rgba(255,255,255,0.2)';
    const starCount = 150 * this.currentZoomLevel;
    for (let i = 0; i < starCount; i++) {
      const x = (i * 41) % this.world.worldWidth;
      const y = (i * 67) % this.world.worldHeight;
      const size = Math.sin(Date.now() * 0.001 + i) * 0.3 + 1;
      this.ctx.beginPath();
      this.ctx.arc(x, y, size, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Рендерим игровые объекты
    this.explosions.forEach(e => e.render(this.ctx));
    this.stars.forEach(s => s.render(this.ctx));
    this.powerStars.forEach(p => p.render(this.ctx));
    this.asteroids.forEach(a => a.render(this.ctx));
    this.player.render(this.ctx);
    this.particles.forEach(p => p.render(this.ctx));

    // Восстанавливаем трансформации
    this.world.restoreTransform();
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
