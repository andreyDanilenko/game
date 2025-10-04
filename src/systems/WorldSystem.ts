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
    // Ширина = 100% от ширины экрана
    const screenWidth = window.innerWidth;
    
    // Высота = 80% от высоты экрана  
    const screenHeight = window.innerHeight * 1;
    



    this.baseWidth = screenWidth;
    this.baseHeight = screenHeight;
    
    this.worldWidth = this.baseWidth;
    this.worldHeight = this.baseHeight;

    console.log( this.baseWidth , this.baseHeight);
    
    
    // Обновляем размеры канваса
    this.canvas.width = this.worldWidth;
    this.canvas.height = this.worldHeight;
    
    console.log(`World size: ${this.worldWidth}x${this.worldHeight}`);
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
}
