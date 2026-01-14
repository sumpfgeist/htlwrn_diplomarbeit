export interface SystemThemeResponse {
  data: SystemTheme;
}

export interface SystemTheme {
  _id: string;
  title: string;
  subTitle: string;
  primaryBasedOn: string;
  accentBasedOn: string;
  toolbarColor: string;
  toolbarFontColor: string;
  primaryContrast: string;
  accentContrast: string;
  gradient: boolean;
  navbarColor?: string;
  navbarFontColor?: string;
  backgroundColor?: string;
  colorPalette?: {
    primary?: Record<string, string>;
    secondary?: Record<string, string>;
    tertiary?: Record<string, string>;
    neutral?: Record<string, string>;
    'neutral-variant'?: Record<string, string>;
  };
}
