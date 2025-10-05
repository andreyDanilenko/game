import './style.css';
import { Game } from './game/Game';
import App from './components/App.svelte';
import { mount } from 'svelte';

// Монтируем Svelte приложение по-новому
const app = mount(App, {
  target: document.getElementById('svelte-app')!,
});

// Инициализируем игру после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  (window as any).game = game;
});

export default app;
