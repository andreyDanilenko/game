export class SoundSystem {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private currentMusic: string | null = null;
  private volume = 0.7;
  private isMuted = false;

  constructor() {
    this.preloadSounds();
  }

  private preloadSounds(): void {
    // Манифест звуков - легко расширять
    const soundManifest = {
      // Музыка уровней
      music_level1: '/sounds/music/level1.mp3',
      music_level2: '/sounds/music/level2.mp3',
      music_level3: '/sounds/music/level3.mp3',
      music_boss: '/sounds/music/boss.mp3',
      music_menu: '/sounds/music/menu.mp3',
      
      // Звуковые эффекты
      explosion: '/sounds/effects/explosion.wav',
      collect_star: '/sounds/effects/collect_star.wav',
      collect_power: '/sounds/effects/collect_power.wav',
      level_complete: '/sounds/effects/level_complete.wav',
      game_over: '/sounds/effects/game_over.wav'
    };

    Object.entries(soundManifest).forEach(([key, path]) => {
      const audio = new Audio();
      audio.src = path;
      audio.preload = 'auto';
      audio.volume = this.volume;
      this.sounds.set(key, audio);
    });
  }

  playMusic(trackId: string, loop = true): void {
    if (this.currentMusic === trackId) return;
    
    this.stopMusic();
    
    const music = this.sounds.get(trackId);
    if (music) {
      music.loop = loop;
      music.volume = this.volume;
      music.play().catch(e => console.log('Audio play failed:', e));
      this.currentMusic = trackId;
    }
  }

  stopMusic(): void {
    if (this.currentMusic) {
      const music = this.sounds.get(this.currentMusic);
      music?.pause();
      music!.currentTime = 0;
      this.currentMusic = null;
    }
  }

  playEffect(effectId: string, volume = 1.0): void {
    if (this.isMuted) return;
    
    const effect = this.sounds.get(effectId);
    if (effect) {
      const effectClone = effect.cloneNode() as HTMLAudioElement;
      effectClone.volume = this.volume * volume;
      effectClone.play().catch(e => console.log('Effect play failed:', e));
    }
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted;
  }
}
