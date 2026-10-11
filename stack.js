/**
 * Creative Stack Data Array
 * 18 items across 4 categories
 */
const creativeStack = [
  {
    category: "DESIGN",
    fill: "cream",
    chips: ["UI Design", "UX Research", "Wireframing", "Prototyping", "Design Systems"]
  },
  {
    category: "VISUAL",
    fill: "teal",
    chips: ["Branding", "Typography", "Editorial", "Illustration"]
  },
  {
    category: "TOOLS",
    fill: "teal",
    chips: ["Figma", "Illustrator", "Photoshop", "Framer", "Premiere Pro"]
  },
  {
    category: "CODE",
    fill: "cream",
    chips: ["HTML / CSS", "Tailwind", "React (basics)", "Framer Motion"]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = creativeStack;
}
