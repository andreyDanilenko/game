// src/events/GameEvents.ts
type GameAction =
  | 'startGame'
  | 'nextLevel'
  | 'restartLevel'
  | 'restartGame'
  | 'mainMenu';

type GameActionDetail = { action: GameAction };

class GameEventBus extends EventTarget {
  emit(action: GameAction) {
    console.log('📢 emit', action);
    this.dispatchEvent(new CustomEvent<GameActionDetail>('gameAction', { detail: { action } }));
  }

  on(handler: (action: GameAction) => void) {
    this.addEventListener('gameAction', (e) => {
      const event = e as CustomEvent<GameActionDetail>;
      handler(event.detail.action);
    });
  }
}

export const gameEvents = new GameEventBus();
