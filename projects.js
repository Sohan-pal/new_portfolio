/**
 * Projects Data Array
 * Easily add or edit projects by adding an object here.
 */
const projects = [
  {
    id: "aothub",
    title: "AOThub Web App Prototype",
    category: "Web App · UI/UX",
    year: "2026",
    description: "A concept and prototype for an AOT community platform with dashboards, event pages, and community stats.",
    tags: ["Figma", "Notion"],
    image: "assets/project-aothub.svg",
    link: "https://figma.com",
    github: "",
    featured: true
  },
  {
    id: "spotify-fit",
    title: "Spotify-fit App",
    category: "Mobile · UI/UX",
    year: "2025",
    description: "A fitness app concept that matches workouts to musical taste and tempo.",
    tags: ["Figma", "Notion"],
    image: "assets/project-spotifyfit.svg",
    link: "https://figma.com",
    github: "",
    featured: true
  },
  {
    id: "xp-bar",
    title: "XP Bar",
    category: "Branding · Social Media",
    year: "2024",
    description: "Logo design and social content for an independent game-dev page.",
    tags: ["Figma", "Premiere Pro"],
    image: "assets/project-xpbar.svg",
    link: "https://figma.com",
    github: "",
    featured: true
  },
  {
    id: "posters",
    title: "Graphic Design Posters",
    category: "Print · Type",
    year: "2024",
    description: "A growing set of typographic posters for briefs, clients, and personal experiments.",
    tags: ["Illustrator", "Figma"],
    image: "assets/project-posters.svg",
    link: "https://figma.com",
    github: "",
    featured: false
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = projects;
}
