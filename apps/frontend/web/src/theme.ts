import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import {
  createTheme,
  defaultVariantColorsResolver,
  NavLink,
  ActionIcon,
  TextInput,
  AppShell,
  Paper,
  PasswordInput,
  Title,
  type CSSVariablesResolver,
  Badge,
} from '@mantine/core';

import './styles/global.css';
import actionIconClasses from './styles/ActionIcon.module.css';
import appBarClasses from './styles/AppBar.module.css';
import badgeClasses from './styles/Badge.module.css';
import paperClasses from './styles/Paper.module.css';
import passwordInputClasses from './styles/PasswordInput.module.css';
import navLinkClasses from './styles/NavLink.module.css';
import textInputClasses from './styles/TextInput.module.css';

const theme = createTheme({
  cursorType: 'pointer',
  fontFamily:
    'Manrope, Avenir, Montserrat, Corbel, URW Gothic, source-sans-pro, sans-serif',
  fontFamilyMonospace:
    'Source Code Pro, ui-monospace, Cascadia Code, Source Code Pro, Menlo, Consolas, DejaVu Sans Mono, monospace',
  fontSizes: {
    xxs: '0.625rem', // 10px
    xsplus: '0.813rem', // 13px
    xxl: '1.75rem', // 28px
    xxxl: '2.25rem', // 36px
    display_lg: '6.25rem', // 100px
    display_md: '4.5rem', // 72px
    display_sm: '3.5rem', // 56px
    display_xs: '3rem', // 48px
  },
  lineHeights: {
    xxs: '1.1',
    xxl: '1.8',
  },
  spacing: {
    xxs: '0.25rem',
    xxl: '3rem',
  },
  headings: {
    fontFamily:
      'Elms Sans, Seravek, Gill Sans Nova, Ubuntu, Calibri, DejaVu Sans, source-sans-pro, sans-serif',
    sizes: {
      h1: { fontSize: '42px' },
      h2: { fontSize: '36px' },
      h3: { fontSize: '28px' },
      h4: { fontSize: '24px' },
      h5: { fontSize: '20px' },
      h6: { fontSize: '16px' },
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

    if (input.variant === 'outline') {
      return {
        background: 'var(--mantine-color-white)',
        hover: 'var(--mantine-color-gray-2)',
        color: 'var(--mantine-color-dark-7)',
        border: '1px solid var(--mantine-color-dark-7)',
      };
    }
    if (input.variant === 'outline-lime') {
      return {
        background: 'var(--mantine-color-lime-2)',
        hover: 'var(--mantine-color-lime-4)',
        color: 'var(--mantine-color-dark-7)',
        border: '1px solid var(--mantine-color-dark-7)',
      };
    }
    if (input.variant === 'outline-violet') {
      return {
        background: 'none',
        hover: 'var(--mantine-color-violet-0)',
        color: 'var(--mantine-color-violet-8)',
        border: '1px solid var(--mantine-color-violet-8)',
      };
    }
    if (input.variant === 'outline-violet-dark') {
      return {
        background: 'var(--mantine-color-violet-2)',
        hover: 'var(--mantine-color-violet-4)',
        color: 'var(--mantine-color-dark-7)',
        border: '1px solid var(--mantine-color-dark-7)',
      };
    }
    if (input.variant === 'outline-teal') {
      return {
        background: 'var(--mantine-color-teal-2)',
        hover: 'var(--mantine-color-teal-4)',
        color: 'var(--mantine-color-dark-7)',
        border: '1px solid var(--mantine-color-dark-7)',
      };
    }
    if (input.variant === 'filled') {
      return {
        background: 'var(--mantine-color-dark-7)',
        hover: 'var(--mantine-color-dark-5)',
        color: 'var(--mantine-color-white)',
        border: 'none',
      };
    }
    if (input.variant === 'filled-lime') {
      return {
        background: 'var(--mantine-color-lime-4)',
        hover: 'var(--mantine-color-lime-2)',
        color: 'var(--mantine-color-dark-7)',
        border: 'none',
      };
    }
    if (input.variant === 'filled-violet') {
      return {
        background: 'var(--mantine-color-violet-9)',
        hover: 'var(--mantine-color-violet-7)',
        color: 'var(--mantine-color-gray-0)',
        border: 'none',
      };
    }
    if (input.variant === 'filled-gray') {
      return {
        background: 'var(--mantine-color-gray-2)',
        hover: 'var(--mantine-color-gray-4)',
        color: 'var(--mantine-color-dark-4)',
        border: 'none',
      };
    }
    if (input.variant === 'transparent') {
      return {
        background: 'none',
        hover: 'var(--mantine-color-gray-2)',
        color: 'var(--mantine-color-dark-7)',
        border: 'none',
      };
    }
    if (input.variant === 'transparent-violet') {
      return {
        background: 'none',
        hover: 'var(--mantine-color-violet-2)',
        color: 'var(--mantine-color-violet-4)',
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
    Badge: Badge.extend({
      classNames: badgeClasses,
      defaultProps: {
        ff: 'monospace',
        lts: 'var(--mantine-letter-spacing-wider)',
      },
    }),
    NavLink: NavLink.extend({
      classNames: navLinkClasses,
    }),
    Paper: Paper.extend({
      classNames: paperClasses,
      defaultProps: {
        shadow: 'xs',
      },
    }),
    PasswordInput: PasswordInput.extend({
      classNames: passwordInputClasses,
    }),
    TextInput: TextInput.extend({
      classNames: textInputClasses,
    }),
    Title: Title.extend({
      defaultProps: {
        textWrap: 'pretty',
      },
    }),
  },

  other: {
    outline: '#424242',
    letterSpacing: {
      tightest: '-0.008em',
      tighter: '-0.01em',
      tight: '-0.02em',
      normal: '0',
      wide: '0.04em',
      wider: '0.1em',
      widest: '0.16em',
    },
    customColors: {
      limeElevation1: '#F9FDF0',
      limeElevation2: '#FAFEF2',
      limeElevation3: '#FBFEF4',
      limeElevation4: '#FCFEF8',
      limeElevation5: '#FDFEFA',

      violetElevation1: '#F8F6FF',
      violetElevation2: '#F8F7FF',
      violetElevation3: '#F9F8FF',
      violetElevation4: '#FAF9FF',
      violetElevation5: '#FBFAFF',
    },
  },
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--mantine-outline': theme.other.outline,
    '--mantine-letter-spacing-tightest': theme.other.letterSpacing.tightest,
    '--mantine-letter-spacing-tighter': theme.other.letterSpacing.tighter,
    '--mantine-letter-spacing-tight': theme.other.letterSpacing.tight,
    '--mantine-letter-spacing-normal': theme.other.letterSpacing.normal,
    '--mantine-letter-spacing-wide': theme.other.letterSpacing.wide,
    '--mantine-letter-spacing-wider': theme.other.letterSpacing.wider,
    '--mantine-letter-spacing-widest': theme.other.letterSpacing.widest,
    '--mantine-color-lime-elevation-1': theme.other.customColors.limeElevation1,
    '--mantine-color-lime-elevation-2': theme.other.customColors.limeElevation2,
    '--mantine-color-lime-elevation-3': theme.other.customColors.limeElevation3,
    '--mantine-color-lime-elevation-4': theme.other.customColors.limeElevation4,
    '--mantine-color-lime-elevation-5': theme.other.customColors.limeElevation5,
    '--mantine-color-violet-elevation-1':
      theme.other.customColors.violetElevation1,
    '--mantine-color-violet-elevation-2':
      theme.other.customColors.violetElevation2,
    '--mantine-color-violet-elevation-3':
      theme.other.customColors.violetElevation3,
    '--mantine-color-violet-elevation-4':
      theme.other.customColors.violetElevation4,
    '--mantine-color-violet-elevation-5':
      theme.other.customColors.violetElevation5,
  },
  light: {},
  dark: {},
});

export default theme;
