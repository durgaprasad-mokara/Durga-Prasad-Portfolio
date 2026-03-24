# Mokara Durga Prasad — Portfolio

A modern, interactive portfolio website showcasing my skills, projects, certifications, and education.

## 🚀 Live

[stellar-glyph-sync.lovable.app](https://stellar-glyph-sync.lovable.app)

## ✨ Features

- **3D Hero Section** — Interactive Three.js animated text
- **Dynamic Content** — All sections powered by a cloud backend (skills, projects, certifications, education, about)
- **Admin Dashboard** — Secure admin panel to manage all portfolio content
- **Contact Form** — Visitors can send messages directly
- **Dark/Light Mode** — Theme toggle with smooth transitions
- **Responsive Design** — Fully optimized for mobile, tablet, and desktop
- **Smooth Animations** — Framer Motion transitions throughout

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **3D Graphics:** Three.js, React Three Fiber, Drei
- **Animation:** Framer Motion
- **UI Components:** shadcn/ui, Radix UI
- **Backend:** Lovable Cloud (authentication, database, edge functions)
- **State Management:** TanStack React Query

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ui/           # shadcn/ui primitives
│   ├── HeroSection   # 3D animated hero
│   ├── AboutSection  # Bio & highlights
│   ├── SkillsSection # Skills by category
│   ├── ProjectsSection
│   ├── CertificationsSection
│   ├── EducationSection
│   └── ContactSection
├── pages/
│   ├── Index.tsx     # Landing page
│   ├── AdminLogin    # Admin authentication
│   └── admin/        # Admin CRUD pages
├── hooks/            # Custom React hooks
└── integrations/     # Backend client & types
```

## 🔐 Admin Access

Navigate to `/admin/login` to access the admin dashboard for managing portfolio content.

## 📄 License

© 2026 Mokara Durga Prasad. All rights reserved.
