# Sohan Pal — Portfolio Website

A pixel-faithful, responsive, retro-modern desktop portfolio website hand-coded with vanilla HTML, CSS, and JavaScript.

---

## 🚀 Live Preview & Local Development

No build steps or dependencies required.

You can preview the website by running any local HTTP server:

```bash
# Using Python
python3 -m http.server 3000

# Using Node.js (npx)
npx serve .
```

Open `http://localhost:3000` in your web browser.

---

## 📁 File Structure

```text
├── index.html          # Semantic HTML5 layout & window components
├── styles.css          # Design system tokens, hard offset shadows, typography & animations
├── projects.js         # Data array of portfolio projects
├── script.js           # Live clocks, scroll-spy, form handling, copy-to-clipboard
├── README.md           # Documentation
└── assets/             # Vector mockups, icons, and downloadable PDF resume
    ├── project-aothub.svg
    ├── project-spotifyfit.svg
    ├── project-xpbar.svg
    ├── project-posters.svg
    └── resume.pdf
```

---

## 🛠️ How to Add or Edit a Project

All projects are rendered dynamically from `projects.js`. To add a new project, simply append an object to the `projects` array:

```javascript
{
  id: "my-new-project",
  title: "NextGen Dashboard",
  category: "Web App · Design System",
  year: "2026",
  description: "A comprehensive design system and component library built for high-throughput enterprise analytics.",
  tags: ["Figma", "Storybook", "React"],
  image: "assets/my-project-preview.png",
  link: "https://yourprojectlink.com"
}
```

The page will automatically format the category, tags, and browser thumbnail frame.

---

## ✉️ How to Change the Contact Form Endpoint

In `script.js`, locate line 8:

```javascript
const CONTACT_FORM_ENDPOINT = "https://formspree.io/f/xyzyqazb";
```

Replace the URL with your own endpoint:
- **Formspree**: `https://formspree.io/f/YOUR_FORM_ID`
- **Web3Forms**: `https://api.web3forms.com/submit`
- **Formkeep**: `https://formkeep.com/f/YOUR_TOKEN`

The script includes client-side validation, loading states, and success/error message alerts.

---

## 🌐 How to Deploy to Vercel

Since this is a 100% static site with no build tool required:

### Option 1: Via Vercel CLI
```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy directly from this directory
vercel
```

Follow the prompts:
1. `Set up and deploy?` → `Y`
2. `Which scope?` → (Select your account)
3. `Link to existing project?` → `N`
4. `Project name?` → `sohan-portfolio`
5. `In which directory is your code located?` → `./`
6. `Want to modify these settings?` → `N`

### Option 2: Via GitHub + Vercel Dashboard
1. Push this directory to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Leave **Framework Preset** as **"Other"** (Root Directory `./`).
5. Click **Deploy**.

---

## 🎨 Design Tokens & Customization

All colors, borders, and shadows are defined as CSS variables at the top of `styles.css`:

- `--bg-cream`: Warm cream canvas background (`#EFE8D6`)
- `--teal-window`: Pale teal hero window surface (`#B8D8D3`)
- `--peach-accent`: Salmon/peach buttons and accents (`#E9B7A0`)
- `--ink-black`: Near-black text and borders (`#111111`)
- `--shadow-window`: Hard offset window shadow (`6px 6px 0 #111111`)
- `--font-heading`: `'Space Grotesk'`, sans-serif
- `--font-mono`: `'Space Mono'`, monospace
