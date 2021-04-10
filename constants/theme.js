import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    // base colors
    primary: "#FECD32", // yellow
    secondary: "#B9E4EE", // light blue

    // colors 
    white: "#FFFFFF", // white
    darkBlue: "#252162", // dark blue
    pink: "#E01F76", // pink
    lightGray: "#F8F8F9", // light gray

    transparent: "transparent",
};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,
    body6: 10,

    // app dimensions
    width,
    height,

    // specials images
    specialW: 281,
    specialH: 188,

    // weights
    w1: '800',
    w2: '700',
    w3: '600',
    w4: '500',
    w5: '400',
    w6: '200',
};

export const FONTS = {
    largeTitle: { fontFamily: "Roboto-regular", fontsize: SIZES.largeTitle, lineHeight: 40 },
    h1: { fontFamily: "Roboto-Black", fontsize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Roboto-Bold", fontsize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Roboto-Bold", fontsize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Roboto-Bold", fontsize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "Roboto-Regular", fontsize: SIZES.body1, lineHeight: 36 },
    body1: { fontFamily: "Roboto-Regular", fontsize: SIZES.body2, lineHeight: 30 },
    body1: { fontFamily: "Roboto-Regular", fontsize: SIZES.body3, lineHeight: 22 },
    body1: { fontFamily: "Roboto-Regular", fontsize: SIZES.body4, lineHeight: 22 },
    body1: { fontFamily: "Roboto-Regular", fontsize: SIZES.body5, lineHeight: 22 }
}


const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;