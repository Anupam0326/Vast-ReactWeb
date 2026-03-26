# 🚀 Vast Creative Studios — Official Website

A high-performance, visually immersive website built for **Vast Creative Studios**, a premier marketing and web development agency based in Jabalpur, Madhya Pradesh.

> **Live:** [vastcreativestudios.in](https://vastcreativestudios.in)

---

## 📋 About The Project

Vast Creative Studios approached me to design and develop a modern, professional website that could represent their brand identity online — one that felt premium, creative, and fast. The goal was to build something that would visually set them apart from other agencies in the region while effectively communicating their services and team.

The final product is a fully responsive single-page application featuring an interactive 3D background, smooth scroll-based animations, a detailed service roadmap, and a strong SEO foundation to help them rank on Google for local searches.

---

## 🛠 Tech Stack

| Layer         | Technology                                              |
| ------------- | ------------------------------------------------------- |
| **Framework** | React 19 + Vite 7                                       |
| **3D Engine** | Three.js + React Three Fiber (`@react-three/fiber`)     |
| **Animation** | GSAP 3 + Motion (Framer Motion)                         |
| **Styling**   | Tailwind CSS 4                                          |
| **Icons**     | Lucide React                                            |
| **SEO**       | react-helmet-async + JSON-LD Structured Data            |
| **Hosting**   | Vercel (with custom domain)                             |

---

## 🧩 Key Features

- **Interactive 3D Prism Background** — A WebGL-powered animated prism effect rendered with Three.js that reacts in real-time, giving the site a dynamic and futuristic feel.
- **Scroll-Driven Animations** — Sections fade and slide into view using GSAP and Motion, creating a fluid storytelling experience as users scroll.
- **Service Roadmap** — A visual, step-by-step timeline that walks potential clients through the agency's workflow: from discovery to deployment.
- **Expertise Showcase** — Highlights the agency's core services with interactive cards and iconography.
- **Full SEO Setup** — Open Graph meta tags, Twitter cards, JSON-LD schema markup, and a submitted sitemap to ensure strong search engine visibility.
- **Mobile-First Responsive Design** — Every section is fully responsive and tested across mobile, tablet, and desktop breakpoints.

---

## 🧪 Challenges & Solutions

### 1. Three.js Crashing on Low-End Mobile Devices

**Problem:** The full 3D Prism background caused severe frame drops and occasional browser crashes on budget Android devices. The WebGL context was consuming too much GPU memory, and the animation loop was competing with GSAP scroll animations for the main thread.

**Solution:** We implemented a device-tier detection system. On page load, we measure the device's GPU capabilities using `WEBGL_debug_renderer_info` and available device memory. For low-end devices, the Prism component automatically scales down its resolution, reduces polygon count, and lowers the animation `timeScale`. As a fallback for extremely limited devices, we swap the 3D background for a lightweight CSS gradient animation, preserving the visual feel without the GPU cost.

---

### 2. GSAP and Framer Motion Fighting Over the Same DOM Elements

**Problem:** We initially used GSAP's `ScrollTrigger` for the Roadmap section and Motion (Framer Motion) for the Hero's entrance animations. When both libraries tried to animate shared layout properties (`transform`, `opacity`) on overlapping scroll regions, elements would visibly "jump" or flicker during fast scrolling as each library overwrote the other's inline styles.

**Solution:** We established strict ownership boundaries — GSAP exclusively handles scroll-triggered, timeline-based animations (Roadmap, Expertise card reveals), while Motion handles component-level mount/unmount transitions (Hero entrance, Navbar state changes). We also wrapped GSAP-controlled sections in dedicated refs to ensure `ScrollTrigger` calculations were scoped correctly, preventing any bleed into Motion-managed components.

---

### 3. SEO — React SPAs Are Invisible to Search Crawlers

**Problem:** Since this is a single-page React application, the initial HTML served to Google's crawler was essentially an empty `<div id="root">`. None of the page content, meta tags, or structured data would be visible during crawl time, which meant the site wouldn't rank for any target keywords.

**Solution:** We attacked this from multiple angles. First, we injected all critical meta tags (title, description, Open Graph, Twitter Cards) directly into `index.html` so they are available before any JavaScript executes. Then we added `react-helmet-async` to dynamically manage the document head for future multi-page support. We also created a JSON-LD structured data schema describing the organization (name, address, contact, social links) and embedded it in the app. Finally, we submitted a `sitemap.xml` and configured `robots.txt` to guide crawlers efficiently. Within weeks of deployment, the site began ranking on the first page for "marketing agency Jabalpur."

---

### 4. Cumulative Layout Shift (CLS) from Late-Loading Assets

**Problem:** The 3D canvas, team member images, and service icons loaded asynchronously, causing visible layout shifts as elements popped into place. Google's Core Web Vitals flagged the site with a poor CLS score, which directly affects search ranking.

**Solution:** We reserved explicit dimensions for every media container using CSS `aspect-ratio` and skeleton placeholders. The Three.js canvas is rendered inside a fixed-position container that is sized on initial paint, so the 3D background never shifts surrounding content. For images, we used proper `width` and `height` attributes and lazy loading with `loading="lazy"` to defer off-screen assets without causing reflows.

---

## 📂 Project Structure

```
vast-react/
├── public/
│   ├── assets/            # Images, logos, team photos
│   ├── robots.txt         # Crawler directives
│   └── sitemap.xml        # Sitemap for search engines
├── src/
│   ├── components/
│   │   ├── Navbar.jsx     # Sticky navigation bar
│   │   ├── Hero.jsx       # Landing section with animated text
│   │   ├── Expertise.jsx  # Services showcase
│   │   ├── Roadmap.jsx    # Step-by-step workflow timeline
│   │   ├── Footer.jsx     # Contact info and social links
│   │   ├── Prism.jsx      # WebGL 3D background effect
│   │   ├── RotatingText.jsx  # Animated text carousel
│   │   └── SEO.jsx        # Dynamic meta tag management
│   ├── App.jsx            # Root application component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html             # HTML entry with static meta tags
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Anupam0326/Vast-ReactWeb.git

# Navigate into the project
cd Vast-ReactWeb/vast-react

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## 📬 Contact

Built by **Anupam** for **Vast Creative Studios**

- 🌐 Website: [vastcreativestudios.in](https://vastcreativestudios.in)
- 📸 Instagram: [@vast_creative.studios](https://www.instagram.com/vast_creative.studios)
- 💼 LinkedIn: [Vast Creative Studios](https://www.linkedin.com/company/vast-creative-studios/)
