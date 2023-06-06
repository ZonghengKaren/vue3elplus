import { themeConfig } from './themeConfig'

export const changeTheme = (theme) => {
  let body = document.getElementsByTagName("body")[0];
  const curTheme = themeConfig[theme];
  for(let i in curTheme) {
    body.style.setProperty(`--${i}`, curTheme[i]);
  }
}