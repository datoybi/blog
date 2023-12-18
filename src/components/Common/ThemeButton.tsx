import { ThemeToggler } from 'gatsby-plugin-dark-mode';

interface Props {
  theme: string;
  toggleTheme: (theme: string) => void;
}

const ThemeButton = () => {
  const toggleTheme = () => {};

  return (
    <ThemeToggler type="checkbox" onChange={toggleTheme}>
      {({ theme, toggleTheme }: Props) => {
        // console.log(theme);
        return (
          <input
            type="checkbox"
            className="darkmode"
            onChange={() => toggleTheme(theme === 'dark' ? 'light' : 'dark')}
            checked={theme === 'dark' ? true : false}
          />
        );
      }}
    </ThemeToggler>
  );
};

export default ThemeButton;
