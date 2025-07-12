// components/ThemeToggle.js
import { useThemeStore } from '@/store/index.js';
import './ThemeToggle.scss';
import { useEffect, useState } from 'react';

export default function ThemeToggle({ open }) {
  const { theme, toggleTheme } = useThemeStore();
  const [content, setContent] = useState();

  useEffect(() => {
    if (open) {
      if (theme === 'dark')
        setContent('🌙 Dark')
      else
        setContent('☀️ Light')
    }
    else {
      if (theme === 'dark')
        setContent('🌙')
      else
        setContent('☀️')
    }
  }, [open, theme])

  return (
    <button className="toggleButton" onClick={toggleTheme}>
      {content}
    </button>
  );
}