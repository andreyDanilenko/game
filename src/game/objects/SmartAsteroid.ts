import { Asteroid } from "./Asteroid";

export class SmartAsteroid extends Asteroid {
  private lifeTime = 10 * 60; // живет 10 секунд (в кадрах)
  // private immortal = true;    // не уничтожается от взрыва
  markedForRemoval = false;   // флаг удаления

  constructor(x: number, y: number, radius: number, vx: number, vy: number) {
    super(x, y, radius, vx, vy);
  }

  override update(gameSpeed: number, worldWidth?: number, worldHeight?: number): void {
    // Двигается так же, как обычный
    super.update(gameSpeed, worldWidth, worldHeight);
    this.lifeTime--;

    // Если время жизни закончилось — удалить
    if (this.lifeTime <= 0) {
      this.markedForRemoval = true;
    }

    // Если вылетел за границы мира — удалить
    if (
      this.x < -this.radius ||
      this.x > (worldWidth || 800) + this.radius ||
      this.y < -this.radius ||
      this.y > (worldHeight || 600) + this.radius
    ) {
      this.markedForRemoval = true;
    }
  }

  override render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    // Отличие: другой цвет и форма
    ctx.fillStyle = "#00ffff";
    ctx.strokeStyle = "#00dddd";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6;
      const x = Math.cos(angle) * this.radius;
      const y = Math.sin(angle) * this.radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }
}
