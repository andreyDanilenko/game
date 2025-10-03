// systems/WorldSystem.ts
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
  }

  setScale(newScale: number): void {
    this.targetScale = Math.max(0.5, Math.min(3.0, newScale));
  }

  update(): void {
    // Плавное изменение масштаба
    this.scale += (this.targetScale - this.scale) * 0.1;
    
    // Обновляем размеры мира
    this.worldWidth = this.baseWidth * this.scale;
    this.worldHeight = this.baseHeight * this.scale;
  }

  applyWorldTransform(): void {
    this.ctx.save();
    
    // Масштабируем весь мир
    const scaleX = this.canvas.width / this.worldWidth;
    const scaleY = this.canvas.height / this.worldHeight;
    const uniformScale = Math.min(scaleX, scaleY);
    
    this.ctx.scale(uniformScale, uniformScale);
    
    // Центрируем мир
    const offsetX = (this.canvas.width / uniformScale - this.worldWidth) / 2;
    const offsetY = (this.canvas.height / uniformScale - this.worldHeight) / 2;
    this.ctx.translate(offsetX, offsetY);
  }

  restoreTransform(): void {
    this.ctx.restore();
  }

  // Конвертирует экранные координаты в мировые
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

  // Проверяет, находится ли точка в пределах мира
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
    this.worldWidth = this.baseWidth;
    this.worldHeight = this.baseHeight;
  }
}
