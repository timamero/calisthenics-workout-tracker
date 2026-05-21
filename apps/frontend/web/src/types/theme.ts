import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import {
  type DefaultMantineColor,
  type DefaultMantineSize,
  type MantineColorsTuple,
  type BadgeVariant,
} from '@mantine/core';

// import './theme';

// import './styles/global.css';

type ExtendedCustomColors = 'elevation' | DefaultMantineColor;
type ExtendedFontSizes =
  | 'xxs'
  | 'xsplus'
  | 'xxl'
  | 'xxxl'
  | 'display_lg'
  | 'display_md'
  | 'display_sm'
  | 'display_xs'
  | DefaultMantineSize;
type ExtendedLineHeights = 'xxs' | 'xxl' | DefaultMantineSize;
type ExtendedSpacing = 'xxs' | 'xxl' | DefaultMantineSize;
export type BadgeExtendedVariants =
  | 'filled-gray'
  | 'outline-lime'
  | 'outline-violet-dark'
  | 'outline-teal'
  | BadgeVariant;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }

  export interface MantineThemeSizesOverride {
    fontSizes: Record<ExtendedFontSizes, string>;
    lineHeights: Record<ExtendedLineHeights, string>;
    spacing: Record<ExtendedSpacing, string>;
  }

  export interface MantineThemeOther {
    outline: string;
    letterSpacing: {
      tightest: string;
      tighter: string;
      tight: string;
      normal: string;
      wide: string;
      wider: string;
      widest: string;
    };
    customColors: {
      limeElevation1: string;
      limeElevation2: string;
      limeElevation3: string;
      limeElevation4: string;
      limeElevation5: string;
      violetElevation1: string;
      violetElevation2: string;
      violetElevation3: string;
      violetElevation4: string;
      violetElevation5: string;
    };
  }
  export interface BadgeProps {
    variant?: BadgeExtendedVariants;
  }
}
