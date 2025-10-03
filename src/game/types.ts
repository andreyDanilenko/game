export interface GameObject {
  x: number;
  y: number;
  radius: number;
  update(gameSpeed: number): void;
  render(ctx: CanvasRenderingContext2D): void;
}

export interface Collectible extends GameObject {
  type: 'star' | 'powerStar';
}

export interface ParticleObject extends GameObject {
  vx: number;
  vy: number;
  life: number;
  color: string;
}
