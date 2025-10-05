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
      case 'grid':
        this.renderGridBackground(ctx, zoomLevel, starColor);
        break;
      case 'nebula':
        this.renderNebulaBackground(ctx, zoomLevel);
        break;
    }
  }

  private renderStarBackground(
    ctx: CanvasRenderingContext2D,
    zoomLevel: number,
    starColor: string,
    starCountMultiplier: number,
    animationSpeed: number
  ): void {
    ctx.fillStyle = starColor;
    const starCount = starCountMultiplier * zoomLevel;
    
    for (let i = 0; i < starCount; i++) {
      const x = (i * 41) % this.worldWidth;
      const y = (i * 67) % this.worldHeight;
      const size = Math.sin(Date.now() * animationSpeed + i) * 0.3 + 1;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private renderGridBackground(ctx: CanvasRenderingContext2D, zoomLevel: number, color: string): void {
    // логика сетки
  }

  private renderNebulaBackground(ctx: CanvasRenderingContext2D, zoomLevel: number): void {
    // логика туманности
  }

  clearCanvas(ctx: CanvasRenderingContext2D, backgroundColor: string = '#0a0a1a'): void {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
