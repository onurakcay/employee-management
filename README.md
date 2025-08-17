# 🏢 Employee Management System

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://ing.onurakcay.dev)
[![Test Coverage](https://img.shields.io/badge/Coverage-80%25-yellow?style=for-the-badge)](#testing)
[![License](https://img.shields.io/badge/License-BSD--3--Clause-blue?style=for-the-badge)](LICENSE)

> Modern, responsive employee management system built with LitElement and cutting-edge web technologies.

## 🌟 Features

### 📱 **Modern User Experience**

- **Responsive Design**: Seamlessly adapts to desktop, tablet, and mobile devices
- **Progressive Web App (PWA)**: Installable and works offline
- **Dark/Light Theme**: Automatic theme switching based on system preferences
- **Internationalization**: Multi-language support (English/Turkish)

### 👥 **Employee Management**

- **Complete CRUD Operations**: Create, Read, Update, Delete employees
- **Advanced Search & Filtering**: Real-time search across all employee fields
- **Smart Pagination**: Efficient data loading with customizable page sizes
- **Bulk Operations**: Select and delete multiple employees
- **Data Validation**: Comprehensive form validation with real-time feedback

### 🎨 **Dynamic Views**

- **List View**: Traditional table layout for desktop users
- **Card View**: Modern card-based layout optimized for mobile
- **Auto View Switching**: Automatically switches to card view on mobile devices
- **Persistent Preferences**: Remembers user's preferred view mode

### 🔧 **Technical Excellence**

- **Modern Web Components**: Built with LitElement 3.0
- **State Management**: Redux Toolkit for predictable state updates
- **Type Safety**: JSDoc annotations for better development experience
- **Comprehensive Testing**: 80%+ test coverage with Web Test Runner
- **Performance Optimized**: Lazy loading and efficient rendering

## 🚀 Live Demo

**Visit the live application:** [ing.onurakcay.dev](https://ing.onurakcay.dev)

## 🛠 Technology Stack

### **Frontend Framework**

- **[LitElement 3.0](https://lit.dev/)** - Lightweight web components library
- **[Vaadin Router](https://vaadin.com/router)** - Client-side routing
- **[Redux Toolkit](https://redux-toolkit.js.org/)** - State management

### **Styling & UI**

- **CSS Custom Properties** - Dynamic theming
- **CSS Grid & Flexbox** - Modern layout techniques
- **Responsive Design** - Mobile-first approach

### **Development Tools**

- **[Web Dev Server](https://modern-web.dev/docs/dev-server/overview/)** - Fast development server
- **[Web Test Runner](https://modern-web.dev/docs/test-runner/overview/)** - Modern testing framework
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

### **Testing & Quality**

- **[@open-wc/testing](https://open-wc.org/docs/testing/testing-package/)** - Web component testing utilities
- **[Playwright](https://playwright.dev/)** - Browser automation for testing
- **Test Coverage Reporting** - Istanbul/NYC coverage reports

## 🏃‍♂️ Quick Start

### Prerequisites

- **Node.js** 16.0 or higher
- **npm** 7.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/onurakcay/employee-management.git
cd employee-management

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8000`

## 📚 Available Scripts

### Development

```bash
npm run dev          # Start development server with hot reload
npm run serve        # Start development server (alias for dev)
npm run serve:prod   # Start server in production mode
```

### Testing

```bash
npm test             # Run all tests (dev + prod)
npm run test:dev     # Run tests in development mode
npm run test:prod    # Run tests in production mode
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

### Code Quality

```bash
npm run lint         # Run ESLint and lit-analyzer
npm run format       # Format code with Prettier
npm run analyze      # Analyze web components
```

### Build & Deployment

```bash
npm run build        # Build for production
npm run docs         # Generate documentation site
npm run docs:serve   # Serve documentation locally
```

## 🧪 Testing Strategy

The project maintains **80%+ test coverage**

### **Running Tests**

```bash
# Run all tests with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch

# Test specific files
npm test -- --grep="employee-form"
```

View detailed coverage reports at `coverage/lcov-report/index.html`

## 🎨 Customization

### **Theming**

The application uses CSS custom properties for easy theming:

```css
:root {
  --color-primary: #ff6200;
  --color-secondary: #0070f3;
  --font-family-base: 'Inter', sans-serif;
  --border-radius: 8px;
  --spacing-unit: 8px;
}
```

### **Localization**

Add new languages by extending the localization files:

```javascript
// src/utils/localization.js
const translations = {
  en: {
    /* English translations */
  },
  tr: {
    /* Turkish translations */
  },
  // Add more languages here
};
```

### **Custom Components**

Create new components following the established patterns:

```javascript
import {LitElement, html, css} from 'lit';

export class MyComponent extends LitElement {
  static styles = css`
    /* your styles */
  `;

  render() {
    return html`<!-- your template -->`;
  }
}

customElements.define('my-component', MyComponent);
```

### **Development Guidelines**

- Follow the existing code style
- Write tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the **BSD-3-Clause License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Onur Akçay**

- 🌐 Website: [onurakcay.dev](https://onurakcay.dev)
- 📧 Email: onurakcay.tr@gmail.com
- 💼 LinkedIn: [onurakcay](https://linkedin.com/in/onurakcay)

## 🙏 Acknowledgments

- **[Lit Team](https://lit.dev/)** for the web components library
- **[ING Hubs](https://careers.ing.com/en/turkiye-hubs)** for design inspiration

---
