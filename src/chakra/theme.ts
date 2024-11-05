import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fontSizes: {
    title: "32px",
    subtitle: "24px",
    body: "16px",
  },
  fontWeights: {
    semibold: 500,
  },
  lineHeights: {
    base: "24px",
  },
  styles: {
    global: {
      body: {
        color: "rgba(16, 17, 18, 0.8)",
      },
    },
  },
  components: {
    Link: {
      baseStyle: {
        color: "blue.500",
        _hover: {
          color: "blue.700",
          textDecoration: "underline",
        },
      },
    },
  },
});
