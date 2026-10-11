# Portfolio Recreation Implementation Plan

## 1. Visual Analysis & Design Tokens
Based on the provided Framer design screenshot and retro desktop aesthetic:

- **Color Palette**:
  - Background Canvas: Warm cream (`#EFE8D6` / `#F4EEDB`)
  - Organic Blobs: Soft muted sage / celadon (`#C8DDD7`, `#B8D8D3`, `#A7CDC4`)
  - Hero Window Fill: Pale retro teal (`#B8D8D3` / `#B2D6D0`)
  - Card & Window Surface: Warm light cream / off-white (`#FAF7EE` / `#FFFFFF`)
  - Accent / Buttons: Soft peach / salmon (`#E9B7A0` / `#E8A88E`)
  - Ink / Strokes: Deep ink near-black (`#111111`)
  - Muted Text: Deep charcoal (`#4A4A4A` / `#555555`)
  - Info Strip Fill: Pale teal (`#B8D8D3`)
- **Borders & Shadows**:
  - Borders: `2px` or `2.5px` solid `#111111`
  - Hard Offset Shadow: `4px 4px 0 #111111` (buttons & smaller cards) and `6px 6px 0 #111111` (large windows)
  - Window Corner Radii: `10px` to `12px`
  - Button Radii: `8px`
- **Typography**:
  - Monospace (UI, labels, clock, metadata, code): `'Space Mono'`, monospace
  - Grotesk Headings (Window titles, big headlines): `'Space Grotesk'`, sans-serif (weight 700)
  - Small Tracking Labels: `font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 700;`

---

## 2. Section Breakdown

1. **Top Menu Bar (Sticky Header)**:
   - Left: Retro monitor icon + navigation links (`Home`, `Work`, `About`, `Contact`)
   - Center: Current active section tracker (scroll-spy dynamic label)
   - Right: Live date & clock (e.g. `Sun 11 Oct · 13:35 PM`) + "Let's talk" peach badge/button
   - Bottom: 3px peach scroll progress indicator bar (`#E9B7A0`)

2. **Hero Section (Desktop Environment Scene)**:
   - Fixed wavy organic background blobs + subtle noise/grain texture
   - Three-column grid layout:
     - **Left: Widget Panel**:
       - Monitor icon, live large digital clock (12h format + AM/PM)
       - Sliders/gauges: `vol / 80%`, `cpu / coffee`, `ram / ideas`
       - Audio status: `NOW PLAYING: A little design, a lot of coffee.` with interactive Play/Pause toggle
     - **Center: Hero Window (`/home/sohan: portfolio.exe`)**:
       - Titlebar with close/minimize circles and centered title
       - Retro URL bar: `sohanpal.design / welcome` with blinking block cursor `█`
       - Inner welcome card:
         - Small label: `WELCOME`
         - Title: `Crafting designs that interact and engage.`
         - Bio: `I'm Sohan Pal, a designer based in Kolkata. I make interfaces, identities and the small motion in between.`
         - Dual peach action buttons: `View Work` & `Contact Me`
     - **Right: Desktop Icon Column**:
       - Line icons with labels: `Desktop`, `Downloads`, `Internet`, `My Life`
   - Bottom Dock:
     - Outlined pill container with social tokens: `Be`, `Dr`, `In`, `Li`, `Gi`
     - Bouncing caption: `Scroll to explore ↓`

3. **Selected Work Window (`Selected work` / `Projects.exe`)**:
   - Retro window frame with titlebar dots
   - Header with `INDEX · 4 PROJECTS`, `Selected work.`, and intro description
   - 4 projects dynamically rendered from `projects.js`:
     1. AOThub Web App Prototype
     2. Spotify-fit App
     3. XP Bar
     4. Graphic Design Posters
   - Each row: Framed mini-browser mockup image on the left, details & metadata on the right (`Category`, `Title`, `Description`, `Tags`, `Open project ↗`)

4. **About Window (`About.txt`)**:
   - Window titlebar (`About.txt`)
   - Label `ABOUT`, heading `A designer who treats small details like they matter.`
   - 3 narrative paragraphs on design philosophy and focus
   - Full-width teal info strip: `BASED IN Kolkata · EMAIL sohanxpal18@gmail.com · STATUS Open to work · FOCUS UI/UX · Visual Design · Branding`
   - `Timeline.` section with 5 chronological career/award milestones (2026 to 2024)

5. **Contact Window (`Say hi` / `Contact.sh`)**:
   - Label `CONTACT`, heading `Say hi.`, subtext
   - Two columns:
     - Left: Direct email with copy-to-clipboard, Resume PDF download link, and social links
     - Right: Interactive contact form (Name, Email, Message) with client validation and submission state

6. **Footer Bar**:
   - Outlined bar with `© 2026 Sohan Pal` and smooth `Back to top ↑` trigger

---

## 3. Component & File Architecture
- `index.html`: Clean semantic HTML5 layout with accessible landmark elements and IDs
- `styles.css`: CSS custom properties for all tokens, responsive grid/flexbox layouts, hard offset box-shadows, animations
- `projects.js`: Data array holding project objects for modular updates
- `script.js`: Dynamic rendering, live clock updates, scroll progress bar, scroll-spy section spy, audio playing toggle, contact form validation & feedback
- `assets/`: Project mockups (custom generated SVG/PNGs in mini browser frames), PDF resume placeholder, and icons
- `README.md`: Deployment, customization, and project guide
