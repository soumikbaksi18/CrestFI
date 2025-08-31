# DeFi Dashboard

A comprehensive DeFi dashboard built with React, TypeScript, and Vite. This application provides a modern interface for managing DeFi portfolios, trading, staking, and yield farming.

## Features

- **Dashboard**: Overview of portfolio performance and quick actions
- **Portfolio**: Asset management and performance tracking
- **Trading**: Token swapping and market data
- **Staking**: Asset staking with reward tracking
- **Yield Farming**: Liquidity provision and farming rewards
- **Analytics**: Performance metrics and risk analysis
- **Settings**: User preferences and account management

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Context (WalletContext)
- **DeFi Integration**: Viem + Wagmi
- **UI Components**: Radix UI primitives

## Project Structure

```
src/
├── components/
│   └── layout/
│       ├── GlobalLayout.tsx    # Main layout wrapper
│       ├── Sidebar.tsx         # Navigation sidebar
│       ├── Navbar.tsx          # Top navigation bar
│       └── index.ts            # Layout exports
├── contexts/
│   └── WalletContext.tsx       # Wallet connection context
├── pages/
│   ├── Dashboard.tsx           # Main dashboard page
│   ├── Portfolio.tsx           # Portfolio management
│   ├── Trading.tsx             # Trading interface
│   ├── Staking.tsx             # Staking management
│   ├── YieldFarming.tsx        # Yield farming
│   ├── Analytics.tsx           # Performance analytics
│   ├── Settings.tsx            # User settings
│   └── index.ts                # Page exports
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions and contracts
├── App.tsx                     # Main app component
├── appRouter.tsx               # Application routing
└── main.tsx                    # App entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kallukaliya
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Components

### GlobalLayout
The main layout component that wraps the entire application with:
- Sidebar navigation
- Top navigation bar
- Main content area

### Sidebar
Navigation sidebar with:
- Dashboard overview
- Portfolio management
- Trading interface
- Staking options
- Yield farming
- Analytics
- Settings

### Navbar
Top navigation bar featuring:
- Search functionality
- Wallet connection
- Notifications
- User profile

### WalletContext
Manages wallet connections and provides:
- Wallet connection state
- Address information
- Connect/disconnect functions
- Network switching

## Routing

The application uses React Router with the following routes:
- `/` → Redirects to `/dashboard`
- `/dashboard` → Main dashboard
- `/portfolio` → Portfolio management
- `/trading` → Trading interface
- `/staking` → Staking management
- `/yield-farming` → Yield farming
- `/analytics` → Performance analytics
- `/settings` → User settings

## Styling

The application uses Tailwind CSS for styling with:
- Responsive design
- Modern UI components
- Consistent color scheme
- Hover effects and transitions

## Icons

All icons are from Lucide React, providing:
- Consistent icon style
- Scalable vector graphics
- Easy customization
- Lightweight bundle

## Development

### Adding New Pages

1. Create a new page component in `src/pages/`
2. Export it from `src/pages/index.ts`
3. Add the route in `src/appRouter.tsx`

### Adding New Components

1. Create the component in the appropriate directory
2. Export it from the corresponding `index.ts` file
3. Import and use it in your pages

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the existing color scheme
- Maintain consistent spacing and typography
- Ensure responsive design

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
