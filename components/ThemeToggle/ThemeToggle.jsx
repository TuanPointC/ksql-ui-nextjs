// components/ThemeToggle.js
import { useThemeStore } from '@/store/index.js';
import './ThemeToggle.scss';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button className="toggleButton" onClick={toggleTheme}>
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}