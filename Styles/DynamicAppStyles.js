const lightColorSet = {
  mainThemeBackgroundColor: "#ffffff",
  mainThemeForegroundColor: "#041858",
};

const darkColorSet = {
  mainThemeBackgroundColor: "#121212",
  // mainThemeForegroundColor: "blue",
};

const colorSet = {
  ...lightColorSet,
  light: lightColorSet,
  dark: darkColorSet,
  "no-preference": lightColorSet,
};

const StyleDict = {
  colorSet,
};

export default StyleDict;
