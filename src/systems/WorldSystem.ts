import { BackgroundOptions } from "../types/WorldTypes";

export class WorldSystem {
  public worldWidth: number = 800;
  public worldHeight: number = 600;
  public baseWidth: number = 800;
  public baseHeight: number = 600;
  public scale: number = 1.0;
  public targetScale: number = 1.0;
  
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.updateWorldSize();
    this.setupResizeListener();
  }

  private updateWorldSize(): void {
    const screenWidth = window.innerWidth;
    
    if (screenWidth < 1000) {
      // Если экран меньше 1000px - пересчитываем
      const screenHeight = window.innerHeight;
      
      this.baseWidth = screenWidth;
      this.baseHeight = screenHeight;
    } else {
      // Если экран 1000px и больше - используем стандартные размеры
      this.baseWidth = 800;
      this.baseHeight = 600;
    }
    
    this.worldWidth = this.baseWidth;
    this.worldHeight = this.baseHeight;
    
    // Обновляем размеры канваса
    this.canvas.width = this.worldWidth;
    this.canvas.height = this.worldHeight;
    
    console.log(`World size: ${this.worldWidth}x${this.worldHeight}, Screen: ${window.innerWidth}x${window.innerHeight}`);
  }

  private setupResizeListener(): void {
    window.addEventListener('resize', () => {
      this.updateWorldSize();
    });
    
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.updateWorldSize();
      }, 100);
    });
  }

  // Остальные методы без изменений
  setScale(newScale: number): void {
    this.targetScale = Math.max(0.5, Math.min(3.0, newScale));
  }

  restoreTransform(): void {
    this.ctx.restore();
  }

  update(): void {    
    this.scale += (this.targetScale - this.scale) * 0.1;
    this.worldWidth = this.baseWidth * this.scale;
    this.worldHeight = this.baseHeight * this.scale;    
  }

  applyWorldTransform(): void {
    this.ctx.save();
    const scaleX = this.canvas.width / this.worldWidth;
    const scaleY = this.canvas.height / this.worldHeight;
    const uniformScale = Math.min(scaleX, scaleY);

    this.ctx.scale(uniformScale, uniformScale);
    const offsetX = (this.canvas.width / uniformScale - this.worldWidth) / 2;
    const offsetY = (this.canvas.height / uniformScale - this.worldHeight) / 2;
    
    this.ctx.translate(offsetX, offsetY);
  }

  screenToWorld(screenX: number, screenY: number): { x: number, y: number } {
    const scaleX = this.canvas.width / this.worldWidth;
    const scaleY = this.canvas.height / this.worldHeight;
    const uniformScale = Math.min(scaleX, scaleY);
    
    const offsetX = (this.canvas.width / uniformScale - this.worldWidth) / 2;
    const offsetY = (this.canvas.height / uniformScale - this.worldHeight) / 2;
    
    return {
      x: (screenX / uniformScale) - offsetX,
      y: (screenY / uniformScale) - offsetY
    };
  }

  getVisibleArea(): { x: number; y: number; width: number; height: number } {
    const scaleX = this.canvas.width / this.worldWidth;
    const scaleY = this.canvas.height / this.worldHeight;
    const uniformScale = Math.min(scaleX, scaleY);
    
    const visibleWidth = this.canvas.width / uniformScale;
    const visibleHeight = this.canvas.height / uniformScale;
    
    return {
      x: (this.worldWidth - visibleWidth) / 2,
      y: (this.worldHeight - visibleHeight) / 2,
      width: visibleWidth,
      height: visibleHeight
    };
  }

  isInWorld(x: number, y: number): boolean {
    return x >= 0 && x <= this.worldWidth && y >= 0 && y <= this.worldHeight;
  }

  getSpawnArea(): { width: number; height: number } {
    return {
      width: this.worldWidth,
      height: this.worldHeight
    };
  }

  reset(): void {
    this.scale = 1.0;
    this.targetScale = 1.0;
    this.updateWorldSize(); // Сбрасываем к текущему размеру экрана
  }

  renderBackground(ctx: CanvasRenderingContext2D, options: BackgroundOptions): void {
    const {
      zoomLevel,
      starColor = 'rgba(255,255,255,0.2)',
      starCountMultiplier = 150,
      animationSpeed = 0.001,
      pattern = 'stars'
    } = options;

    switch (pattern) {
      case 'stars':
        this.renderStarBackground(ctx, zoomLevel, starColor, starCountMultiplier, animationSpeed);
        break;
      // case 'grid':
      //   this.renderGridBackground(ctx, zoomLevel, starColor);
      //   break;
      // case 'nebula':
      //   this.renderNebulaBackground(ctx, zoomLevel);
      //   break;
    }
  }

  private renderStarBackground(
    ctx: CanvasRenderingContext2D,
    zoomLevel: number,
    starColor: string,
    starCountMultiplier: number,
    animationSpeed: number
  ): void {
    const starCount = Math.floor(starCountMultiplier * zoomLevel);
    
    // Используем seed для стабильного рандома при любом размере экрана
    const seed = 12345; // фиксированный seed для одинакового распределения
    
    for (let i = 0; i < starCount; i++) {
      // Псевдо-рандом на основе seed и индекса
      const random1 = Math.sin(i * 12.9898 + seed) * 43758.5453;
      const random2 = Math.cos(i * 78.233 + seed) * 43758.5453;
      const random3 = Math.sin(i * 45.164 + seed) * 43758.5453;
      
      const fract1 = random1 - Math.floor(random1);
      const fract2 = random2 - Math.floor(random2);
      const fract3 = random3 - Math.floor(random3);
      
      // Равномерное распределение по всему пространству
      const baseX = fract1 * this.worldWidth;
      const baseY = fract2 * this.worldHeight;
      
      // Разные типы звезд с рандомными параметрами
      const starType = Math.floor(fract3 * 4);
      const timeOffset = Date.now() * animationSpeed + i * 0.1;
      
      switch (starType) {
        case 0: // Мелкие белые звезды (60%)
          ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + Math.sin(timeOffset) * 0.15})`;
          ctx.beginPath();
          ctx.arc(baseX, baseY, 0.3 + fract1 * 0.7, 0, Math.PI * 2);
          ctx.fill();
          break;
          
        case 1: // Средние голубые звезды (25%)
          ctx.fillStyle = `rgba(180, 220, 255, ${0.4 + Math.sin(timeOffset * 1.3) * 0.25})`;
          ctx.beginPath();
          ctx.arc(baseX, baseY, 0.8 + fract2 * 1.2, 0, Math.PI * 2);
          ctx.fill();
          break;
          
        case 2: // Крупные желтые звезды (10%)
          ctx.fillStyle = `rgba(255, 255, 180, ${0.5 + Math.sin(timeOffset * 0.8) * 0.3})`;
          ctx.beginPath();
          ctx.arc(baseX, baseY, 1.5 + fract3 * 1.5, 0, Math.PI * 2);
          ctx.fill();
          break;
          
        case 3: // Яркие разноцветные звезды (5%)
          const colors = [
            `rgba(255, 180, 180, ${0.6 + Math.sin(timeOffset * 2) * 0.3})`, // розовая
            `rgba(180, 255, 180, ${0.6 + Math.sin(timeOffset * 1.5) * 0.3})`, // зеленая
            `rgba(180, 180, 255, ${0.6 + Math.sin(timeOffset * 1.8) * 0.3})`  // голубая
          ];
          ctx.fillStyle = colors[Math.floor(fract1 * 3)];
          ctx.beginPath();
          ctx.arc(baseX, baseY, 1.0 + fract2 * 1.0, 0, Math.PI * 2);
          ctx.fill();
          break;
      }
    }
  }

  // private renderGridBackground(ctx: CanvasRenderingContext2D, zoomLevel: number, color: string): void {
  //   // логика сетки
  // }

  // private renderNebulaBackground(ctx: CanvasRenderingContext2D, zoomLevel: number): void {
  //   // логика туманности
  // }

  clearCanvas(ctx: CanvasRenderingContext2D, backgroundColor: string = '#0a0a1a'): void {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
