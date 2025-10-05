import { mount } from 'svelte';
import GameOverScreen from './GameOverScreen.svelte';

export function mountGameScreen(props: {
  type: 'failed' | 'complete' | 'gameComplete' | 'nextLevel';
  isVisible: boolean;
  title?: string;
  finalScore: number;
  survivalTime: number;
  asteroidsDestroyed: number;
  buttonText?: string;
  onButtonClick: () => void;
  titleColor?: string;
  titleShadow?: string;
  showStats?: boolean;
}) {
  const el = document.createElement('div');
  document.body.appendChild(el);
  
  // Автоматическая настройка для разных типов экранов
  const config = getScreenConfig(props.type, props);
  
  mount(GameOverScreen, {
    target: el,
    props: {
      ...props,
      ...config,
      onButtonClick: () => {
        el.remove();
        props.onButtonClick();
      }
    }
  });
  
  return { destroy: () => el.remove() };
}

// Конфигурация для разных типов экранов
function getScreenConfig(type: string, props: any) {
  const baseConfig = {
    showStats: true,
    titleColor: '#ffffff',
    titleShadow: '0 0 10px rgba(255,255,255,0.5)'
  };
  
  switch (type) {
    case 'failed':
      return {
        ...baseConfig,
        title: props.title || 'LEVEL FAILED',
        buttonText: props.buttonText || 'TRY AGAIN',
        titleColor: '#ff4444',
        titleShadow: '0 0 20px #ff4444'
      };
      
    case 'complete':
      return {
        ...baseConfig,
        title: props.title || 'LEVEL COMPLETE!',
        buttonText: props.buttonText || 'NEXT LEVEL',
        titleColor: '#00ff88',
        titleShadow: '0 0 20px #00ff88'
      };
      
    case 'gameComplete':
      return {
        ...baseConfig,
        title: props.title || 'GAME COMPLETE!',
        buttonText: props.buttonText || 'MAIN MENU',
        titleColor: '#ffff00',
        titleShadow: '0 0 20px #ffff00'
      };
      
    case 'nextLevel':
      return {
        ...baseConfig,
        title: props.title || 'READY FOR NEXT LEVEL?',
        buttonText: props.buttonText || 'CONTINUE',
        titleColor: '#00ffff',
        titleShadow: '0 0 20px #00ffff'
      };
      
    default:
      return baseConfig;
  }
}
