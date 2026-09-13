# Jangral Enterprises — Website

Static marketing website for **Jangral Enterprises**, Jammu — manufacturer of defence,
police, paramilitary & ordnance clothing since 2006.

🌐 **Live site:** https://yashmehta0.github.io/jangral-enterprises/

## Pages
| File | Page |
|------|------|
| `index.html` | Products — featured carousel + filterable product range |
| `about.html` | About the company + why choose us |
| `contact.html` | Contact details (call / WhatsApp / email) |

## Structure
```
index.html      Products (home)
about.html      About
contact.html    Contact
style.css       Shared styles (light + dark theme)
theme.js        Theme toggle + year
app.js          Carousel + product filters
images/         Product photos
```

## Editing
It's plain HTML/CSS/JS — no build step. Edit the files and commit; GitHub Pages
redeploys automatically. To add a product, copy an existing `<article class="pcard">`
block in `index.html`, drop a photo in `images/`, and set its `data-cat`.

## Contact
Gorav Jangral · +91 94192 88058 · goravjangral@icloud.com
