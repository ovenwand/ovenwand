import colorPalette from "tailwindcss/colors.js";

export const colors = {
  ...colorPalette,

  success: colorPalette.green[400],
  warning: colorPalette.yellow[400],
  info: colorPalette.blue[400],
  danger: colorPalette.red,

  primary: {
    100: "#6EDDFF", // HSLA(194,100%,71%,1)
    250: "#67D3FF", // HSLA(197,100%,70%,1)
    200: "#5BC3F5", // HSLA(199,88%,65%,1)
    300: "#48BEF6", // HSLA(199,90%,62%,1)
    400: "#29ABE2", // HSLA(197,76%,52%,1)
    500: "#0088BD", // HSLA(196,100%,37%,1)
    600: "#006799", // HSLA(199,100%,30%,1)
    700: "#004877", // HSLA(203,100%,23%,1)
    800: "#002B56", // HSLA(210,100%,16%,1)
    900: "#001D45", // HSLA(214,100%,13%,1)
  },

  secondary: {
    100: "#F3DAC0", //
    200: "#ECD4BA", //
    300: "#E3CDB4", //
    400: "#C7B299", //
    500: "#9F8B73", //
    600: "#78664F", //
    700: "#53432E", //
    800: "#30230E", //
    900: "#23190C", //
  },
};
