# Clipping Frontend

A clean and minimal Next.js application for brands and clippers.

## Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with custom Dracula theme
- **shadcn/ui** component library
- **Zustand** for state management
- **Turbopack** for faster builds

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                  # Next.js App Router
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/          # React components
│   └── ui/             # shadcn/ui components
├── lib/                # Utility functions
│   └── store/          # Zustand stores
└── public/             # Static assets
```

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zustand
