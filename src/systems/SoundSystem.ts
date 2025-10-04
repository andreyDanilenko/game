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
      music_level1: '/assets/base_track_1.mp3',
      music_level2: '/assets/base_track_2.mp3',
      music_level3: '/assets/base_track_3.mp3',
      music_level4: '/assets/base_track_4.mp3',
      music_level5: '/assets/base_track_5.mp3',
      music_level6: '/assets/base_track_6.mp3',
      music_level7: '/assets/base_track_7.mp3',
      music_level8: '/assets/base_track_8.mp3',
      music_level9: '/assets/base_track_9.mp3',
      music_level10: '/assets/base_track_10.mp3',
      // music_boss: '/sounds/music/boss.mp3',
      // music_menu: '/sounds/music/menu.mp3',
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
