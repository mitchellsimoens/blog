import Typography from 'typography';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Wordpress2016 from 'typography-theme-wordpress-2016';

Wordpress2016.overrideThemeStyles = (): any => ({
  'a.gatsby-resp-image-link': {
    boxShadow: `none`,
  },
});

delete Wordpress2016.googleFonts;

const typography = new Typography(Wordpress2016);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const { rhythm } = typography;
export const { scale } = typography;