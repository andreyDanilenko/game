import { BaseObject } from './BaseObject';

export class Player extends BaseObject {
  armor = 3;

  constructor(x: number, y: number, radius: number) {
    super(x, y, radius);
  }

  update(gameSpeed: number): void {
    // Player position is controlled externally
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this.x, this.y);
    
    const playerGlowColor = this.armor > 0 ? 'rgba(0, 255, 255, 0.6)' : 'rgba(255, 100, 100, 0.6)';
    const playerGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius * 2);
    playerGlow.addColorStop(0, playerGlowColor);
    playerGlow.addColorStop(1, 'rgba(0, 255, 255, 0)');
    ctx.fillStyle = playerGlow;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius * 2, 0, Math.PI * 2);
    ctx.fill();
    
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius);
    gradient.addColorStop(0, '#00ffff');
    gradient.addColorStop(1, '#0088ff');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -this.radius * 0.8);
    ctx.lineTo(0, this.radius * 0.8);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(0, 0, this.radius * 0.6, 0, Math.PI * 2);
    ctx.stroke();
    
    if (this.armor > 0) {
      ctx.strokeStyle = '#00ff88';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius * 1.2, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * (this.armor / 5)));
      ctx.stroke();
    }
    
    ctx.restore();
  }
}
