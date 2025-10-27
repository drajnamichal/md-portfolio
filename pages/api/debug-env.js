// Temporary debug endpoint - DELETE THIS FILE after testing!
export default async function handler(req, res) {
  const envCheck = {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'MISSING',
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
      ? 'SET (starts with: ' + process.env.STRIPE_SECRET_KEY.substring(0, 7) + '...)'
      : 'MISSING',
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET ? 'SET' : 'MISSING',
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'MISSING',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'MISSING',
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'MISSING',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'MISSING',
  };

  res.status(200).json({
    message: 'Environment variables check',
    env: envCheck,
    nodeVersion: process.version,
  });
}
