import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import {
  createTheme,
  defaultVariantColorsResolver,
  NavLink,
  ActionIcon,
  type CSSVariablesResolver,
  type DefaultMantineColor,
  type DefaultMantineSize,
  type MantineColorsTuple,
  TextInput,
  AppShell,
  Paper,
} from '@mantine/core';

import './theme';

import './styles/global.css';
import actionIconClasses from './styles/ActionIcon.module.css';
import appBarClasses from './styles/AppBar.module.css';
import paperClasses from './styles/Paper.module.css';
import navLinkClasses from './styles/NavLink.module.css';
import textInputClasses from './styles/TextInput.module.css';

type ExtendedCustomColors = 'elevation' | DefaultMantineColor;
type ExtendedFontSizes = 'xxs' | 'xsplus' | DefaultMantineSize;
type ExtendedLineHeights = 'xxs' | 'xxl' | DefaultMantineSize;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
  export interface MantineThemeSizesOverride {
    fontSizes: Record<ExtendedFontSizes, string>;
    lineHeights: Record<ExtendedLineHeights, string>;
  }
}

const theme = createTheme({
  cursorType: 'pointer',
  fontFamily:
    'Manrope, Avenir, Montserrat, Corbel, URW Gothic, source-sans-pro, sans-serif',
  fontFamilyMonospace:
    'Source Code Pro, ui-monospace, Cascadia Code, Source Code Pro, Menlo, Consolas, DejaVu Sans Mono, monospace',
  fontSizes: {
    xxs: '0.625rem',
    xsplus: '0.813rem',
  },
  lineHeights: {
    xxs: '1.1',
    xxl: '1.8',
  },
  headings: {
    fontFamily:
      'Elms Sans, Seravek, Gill Sans Nova, Ubuntu, Calibri, DejaVu Sans, source-sans-pro, sans-serif',
    sizes: {
      h1: { fontSize: '100px' },
      h2: { fontSize: '72px' },
      h3: { fontSize: '56px' },
      h4: { fontSize: '38px' },
      h5: { fontSize: '28px' },
      h6: { fontSize: '18px' },
    },
  },
  autoContrast: true,
  luminanceThreshold: 0.3,
  primaryColor: 'lime',
  white: '#F5F5F5',

  colors: {
    elevation: [
      '#F6F6F6',
      '#F7F7F7',
      '#F8F8F8',
      '#F9F9F9',
      '#FAFAFA',
      '#FBFBFB',
      '#FCFCFC',
      '#FDFDFD',
      '#FEFEFE',
      '#FFFFFF',
    ],
  },

  variantColorResolver: (input) => {
    const defaultResolvedColors = defaultVariantColorsResolver(input);
    // const parsedColor = parseThemeColor({
    //   color: input.color || input.theme.primaryColor,
    //   theme: input.theme,
    // });

    if (input.variant === 'outline') {
      return {
        // ...defaultResolvedColors,
        background: 'var(--mantine-color-white)',
        hover: 'var(--mantine-color-gray-2)',
        color: 'var(--mantine-color-dark-7)',
        border: '1px solid var(--mantine-color-dark-7)',
      };
    }
    if (input.variant === 'filled') {
      return {
        // ...defaultResolvedColors,
        background: 'var(--mantine-color-dark-7)',
        hover: 'var(--mantine-color-dark-5)',
        color: 'var(--mantine-color-white)',
        border: 'none',
      };
    }
    if (input.variant === 'filled-violet') {
      return {
        // ...defaultResolvedColors,
        background: 'var(--mantine-color-violet-9)',
        hover: 'var(--mantine-color-violet-7)',
        color: 'var(--mantine-color-gray-0)',
        border: 'none',
      };
    }
    if (input.variant === 'transparent') {
      return {
        // ...defaultResolvedColors,
        background: 'none',
        hover: 'var(--mantine-color-gray-4)',
        color: 'var(--mantine-color-dark-7)',
        border: 'none',
      };
    }

    return defaultResolvedColors;
  },

  components: {
    ActionIcon: ActionIcon.extend({
      classNames: actionIconClasses,
    }),
    AppShell: AppShell.extend({
      classNames: appBarClasses,
    }),
    NavLink: NavLink.extend({
      classNames: navLinkClasses,
    }),
    Paper: Paper.extend({
      classNames: paperClasses,
    }),
    TextInput: TextInput.extend({
      classNames: textInputClasses,
    }),
  },

  other: {
    outline: '#424242',
  },
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--mantine-outline': theme.other.outline,
  },
  light: {},
  dark: {},
});

export default theme;
