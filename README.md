# menVue - Healthy Menu Discovery App

A React-based web application for discovering healthy menu options under 500 calories, built with TypeScript, Tailwind CSS, and Supabase.

## 🚀 Live Demo

[View Live Application](https://your-app-name.vercel.app)

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
- **Delivery**: DoorDash Drive API
- **Deployment**: Netlify

## 🚀 Deployment

This project is configured for easy deployment on Vercel:

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/menvue)

### Manual Deployment

1. **Fork this repository**
2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your forked repository
3. **Configure Environment Variables** in Vercel dashboard:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_OPENWEATHER_API_KEY=your_openweather_api_key
   VITE_PUSHER_KEY=your_pusher_key
   VITE_PUSHER_CLUSTER=your_pusher_cluster
   VITE_PUSHER_INSTANCE_ID=your_pusher_instance_id
   OPENAI_API_KEY=your_openai_api_key
   PICA_SECRET_KEY=your_pica_secret_key
   PICA_OPENAI_CONNECTION_KEY=your_pica_openai_connection_key
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   DOORDASH_DEVELOPER_ID=your_doordash_developer_id
   DOORDASH_KEY_ID=your_doordash_key_id
   DOORDASH_SIGNING_SECRET=your_doordash_signing_secret
   DOORDASH_ENVIRONMENT=sandbox
   ```
4. **Deploy!** Vercel will automatically build and deploy your app

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- VS Code (recommended)
- Google OAuth 2.0 credentials (for authentication)
- Supabase project with Google OAuth enabled

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
   - Configure Google OAuth in your Supabase project

# DoorDash Drive API (for delivery integration)
DOORDASH_DEVELOPER_ID=416969ad-68be-44d4-a944-81c477988a73
DOORDASH_KEY_ID=6c423cd4-64f0-4cf6-ab37-d12b79da6867
DOORDASH_SIGNING_SECRET=r96Qe1HVaKOdsIYnOtC9lrXviofIVkIMHZAD8fkbuVY
DOORDASH_ENVIRONMENT=sandbox
   - Add other required API keys

### Google OAuth Setup

To enable Google Sign-In, you need to configure OAuth in your Supabase project:

1. **Get Google OAuth Credentials:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
   - Set application type to "Web application"
   - Add authorized redirect URIs:
     ```
     https://your-project-ref.supabase.co/auth/v1/callback
     http://localhost:5173/auth/callback (for development)
     ```
   - Copy the Client ID and Client Secret

2. **Configure Supabase:**
   - Go to your Supabase project dashboard
   - Navigate to "Authentication" → "Providers"
   - Enable Google provider
   - Add your Google Client ID and Client Secret
   - Set redirect URL to: `https://your-project-ref.supabase.co/auth/v1/callback`

3. **Update Site URL:**
   - In Supabase Authentication settings
   - Set Site URL to your domain (e.g., `http://localhost:5173` for development)
   - Add additional redirect URLs if needed

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

# DoorDash Drive API (for delivery integration)
DOORDASH_DEVELOPER_ID=your_doordash_developer_id
DOORDASH_KEY_ID=your_doordash_key_id
DOORDASH_SIGNING_SECRET=your_doordash_signing_secret
DOORDASH_ENVIRONMENT=sandbox
```

### Supabase Edge Functions Environment Variables

**IMPORTANT**: The DoorDash integration requires environment variables to be set in your Supabase project, not just in your local `.env` file.

#### Setting Environment Variables in Supabase:

1. **Via Supabase Dashboard:**
   - Go to your Supabase project dashboard
   - Navigate to "Edge Functions" in the sidebar
   - Click on "Environment Variables"
   - Add the following variables:
     ```
     DOORDASH_DEVELOPER_ID=your_doordash_developer_id
     DOORDASH_KEY_ID=your_doordash_key_id
     DOORDASH_SIGNING_SECRET=your_doordash_signing_secret
     DOORDASH_ENVIRONMENT=sandbox
     ```

2. **Via Supabase CLI:**
   ```bash
   supabase secrets set DOORDASH_DEVELOPER_ID=your_doordash_developer_id
   supabase secrets set DOORDASH_KEY_ID=your_doordash_key_id
   supabase secrets set DOORDASH_SIGNING_SECRET=your_doordash_signing_secret
   supabase secrets set DOORDASH_ENVIRONMENT=sandbox
   ```

#### Getting DoorDash Credentials:

1. Sign up for DoorDash Drive API access at [DoorDash Developer Portal](https://developer.doordash.com/)
2. Create a new app in your developer dashboard
3. Get your credentials:
   - **Developer ID**: Found in your app settings
   - **Key ID**: Generated when you create API keys
   - **Signing Secret**: Generated when you create API keys
4. Set `DOORDASH_ENVIRONMENT=sandbox` for testing, `production` for live orders

**Note**: Without these environment variables properly configured in Supabase, the DoorDash delivery features will not work.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

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

### DoorDash Drive Integration

The app integrates with DoorDash Drive API for delivery services:

- **JWT Authentication**: Secure token-based authentication
- **Delivery Quotes**: Get pricing and timing estimates
- **Delivery Creation**: Create actual delivery orders
- **Status Tracking**: Real-time delivery status updates
- **Sandbox Mode**: Test integration without real deliveries

#### DoorDash Setup

1. Sign up for DoorDash Drive API access
2. Get your credentials from the DoorDash Developer Portal
3. Add credentials to your `.env` file
4. Set `DOORDASH_ENVIRONMENT=sandbox` for testing

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

### License

This project is licensed under the MIT License.