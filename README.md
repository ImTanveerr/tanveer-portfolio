# Portfolio Website – Frontend (Next.js + TypeScript)

This is the **frontend** of my personal portfolio website built with **Next.js**, **TypeScript**, and **Tailwind CSS**.  
It provides a **modern, responsive, and SEO-friendly** interface to showcase my work, blog posts, and personal information.

---

##  Features

### Public Pages
- **Home Page** – Displays introduction and featured sections.
- **About Me** – Static personal info (bio, education, contact, and skills).
- **Projects Showcase** – Dynamic list of personal projects with thumbnails, live links, and descriptions.
- **Blog Section**
  - View all blogs using **ISR (Incremental Static Regeneration)**.
  - Each blog uses **getStaticPaths + revalidate** for individual pre-rendering.
  - Fast performance and SEO optimization.

###  Private (Owner Only)
- **Authentication**
  - Secure login with JWT (JSON Web Token) stored in cookies.
  - Token verified via Express backend.
- **Dashboard**
  - Accessible only by the authenticated owner.
  - Manage (CRUD) blog posts and projects.
  - View dynamic analytics and content stats.


##  Tech Stack

| Technology | Purpose |
|-------------|----------|
| **Next.js 14** | React framework for SSG/SSR/ISR |
| **TypeScript** | Type-safe frontend development |
| **Tailwind CSS** | Utility-first styling |
| **Axios / RTK Query** | Data fetching from Express API |
| **React Hot Toast** | Real-time toast notifications |
| **Next Auth / Custom JWT Logic** | Authentication and authorization |

---

