export const onRenderBody = ({ setPreBodyComponents }) => {
  const script = `
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = localStorage.getItem('theme');

  window.__theme = savedTheme || (darkQuery.matches ? 'dark' : 'light');
  window.__onThemeChange = () => {};

  window.__setTheme = (newTheme) => {
    if (newTheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    localStorage.setItem('theme', newTheme);
    window.__onThemeChange(newTheme);
  };

  darkQuery.addListener((e) => {
    window.__setTheme(e.matches ? 'dark' : 'light');
  });

  window.__setTheme(theme);

  `;

  setPreBodyComponents(<script dangerouslySetInnerHTML={{ __html: script }} />);
};
