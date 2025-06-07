import { StyleProp, TextStyle } from "react-native"

export type ThemeType = {
    colors: ThemeColors,
    text: ThemeText
}

export type ThemeColors = {
    background: string,
    primary: string,
    secondary: string,
    primaryText: string,
    secondaryText: string,
    highlightedText: string,
    outline: string,
    error: string
}

type ThemeText = {
    // title: StyleProp<TextStyle>
}