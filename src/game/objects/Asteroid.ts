import { BaseObject } from './BaseObject';

export class Asteroid extends BaseObject {
  vx: number;
  vy: number;
  rotation = 0;
  rotationSpeed: number;
  health = 1;

  constructor(x: number, y: number, radius: number, vx: number, vy: number) {
    super(x, y, radius);
    this.vx = vx;
    this.vy = vy;
    this.rotationSpeed = (Math.random() - 0.5) * 0.08;
  }

  // Обновленный метод с динамическими границами
  update(gameSpeed: number, worldWidth?: number, worldHeight?: number): void {
    this.x += this.vx * gameSpeed;
    this.y += this.vy * gameSpeed;
    this.rotation += this.rotationSpeed * gameSpeed;
    
    // Используем переданные границы или значения по умолчанию
    const boundsWidth = worldWidth || 800;
    const boundsHeight = worldHeight || 600;
    
    // Bounce off edges с динамическими границами
    if (this.x - this.radius <= 0 || this.x + this.radius >= boundsWidth) {
      this.vx = -this.vx;
      this.x = Math.max(this.radius, Math.min(boundsWidth - this.radius, this.x));
    }
    if (this.y - this.radius <= 0 || this.y + this.radius >= boundsHeight) {
      this.vy = -this.vy;
      this.y = Math.max(this.radius, Math.min(boundsHeight - this.radius, this.y));
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius * 1.5);
    glowGradient.addColorStop(0, 'rgba(255, 68, 68, 0.4)');
    glowGradient.addColorStop(1, 'rgba(255, 68, 68, 0)');
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius * 1.5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#ff4444';
    ctx.strokeStyle = '#ff8888';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    const points = 8;
    for (let i = 0; i < points; i++) {
      const angle = (i * Math.PI * 2) / points;
      const radius = this.radius * (0.7 + Math.sin(Date.now() * 0.001 + i) * 0.3);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    ctx.restore();
  }
}
