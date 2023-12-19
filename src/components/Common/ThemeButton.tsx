import { ThemeToggler } from 'gatsby-plugin-dark-mode';

interface Props {
  theme: string;
  toggleTheme: (theme: string) => void;
}

const ThemeButton = () => {
  return (
    <ThemeToggler type="checkbox">
      {({ theme, toggleTheme }: Props) => (
        <input
          type="checkbox"
          className="darkmode"
          onClick={() => toggleTheme(theme === 'dark' ? 'light' : 'dark')}
          checked={theme === 'dark' ? true : false}
        />
      )}
    </ThemeToggler>
  );
};

export default ThemeButton;
