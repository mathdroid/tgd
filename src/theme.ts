import { extendTheme } from "@chakra-ui/react";

export const customTheme = {
  styles: {
    global: {
      html: {
        "scroll-behavior": "smooth",
      },
    },
  },

  colors: {
    initialColorMode: "light",
    useSystemColorMode: false,
    transparent: "transparent",
    shade1: "#c4c4c4",
    shade2: "e3e3e3",
    brand: "#FF3636",
    secondary: "#9935ff",
    tertiary: "#3639ff",
    pink: "#F9589C",
    blew: "#58c6f9",
    gray: {
      100: "#d9d5d0",
      200: "#D7E0DD",
    },
    // ...
  },
};

const theme = extendTheme(customTheme);

export default theme;
