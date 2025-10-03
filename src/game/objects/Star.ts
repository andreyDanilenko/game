import { BaseObject } from './BaseObject';

export class Star extends BaseObject {
  type: 'star' = 'star';
  rotation = 0;
  rotationSpeed: number;
  pulse = 0;
  pulseSpeed: number;
  time = 0;

  constructor(x: number, y: number, radius: number) {
    super(x, y, radius);
    this.rotationSpeed = (Math.random() - 0.5) * 0.1;
    this.pulseSpeed = Math.random() * 0.05 + 0.02;
  }

  update(gameSpeed: number): void {
    this.rotation += this.rotationSpeed * gameSpeed;
    this.time += 0.05 * gameSpeed;
    this.pulse = Math.sin(this.time) * 0.5 + 0.5;
  }

  render(ctx: CanvasRenderingContext2D): void {
    const pulseRadius = this.radius * (0.8 + this.pulse * 0.4);
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, pulseRadius * 2);
    gradient.addColorStop(0, 'rgba(255, 255, 0, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, pulseRadius * 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
      const outerX = Math.cos(angle) * pulseRadius;
      const outerY = Math.sin(angle) * pulseRadius;
      if (i === 0) ctx.moveTo(outerX, outerY);
      else ctx.lineTo(outerX, outerY);
      const innerAngle = angle + Math.PI / 5;
      const innerX = Math.cos(innerAngle) * pulseRadius * 0.5;
      const innerY = Math.sin(innerAngle) * pulseRadius * 0.5;
      ctx.lineTo(innerX, innerY);
    }
    ctx.closePath();
    ctx.fillStyle = '#ffff00';
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}
