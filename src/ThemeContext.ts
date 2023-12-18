// import { createContext, useState } from 'react';

// export const ThemeContext = createContext({ theme: null });

// export function ThemeProvider({ children }: any) {
//   const [theme, seTheme] = useState();
//   const setDataHandler = (newData: any) => {
//     console.log(newData);
//     seTheme(newData);
//   };

//   const contextValue = {
//     theme,
//     setData: setDataHandler,
//   };

//   return (
//     <ThemeContext.Provider value={contextValue}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export default ThemeContext;
