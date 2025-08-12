# InnovateSphere 2025 - AI for Social Good Hackathon

A modern, accessible, and performant hackathon website built with React, TypeScript, and Vite. This project showcases innovative web development using AI-assisted development with Kiro.

## 🚀 Features

### ✨ Modern Design
- **Glassmorphism UI**: Beautiful glass-like effects with backdrop blur
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Dark Theme**: Elegant dark theme with vibrant gradients
- **Smooth Animations**: Framer Motion powered animations with reduced motion support

### ♿ Accessibility First
- **WCAG 2.1 AA Compliant**: Comprehensive accessibility implementation
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Friendly**: Proper ARIA labels and semantic HTML
- **High Contrast Mode**: Built-in high contrast theme support
- **Font Size Controls**: User-adjustable font sizes

### ⚡ Performance Optimized
- **Core Web Vitals**: Optimized for LCP, FID, and CLS metrics
- **Code Splitting**: Automatic code splitting for optimal loading
- **Lazy Loading**: Components and images load on demand
- **Bundle Optimization**: Minimized bundle size with tree shaking

### 🔧 Developer Experience
- **TypeScript**: Full type safety throughout the application
- **Testing Suite**: Comprehensive unit, integration, and accessibility tests
- **Deployment Ready**: Multi-platform deployment configurations
- **Monitoring**: Built-in performance and error tracking

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **Animations**: Framer Motion
- **Icons**: React Icons, Lucide React
- **Testing**: Vitest, React Testing Library, axe-core
- **Deployment**: Netlify, Vercel, Heroku ready

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/innovatesphere-2025.git
cd innovatesphere-2025

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🚀 Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Testing
```bash
npm run test                    # Run tests in watch mode
npm run test:run               # Run tests once
npm run test:coverage          # Run tests with coverage
npm run test:accessibility     # Run accessibility tests
```

### Validation
```bash
npm run validate:deployment        # Validate deployment readiness
npm run validate:case-sensitivity  # Check for case sensitivity issues
npm run build:validate            # Build and validate everything
```

## 🌐 Deployment

This project is configured for deployment on multiple platforms:

### Netlify
```bash
# Automatic deployment via Git integration
# Or manual deployment:
npm run build
netlify deploy --prod --dir=dist
```

### Vercel
```bash
# Automatic deployment via Git integration
# Or manual deployment:
vercel --prod
```

### Heroku
```bash
# Deploy to Heroku with static buildpack
git push heroku main
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🎯 Project Structure

```
src/
├── components/           # React components
│   ├── accessibility/   # Accessibility utilities and tools
│   ├── animations/      # Animation components
│   ├── forms/          # Form components
│   ├── layout/         # Layout components (Header, Footer)
│   ├── loading/        # Loading and skeleton components
│   ├── monitoring/     # Performance monitoring components
│   ├── sections/       # Page sections (Hero, About, etc.)
│   └── ui/            # Reusable UI components
├── hooks/              # Custom React hooks
├── styles/            # Global styles and CSS utilities
├── test/              # Test utilities and setup
└── utils/             # Utility functions and constants
```

## 🎨 Design System

### Colors
- **Primary Purple**: `#4F46E5`
- **Primary Blue**: `#3B82F6`
- **Glass White**: `rgba(255, 255, 255, 0.1)`
- **Glass Border**: `rgba(255, 255, 255, 0.2)`

### Typography
- **Font Family**: Inter, Poppins, system-ui
- **Font Sizes**: Responsive scaling with user controls

### Components
- **Glassmorphism Cards**: Backdrop blur with semi-transparent backgrounds
- **Animated Buttons**: Hover effects and loading states
- **Accessible Forms**: Full keyboard and screen reader support

## ♿ Accessibility Features

- **Keyboard Navigation**: Tab, Enter, Space, Arrow keys support
- **Screen Reader Support**: Comprehensive ARIA labels and descriptions
- **Focus Management**: Proper focus trapping in modals
- **Color Contrast**: WCAG AA compliant color combinations
- **Reduced Motion**: Respects user's motion preferences
- **Font Scaling**: User-controlled font size adjustments

## 📊 Performance

- **Bundle Size**: <500KB optimized
- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: 
  - LCP: <2.5s
  - FID: <100ms
  - CLS: <0.1

## 🧪 Testing

The project includes comprehensive testing:

- **Unit Tests**: Utility functions and hooks
- **Component Tests**: React component behavior
- **Integration Tests**: User workflows and interactions
- **Accessibility Tests**: WCAG compliance validation
- **Visual Tests**: Glassmorphism and responsive design

## 🤖 AI-Assisted Development

This project was built using Kiro, an AI-powered development assistant. See [KIRO_DEVELOPMENT_PROCESS.md](./KIRO_DEVELOPMENT_PROCESS.md) for detailed documentation of the AI-assisted development process.

### Key Innovations
- **Spec-to-Code Development**: Structured approach from requirements to implementation
- **Automated Quality Assurance**: Built-in testing and validation
- **Accessibility-First Design**: Comprehensive a11y implementation from the start
- **Performance Optimization**: Real-time monitoring and optimization

## 🌟 Event Details

**InnovateSphere 2025: Code the Future for Social Good**

- **Date**: August 22-23, 2025
- **Duration**: 18 hours of innovation
- **Format**: Virtual hackathon
- **Theme**: AI for Social Good
- **Prizes**: ₹18,000 total prize pool
- **Registration**: [Join the hackathon](https://forms.innovatesphere.com/register)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Kiro AI**: For AI-assisted development capabilities
- **React Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Framer Motion**: For smooth animations
- **Accessibility Community**: For WCAG guidelines and best practices

## 📞 Contact

- **Email**: director@btibangalore.com
- **Discord**: [Join our community](https://discord.gg/innovatesphere)
- **Twitter**: [@innovatesphere](https://twitter.com/innovatesphere)

---

Built with ❤️ using Kiro AI assistance for the Code with Kiro hackathon.