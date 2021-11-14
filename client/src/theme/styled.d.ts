import 'styled-components';

declare module "styled-components" {
    export interface DefaultTheme {
        primary: string;
        primaryDarker: string;
        primaryLighter: string;
        secondary: string;
        navLink: string;
        navActiveBg: string;
        comments: string;
        border: string;
        borderDark: string;
        borderLight: string;
        tag: string;
        logo: string;
        iconBg: string;
        iconFont: string;
        font: string;
    }
}