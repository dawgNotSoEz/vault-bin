import React from 'react';
import Icon from '../Icon';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="h-5 w-5 text-white" />
    </button>
  );
};

export default ThemeToggle;
