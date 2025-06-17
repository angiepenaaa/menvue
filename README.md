# menVue - Healthy Menu Discovery App

A React-based web application for discovering healthy menu options under 500 calories, built with TypeScript, Tailwind CSS, and Supabase.

## Features

- 🥗 Browse healthy menu items from local restaurants
- 📱 Mobile-responsive design
- 🔍 Smart search and filtering
- 🧠 AI-powered nutrition recommendations
- 📊 Meal planning and tracking
- 🛒 Shopping cart functionality
- 👤 User authentication and profiles

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions)
- **AI**: OpenAI GPT-4, Pica AI integration
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- VS Code (recommended)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd menvue
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your Supabase project URL and anon key
   - Add other required API keys

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### VS Code Setup

This project includes VS Code configuration for optimal development experience:

- **Recommended Extensions**: Auto-installed when you open the project
- **Settings**: Pre-configured for TypeScript, Tailwind CSS, and Prettier
- **Debugging**: Chrome debugging configuration included

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
VITE_PUSHER_KEY=your_pusher_key
VITE_PUSHER_CLUSTER=your_pusher_cluster
VITE_PUSHER_INSTANCE_ID=your_pusher_instance_id
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── lib/                # External service configurations
├── utils/              # Utility functions
├── data/               # Mock data and constants
├── types/              # TypeScript type definitions
└── styles/             # Global styles

supabase/
├── functions/          # Edge functions
└── migrations/         # Database migrations
```

### Database Schema

The app uses Supabase with the following main tables:
- `users` - User profiles and preferences
- `meal_plans` - User meal planning data
- `user_preferences` - Nutrition and dietary preferences
- `stripe_customers` - Payment integration
- `repository_syncs` - Development sync tracking

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

### License

This project is licensed under the MIT License.