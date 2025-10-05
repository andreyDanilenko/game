// Player constants
export const PLAYER = {
  DEFAULT_ARMOR: 3,
  GLOW_RADIUS_MULTIPLIER: 2,
  INNER_CIRCLE_RADIUS: 0.6,
  ARMOR_ARC_RADIUS: 1.2,
  ARMOR_ARC_START_ANGLE: -Math.PI / 2,
  LINE_LENGTH: 0.8
} as const;

// Star constants
export const STAR = {
  PULSE_RANGE: { MIN: 0.8, MAX: 1.2 }, // 0.8 + pulse * 0.4
  GLOW_RADIUS_MULTIPLIER: 2,
  POINTS: 5,
  INNER_RADIUS_MULTIPLIER: 0.5,
  ROTATION_SPEED: { MIN: -0.05, MAX: 0.05 }, // (Math.random() - 0.5) * 0.1
  PULSE_SPEED: { MIN: 0.02, MAX: 0.07 }, // Math.random() * 0.05 + 0.02
  TIME_INCREMENT: 0.05,
  PULSE_AMPLITUDE: 0.5,
  PULSE_OFFSET: 0.5
} as const;

// PowerStar constants  
export const POWER_STAR = {
  PULSE_RANGE: { MIN: 0.8, MAX: 1.2 }, // 0.8 + pulse * 0.4
  GLOW_RADIUS_MULTIPLIER: 2.5,
  POINTS: 6,
  ROTATION_SPEED: { MIN: -0.075, MAX: 0.075 }, // (Math.random() - 0.5) * 0.15
  PULSE_SPEED: { MIN: 0.04, MAX: 0.12 }, // Math.random() * 0.08 + 0.04
  TIME_INCREMENT: 0.08,
  PULSE_AMPLITUDE: 0.7,
  PULSE_OFFSET: 0.3
} as const;

// Asteroid constants
export const ASTEROID = {
  GLOW_RADIUS_MULTIPLIER: 1.5,
  POINTS: 8,
  RADIUS_VARIATION: 0.3, // 0.7 + sin() * 0.3
  BASE_RADIUS: 0.7,
  ROTATION_SPEED: { MIN: -0.04, MAX: 0.04 } // (Math.random() - 0.5) * 0.08
} as const;

// Explosion constants
export const EXPLOSION = {
  MAX_RADIUS_MULTIPLIER: 3,
  LIFESPAN: 30,
  EXPANSION_RATE: 0.1 // radius += (maxRadius - radius) * 0.1
} as const;

// Particle constants
export const PARTICLE = {
  LIFESPAN: 40,
  GRAVITY: 0.1,
  VELOCITY_RANGE: 8, // (Math.random() - 0.5) * 8
  SIZE_RANGE: { MIN: 1, MAX: 5 } // Math.random() * 4 + 1
} as const;

// Game constants
export const GAME = {
  MAX_POWER: 100,
  POWER_INCREMENT: 0.5,
  BASE_GAME_SPEED: 1.0,
  UI_SPEED_RANGE: { MIN: 0.5, MAX: 3.0 },
  ZOOM_RANGE: { MIN: 0.5, MAX: 3.0 }
} as const;
