# Sohan Pal: Portfolio

A retro desktop-OS portfolio, hand-coded in plain HTML, CSS and vanilla JavaScript. No build step, no dependencies. Two ways to view it:

- **Desktop mode (default):** one-screen interactive desktop. Folder icons on the right open draggable windows (Work, About me, Contact, Links) with a taskbar at the bottom.
- **HR mode:** a simple one-page version for people who only want the work: top projects, a short bio, recent highlights and a contact call-to-action. Toggle it with the pill in the top-right of the menu bar, or link straight to it with `?mode=hr`.

## Run locally

```bash
python3 -m http.server 3000
# or: npx serve .
```

Open http://localhost:3000. After editing files, hard refresh (Cmd+Shift+R) so the browser doesn't serve a cached `script.js`.

## Files

```text
index.html        Markup: menu bar, widget panel, 5 windows, icon column, taskbar, HR container
styles.css        Design tokens (top of file), layout, window system, HR mode, mobile rules
script.js         Clocks, data rendering, window manager, tabs, form, HR mode, custom cursor
projects.js       Projects (id, title, category, year, description, tags, image, link, github, featured)
testimonials.js   Testimonials (quote, author, org, fill, tilt)
stack.js          Creative stack, 4 categories of chips
timeline.js       Timeline entries, newest first
assets/           Project images and resume.pdf
```

Content lives in the four data files. Edit those, not the HTML.

## Common edits

**Add a project:** append an object to `projects.js`. Set `featured: true` on up to three projects; those appear in HR mode (if none are featured, the first three are used).

**Replace placeholder images:** drop images in `assets/` and update the `image` paths in `projects.js`.

**Social links:** update the URLs in `index.html`. They appear twice: the Contact window and the Links window.

**Resume:** replace `assets/resume.pdf` (keep the filename).

**About text and info strip:** edit the About tab in `index.html`. HR mode reuses that text, so it only needs changing once.

## Contact form

The form posts to `CONTACT_FORM_ENDPOINT` at the top of `script.js`. While it still holds the placeholder value, the form shows the "email me directly" fallback instead of pretending a message was sent. To connect it:

1. Create a free form at Formspree or Web3Forms.
2. Paste its URL into `CONTACT_FORM_ENDPOINT`.
3. Send a test message.

## HR mode

- Toggle in the menu bar. The choice is remembered in the browser.
- `?mode=hr` and `?mode=desktop` force a mode for that visit (they are not saved), so `https://your-site/?mode=hr` is a good link for a resume or application.
- The page has print styles, so HR mode prints cleanly.

## Deploy (static site, nothing to configure)

- **Netlify Drop:** drag the project folder onto app.netlify.com/drop.
- **GitHub Pages:** push to GitHub, then Settings → Pages → deploy from the `main` branch.
- **Vercel / Cloudflare Pages:** import the repo, framework preset "Other", no build command.

After deploying, test the form, the resume download, `?mode=hr` and the site on a phone.

## Design tokens

All colors, borders, shadows and fonts are CSS variables at the top of `styles.css`: cream `#EFE8D6`, pale teal `#B8D8D3`, wave teal `#D3E4DD`, peach `#E9B7A0`, ink `#111111`; hard offset shadows; Space Grotesk for headings and Space Mono for UI text.
