import { mount } from 'svelte';
import GameOverScreen from './components/GameOverScreen.svelte';

export function mountGameOverScreen(props: {
  isVisible: boolean;
  title: string;
  finalScore: number;
  survivalTime: number;
  asteroidsDestroyed: number;
  onRestart: () => void;
}) {
  const el = document.createElement('div');
  document.body.appendChild(el);
  
  mount(GameOverScreen, {
    target: el,
    props: props
  });
  
  return el;
}
