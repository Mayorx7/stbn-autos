# STBN AUTOS --- Brand Color Rules

Use this file as the **color-only reference** when updating the existing
STBN AUTOS website. Preserve the current layout, components, content,
and functionality. Change colors only.

## Core palette

-   **Primary navy:** `#062A5E` --- main brand color for navigation,
    headers, footer backgrounds, and strong surfaces.
-   **Deep navy:** `#031B3D` --- darker sections, overlays, and
    high-contrast backgrounds.
-   **Royal blue:** `#0757A6` --- primary buttons, links, active states,
    and important interactive elements.
-   **Bright blue accent:** `#1689E8` --- highlights, CTA accents, hover
    states, and selected details.
-   **Sky blue:** `#D9ECFA` --- pale section backgrounds, subtle panels,
    and soft decorative accents.
-   **White:** `#FFFFFF` --- primary light background and text on dark
    surfaces.
-   **Silver gray:** `#D7DEE8` --- borders, dividers, subdued icons, and
    neutral UI details.
-   **Cool light gray:** `#F3F6FA` --- alternate page sections, cards,
    and quiet backgrounds.
-   **Slate gray:** `#53657A` --- secondary text on light backgrounds.

## Usage rules

1.  Keep **navy and royal blue** as the dominant brand colors.
2.  Use **white** for clean contrast and spacious light sections.
3.  Use **bright blue** sparingly for calls to action, links, active
    indicators, and hover feedback.
4.  Use **sky blue and cool light gray** for subtle section backgrounds;
    avoid large areas of saturated accent blue.
5.  Use **silver gray** for borders and dividers rather than black.
6.  On dark navy or royal-blue surfaces, use white text. On white or
    light-gray surfaces, use deep navy text.
7.  Keep text readable and maintain strong contrast for buttons,
    navigation, labels, and body copy.
8.  For gradients, use only brand blues, for example `#031B3D` →
    `#0757A6`; keep gradients subtle.
9.  Do not introduce unrelated colors such as purple, green, orange,
    pink, or gold. The WhatsApp icon may retain its familiar green only
    if it is an existing third-party brand icon; do not use green
    elsewhere in the site's theme.
10. Do not use pure black as a dominant UI color. Prefer deep navy
    `#031B3D`.

## Suggested semantic tokens

``` css
:root {
  --color-primary: #062A5E;
  --color-primary-dark: #031B3D;
  --color-primary-blue: #0757A6;
  --color-accent: #1689E8;
  --color-sky: #D9ECFA;
  --color-white: #FFFFFF;
  --color-border: #D7DEE8;
  --color-surface-muted: #F3F6FA;
  --color-text-secondary: #53657A;
}
```

## Scope restriction

**This is a color-only update.** Do not redesign the website, change
spacing, typography, images, wording, routes, components, layout, or
behavior. Apply the palette consistently to the existing site and leave
everything else unchanged.
