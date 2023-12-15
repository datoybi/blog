import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const Button = styled.input`
  --size: 2rem;

  appearance: none;
  outline: none;
  cursor: pointer;

  width: var(--size);
  height: var(--size);
  box-shadow: inset calc(var(--size) * 0.33) calc(var(--size) * -0.25) 0;
  border-radius: 999px;
  color: hsl(240, 100%, 95%);

  transition: all 500ms;

  &:checked {
    --ray-size: calc(var(--size) * -0.4);
    --offset-orthogonal: calc(var(--size) * 0.65);
    --offset-diagonal: calc(var(--size) * 0.45);

    transform: scale(0.75);
    color: hsl(40, 100%, 50%);
    box-shadow: inset 0 0 0 var(--size),
      calc(var(--offset-orthogonal) * -1) 0 0 var(--ray-size),
      var(--offset-orthogonal) 0 0 var(--ray-size),
      0 calc(var(--offset-orthogonal) * -1) 0 var(--ray-size),
      0 var(--offset-orthogonal) 0 var(--ray-size),
      calc(var(--offset-diagonal) * -1) calc(var(--offset-diagonal) * -1) 0
        var(--ray-size),
      var(--offset-diagonal) var(--offset-diagonal) 0 var(--ray-size),
      calc(var(--offset-diagonal) * -1) var(--offset-diagonal) 0 var(--ray-size),
      var(--offset-diagonal) calc(var(--offset-diagonal) * -1) 0 var(--ray-size);
  }

  @media (max-width: 768px) {
    --size: 1.3rem;

    margin-right: 20px;
  }
`;

const ThemeButton = () => {
  const [theme, setTheme] = useState<string>((window as any).__theme);
  const isDarkMode = theme === 'dark';

  const toggleTheme = () => {
    (window as any).__setTheme(isDarkMode ? 'light' : 'dark');
  };
  console.log((window as any).__theme);

  useEffect(() => {
    setTheme((window as any).__theme);
    (window as any).__onThemeChange = (theme: 'light' | 'dark') => {
      setTheme(theme);
    };
  }, []);

  if (!theme) {
    return null;
  }

  return (
    <Button
      type="checkbox"
      onChange={toggleTheme}
      className=".darkmode-toggle"
      checked={theme === 'light'}
    />
  );
};

export default ThemeButton;
