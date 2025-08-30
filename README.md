# VaultBin - Secure Pastebin Application

A modern, privacy-first pastebin application built with React, Vite, and TailwindCSS, featuring end-to-end encryption and a beautiful dark UI.

## 🚀 Features

- **Zero-Knowledge Encryption**: Your data is encrypted before it leaves your device
- **Modern UI**: Beautiful dark theme with responsive design
- **Fast & Lightweight**: Built with Vite for optimal performance
- **Accessible**: Full keyboard navigation and screen reader support
- **Mobile-First**: Responsive design that works on all devices

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Smooth animations
- **Vitest** - Testing framework

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   # or
   pnpm build
   ```

4. **Run tests:**
   ```bash
   npm run test
   # or
   pnpm test
   ```

## 🗂️ Project Structure

```
src/
├── app/
│   ├── App.jsx              # Main app component
│   └── layout/
│       └── Shell.jsx        # Layout wrapper with navbar, sidebar, footer
├── components/
│   ├── Navbar.jsx          # Top navigation bar
│   ├── Sidebar.jsx         # Left sidebar with icons
│   ├── Footer.jsx          # Footer with links and info
│   ├── SearchBar.jsx       # Search input component
│   ├── Card.jsx            # Reusable card component
│   ├── Badge.jsx           # Badge/tag component
│   ├── ThemeToggle.jsx     # Dark/light theme toggle
│   └── EmptyState.jsx      # Empty state placeholder
├── pages/
│   ├── Dashboard.jsx       # Main dashboard with pastes
│   └── AboutFeatures.jsx   # About page with features
├── lib/
│   ├── data.js            # Mock data for development
│   └── ui.js              # Utility functions and helpers
├── styles/
│   └── globals.css        # Global styles and CSS variables
└── test/
    ├── setup.js           # Test configuration
    ├── App.test.jsx       # App component tests
    ├── Dashboard.test.jsx # Dashboard tests
    └── AboutFeatures.test.jsx # About page tests
```

## 🧭 Routes

- `/` - Dashboard (main pastes view)
- `/about` - About page with features and security info

## 🎨 Design System

### Colors
- **Background**: Deep black (`#000000`)
- **Cards**: Dark zinc (`#18181b`)
- **Borders**: Zinc 800 (`#27272a`)
- **Text**: White and zinc variants
- **Accents**: Blue, green, yellow for status indicators

### Typography
- **Body**: 13px - 14px
- **Headings**: 18px - 32px
- **Font**: System fonts with good fallbacks

### Layout
- **Navbar**: Fixed at top, 64px height
- **Sidebar**: Fixed left rail, 64px width on desktop
- **Content**: Responsive max-width with proper spacing
- **Footer**: Normal document flow below content

## 🔧 Development

### Theme Toggle
The app supports dark/light mode toggle, though it defaults to dark theme. The theme is controlled by adding/removing the `dark` class on the `<html>` element.

### Component Guidelines
- Use semantic HTML elements (`<header>`, `<nav>`, `<main>`, etc.)
- Include proper ARIA labels and keyboard navigation
- Follow the design system for consistent spacing and colors
- Use the `cn()` utility for conditional classes

### Adding New Components
1. Create the component in `src/components/`
2. Export it from the file
3. Add proper TypeScript-style prop definitions in comments
4. Include accessibility attributes
5. Add tests in `src/test/`

## 🧪 Testing

Tests are written using Vitest and React Testing Library. Run tests with:

```bash
npm run test
```

Key test files:
- `App.test.jsx` - Basic app rendering
- `Dashboard.test.jsx` - Dashboard functionality
- `AboutFeatures.test.jsx` - About page content

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px
- **Large**: > 1440px

## 🎯 Accessibility

- Full keyboard navigation support
- ARIA labels and roles
- Focus management
- Color contrast ratio ≥ 4.5:1
- Screen reader compatible

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

---

Built with ❤️ for privacy and security.