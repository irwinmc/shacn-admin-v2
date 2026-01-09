# shadcn-admin-v2

A modern admin dashboard template built with **React 19**, **TypeScript**, **Vite**, and **shadcn/ui**.

## Features

- **Authentication System** - Login, register, and password reset
- **Dashboard** - Interactive charts and analytics
- **User Management** - Complete CRUD operations with data table
- **Responsive Design** - Mobile-friendly layout with Tailwind CSS
- **Dark Mode** - Theme switching with next-themes
- **Multi-language** - i18n support (English, 中文, 日本語)
- **Type-safe** - Full TypeScript support
- **Modern Stack** - React Router, React Query, Zustand

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd shadcn-admin-v2

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── layouts/        # Layout components
│   └── data-table/     # Data table with pagination
├── features/           # Feature modules
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard page
│   └── users/          # User management
├── services/           # API services & axios config
├── stores/             # Zustand state management
├── routes/             # React Router configuration
├── types/              # TypeScript type definitions
├── locale/             # i18n language files
└── lib/                # Utility functions
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | React 19 |
| **Language** | TypeScript 5.9 |
| **Build Tool** | Vite 7 |
| **UI Components** | shadcn/ui + Radix UI |
| **Styling** | Tailwind CSS 4 |
| **State Management** | Zustand |
| **Routing** | TanStack Router |
| **Data Fetching** | Axios + React Query |
| **Forms** | React Hook Form + Zod |
| **i18n** | i18next |
| **Icons** | Lucide React, Tabler Icons |
| **Charts** | Recharts |

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

## Authentication

The template includes a complete authentication system:
- **Login & Register** pages with form validation
- **Forgot Password** functionality
- **Token-based** auth with automatic refresh
- **Protected Routes** - authenticated users only

## Localization

Supports multiple languages via i18next:
- English
- 中文 (Simplified Chinese)
- 日本語 (Japanese)

Switch languages in the language selector component.

## Customization

### Change Theme
- Update color variables in your Tailwind config
- Toggle dark mode using `next-themes`

### Add New API Endpoints
- Define endpoints in `src/constants/api-endpoints.ts`
- Create API functions in `src/services/`

### Add New Routes
- Define routes in `src/routes/`
- Use TanStack Router for navigation

## License

MIT

## Contributing

Feel free to fork and submit pull requests!

---

**Made with modern React & TypeScript**
