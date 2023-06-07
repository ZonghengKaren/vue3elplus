import { themeConfig } from './themeConfig'

export const changeTheme = (theme) => {
  let body = document.querySelector('body');
  const curTheme = themeConfig[theme];
  for(let i in curTheme) {
    body.style.setProperty(`--${i}`, curTheme[i]);
  }
  localStorage.setItem('_CURRENT_THEME_', theme);
}