import { BaseObject } from './BaseObject';

export class PowerStar extends BaseObject {
  type: 'powerStar' = 'powerStar';
  rotation = 0;
  rotationSpeed: number;
  pulse = 0;
  pulseSpeed: number;
  time = 0;

  constructor(x: number, y: number, radius: number) {
    super(x, y, radius);
    this.rotationSpeed = (Math.random() - 0.5) * 0.15;
    this.pulseSpeed = Math.random() * 0.08 + 0.04;
  }

  update(gameSpeed: number): void {
    this.rotation += this.rotationSpeed * gameSpeed;
    this.time += 0.08 * gameSpeed;
    this.pulse = Math.sin(this.time) * 0.7 + 0.3;
  }

  render(ctx: CanvasRenderingContext2D): void {
    const pulseRadius = this.radius * (0.8 + this.pulse * 0.4);
    
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, pulseRadius * 2.5);
    gradient.addColorStop(0, 'rgba(255, 102, 255, 0.9)');
    gradient.addColorStop(1, 'rgba(255, 102, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, pulseRadius * 2.5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6;
      const x = Math.cos(angle) * pulseRadius;
      const y = Math.sin(angle) * pulseRadius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = '#ff66ff';
    ctx.fill();
    ctx.stroke();
    
    ctx.restore();
  }
}
