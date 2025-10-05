import { UIManager } from '../../ui/UIManager';
import { Player } from '../objects/Player';
import { WorldSystem } from '../../systems/WorldSystem';
import { Game } from '../Game';

/**
 * Контроллер ввода (мышь, клавиатура, сенсор, кнопки UI).
 * Отвечает только за обработку пользовательских действий.
 * Никакой логики игры внутри — только вызывает методы Game.
 */
export class InputController {
  disable() {
    throw new Error('Method not implemented.');
  }
  private canvas: HTMLCanvasElement;
  private game: Game;
  private ui: UIManager;
  private player: Player;
  private world: WorldSystem;

  private mouseX = 0;
  private mouseY = 0;

  constructor(canvas: HTMLCanvasElement, game: Game, ui: UIManager, player: Player, world: WorldSystem) {
    this.canvas = canvas;
    this.game = game;
    this.ui = ui;
    this.player = player;
    this.world = world;

    this.registerUIEvents();
    this.registerMouseEvents();
    this.registerKeyboardEvents();
    this.registerTouchEvents();
    this.listenZoomControls();
  }

  // ------------------------------------------------------------
  // [1] СОБЫТИЯ UI (кнопки и слайдеры)
  // ------------------------------------------------------------
  private registerUIEvents(): void {
    const elements = this.ui.getElements();

    elements.startButton.addEventListener('click', () => this.game.startNewGame());

    elements.restartButton.addEventListener('click', () => {
      this.game.cancelAnimation(); // безопасный способ остановить цикл
      this.game.restartCurrentLevel();
    });

    elements.speedSlider.addEventListener('input', () => {
      const newSpeed = this.ui.getSpeed();
      this.game.setGameSpeed(newSpeed);
      this.ui.setSpeedDisplay(newSpeed);
    });
  }

  // ------------------------------------------------------------
  // [2] СОБЫТИЯ МЫШИ
  // ------------------------------------------------------------
  private registerMouseEvents(): void {
    // Перемещение игрока
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;

      const worldPos = this.world.screenToWorld(this.mouseX, this.mouseY);

      // Ограничиваем движение игрока границами мира
      this.player.x = Math.max(this.player.radius, Math.min(this.world.worldWidth - this.player.radius, worldPos.x));
      this.player.y = Math.max(this.player.radius, Math.min(this.world.worldHeight - this.player.radius, worldPos.y));
    });

    // Зум колёсиком
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomDelta = e.deltaY > 0 ? -0.2 : 0.2;
      this.game.adjustZoom(zoomDelta);
    });
  }

  // ------------------------------------------------------------
  // [3] КЛАВИАТУРНЫЕ СОБЫТИЯ
  // ------------------------------------------------------------
  private registerKeyboardEvents(): void {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') this.game.handleSpaceAction();
      if (e.code === 'Equal' || e.code === 'NumpadAdd') this.game.adjustZoom(+0.5);
      if (e.code === 'Minus' || e.code === 'NumpadSubtract') this.game.adjustZoom(-0.5);
      if (e.code === 'Digit0') this.game.resetZoom();
    });
  }

  // ------------------------------------------------------------
  // [4] СЕНСОРНЫЕ СОБЫТИЯ (мобильные устройства)
  // ------------------------------------------------------------
  private registerTouchEvents(): void {
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      this.mouseX = touch.clientX - rect.left;
      this.mouseY = touch.clientY - rect.top;

      const worldPos = this.world.screenToWorld(this.mouseX, this.mouseY);
      this.player.x = Math.max(this.player.radius, Math.min(this.world.worldWidth - this.player.radius, worldPos.x));
      this.player.y = Math.max(this.player.radius, Math.min(this.world.worldHeight - this.player.radius, worldPos.y));
    });
  }


  private listenZoomControls(): void {
    const elements = this.ui.getElements();

    if (elements.zoomSlider) {
        elements.zoomSlider.addEventListener('input', (e) => {
        const zoom = parseFloat((e.target as HTMLInputElement).value);
        this.game.setWorldZoom(zoom);
        });
    }

    if (elements.zoomInBtn) {
        elements.zoomInBtn.addEventListener('click', () => {
        this.game.adjustZoom(+0.5);
        });
    }

    if (elements.zoomOutBtn) {
        elements.zoomOutBtn.addEventListener('click', () => {
        this.game.adjustZoom(-0.5);
        });
    }

    if (elements.zoomResetBtn) {
        elements.zoomResetBtn.addEventListener('click', () => {
        this.game.resetWorldZoom();
        });
    }
}
}
