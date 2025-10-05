import { ENTITY_TYPES } from "../constants/gameConstants";
import { AdvancedParticle } from "../game/objects/AdvancedParticle";
import { EntityManager } from "../managers/EntityManager";

export interface ParticlePreset {
  color: string;
  count: number;
  size: { min: number; max: number };
  speed: { min: number; max: number };
  life: { min: number; max: number };
  spread: number;
  fade: boolean;
  gravity?: number;
}

export class ParticleSystem {
  private presets: Map<string, ParticlePreset> = new Map();

  constructor() {
    this.initDefaultPresets();
  }

  private initDefaultPresets(): void {
    this.presets.set('star_collect', {
      color: '#ffff00',
      count: 15,
      size: { min: 1, max: 4 },
      speed: { min: 1, max: 4 },
      life: { min: 0.5, max: 1.5 },
      spread: 8,
      fade: true
    });

    this.presets.set('power_star_collect', {
      color: '#ff66ff',
      count: 25,
      size: { min: 2, max: 6 },
      speed: { min: 2, max: 6 },
      life: { min: 0.8, max: 2.0 },
      spread: 10,
      fade: true
    });

    this.presets.set('asteroid_destroy', {
      color: '#ff4444',
      count: 20,
      size: { min: 3, max: 8 },
      speed: { min: 3, max: 8 },
      life: { min: 0.3, max: 1.0 },
      spread: 12,
      fade: true
    });

    this.presets.set('player_trail', {
      color: '#00ffff',
      count: 3,
      size: { min: 1, max: 2 },
      speed: { min: 0.5, max: 1.5 },
      life: { min: 0.2, max: 0.5 },
      spread: 4,
      fade: true
    });

    this.presets.set('explosion', {
      color: '#ffaa00',
      count: 30,
      size: { min: 2, max: 6 },
      speed: { min: 5, max: 15 },
      life: { min: 0.5, max: 1.5 },
      spread: 15,
      fade: true,
      gravity: 0.1
    });
  }

  createParticles(
    x: number, 
    y: number, 
    presetName: string,
    entityManager: EntityManager
  ): void {
    const preset = this.presets.get(presetName);
    if (!preset) {
      console.warn(`Preset ${presetName} not found`);
      return;
    }

    for (let i = 0; i < preset.count; i++) {
      const size = Math.random() * (preset.size.max - preset.size.min) + preset.size.min;
      const speed = Math.random() * (preset.speed.max - preset.speed.min) + preset.speed.min;
      const life = Math.random() * (preset.life.max - preset.life.min) + preset.life.min;
      
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * preset.spread;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      const particle = new AdvancedParticle(
        x + Math.cos(angle) * distance,
        y + Math.sin(angle) * distance,
        vx, vy, size, preset.color, life, preset
      );

      entityManager.addEntity(ENTITY_TYPES.PARTICLES, particle);
    }
  }

  // Добавление кастомных пресетов во время выполнения
  addPreset(name: string, preset: ParticlePreset): void {
    this.presets.set(name, preset);
  }

  getPreset(name: string): ParticlePreset | undefined {
    return this.presets.get(name);
  }
}
