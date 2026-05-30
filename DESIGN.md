---
name: Vibrant Cravings
colors:
  surface: '#fbf9f9'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e3e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#594236'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#8d7164'
  outline-variant: '#e1c0b1'
  surface-tint: '#9e4300'
  primary: '#9e4300'
  on-primary: '#ffffff'
  primary-container: '#f66d09'
  on-primary-container: '#521f00'
  inverse-primary: '#ffb691'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#635d57'
  on-tertiary: '#ffffff'
  tertiary-container: '#9d958e'
  on-tertiary-container: '#332e29'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcb'
  primary-fixed-dim: '#ffb691'
  on-primary-fixed: '#341100'
  on-primary-fixed-variant: '#793100'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#eae1d9'
  tertiary-fixed-dim: '#cec5bd'
  on-tertiary-fixed: '#1f1b16'
  on-tertiary-fixed-variant: '#4b4640'
  background: '#fbf9f9'
  on-background: '#1b1c1c'
  surface-variant: '#e3e2e2'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-lg:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 20px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The brand personality is energetic, optimistic, and appetizing. It targets a modern audience seeking culinary inspiration and social food experiences. The UI should evoke a sense of immediate gratification and warmth.

The design style is **Modern / Tactile**, blending clean layouts with high-energy accents. It utilizes generous white space to let food imagery lead, while using bold color pops and soft, rounded geometry to create an inviting, "human" feel. The interface avoids clinical coldness in favor of a vibrant, friendly atmosphere that feels both premium and accessible.

## Colors
The palette is centered around a high-chroma Primary Orange (#F66D09), chosen to stimulate appetite and convey energy. 

- **Primary**: Used for key actions, brand moments, and active states.
- **Secondary**: A deep Charcoal used for high-contrast typography and grounding elements.
- **Tertiary**: A warm, tinted Peach-White used for subtle background sections or card containers to avoid the harshness of pure white.
- **Neutral**: A balanced grey scale used for secondary text and borders.

The default mode is Light, prioritizing a fresh and clean "morning-cafe" aesthetic.

## Typography
Manrope is utilized across all levels to provide a modern, geometric, yet highly legible technical foundation. 

- **Headlines**: Use heavier weights (Bold/ExtraBold) with slight negative letter-spacing to create a "tight" editorial look for food titles and hero sections.
- **Body**: Set in Medium or Regular weights with generous line heights to ensure readability during long-form recipe browsing.
- **Labels**: Use SemiBold for navigation and interactive elements. Small labels may use uppercase styling to provide visual variety and hierarchy without introducing a second typeface.

## Layout & Spacing
The layout follows a **Fluid Grid** philosophy based on an 8px square-grid system. 

- **Desktop**: A 12-column grid with 40px outer margins and 20px gutters. Content is centered with a max-width of 1280px.
- **Mobile**: A 4-column grid with 16px outer margins.
- **Rhythm**: Vertical rhythm is strictly enforced using the 8px base unit. Component padding should default to `md` (24px) for cards and `sm` (12px) for list items to maintain an open, airy feel.

## Elevation & Depth
This design system uses **Tonal Layers** combined with **Ambient Shadows** to create a soft, approachable depth.

- **Level 0 (Base)**: The main background, using either pure white or the Tertiary tint.
- **Level 1 (Cards)**: White surfaces with a very soft, diffused shadow (Offset: 0, 4px; Blur: 20px; Opacity: 6% Black). This makes food cards appear to float gently above the surface.
- **Level 2 (Dropdowns/Modals)**: Higher contrast depth with a slightly more defined shadow (Offset: 0, 8px; Blur: 32px; Opacity: 10% Black).
- **Interactions**: On hover, cards should slightly lift (decrease shadow blur, increase Y-offset) to provide tactile feedback.

## Shapes
The shape language is defined by the **Round Eight** rule. The base radius for standard components (buttons, input fields) is 0.5rem (8px). 

Larger containers like cards and imagery use `rounded-lg` (16px) or `rounded-xl` (24px) to emphasize the friendly, organic nature of the brand. Secondary interactive elements like tags or "Add to Cart" pills may use a fully circular (pill) radius to distinguish them from structural layout elements.

## Components
- **Buttons**: Primary buttons are solid #F66D09 with white Manrope SemiBold text. Secondary buttons use a #F66D09 outline with a 2px stroke.
- **Cards**: Featured recipe cards use a 16px corner radius, top-aligned imagery, and a 24px internal padding for text content.
- **Input Fields**: 8px radius with a 1px neutral-light border. On focus, the border thickens to 2px and changes to the Primary color.
- **Chips/Tags**: Small, 12px font-size, pill-shaped backgrounds. Use Tertiary color for inactive tags and Primary for selected states.
- **Lists**: Clean, border-less lists with 16px vertical spacing between items, separated by a 1px subtle divider (#F1F1F1).
- **Feedback Elements**: Success/Error states should use the same 8px radius but adopt Green/Red palettes respectively, ensuring the Primary Orange remains reserved for brand-specific actions.