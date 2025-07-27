// Configuration management for different environments
export const config = {
  // Database
  databaseUrl: process.env.DATABASE_URL!,

  // Environment
  nodeEnv: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',

  // API
  apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000/api',

  // App Settings
  appEnv: process.env.APP_ENV || 'development',

  // Debug
  debugMode: process.env.DEBUG_MODE === 'true',
  logLevel: process.env.LOG_LEVEL || 'info',

  // Next.js
  nextAuthUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  nextAuthSecret: process.env.NEXTAUTH_SECRET,
} as const;

// Validation function to ensure required env vars are present
export function validateConfig() {
  const requiredVars = ['DATABASE_URL'];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  }
}

// Environment-specific configurations
export const dbConfig = {
  development: {
    logging: true,
    ssl: false,
  },
  production: {
    logging: false,
    ssl: true,
  },
  test: {
    logging: false,
    ssl: false,
  },
};

export const getCurrentDbConfig = () => {
  return (
    dbConfig[config.nodeEnv as keyof typeof dbConfig] || dbConfig.development
  );
};
