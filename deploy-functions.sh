#!/bin/bash

# 🚀 Supabase Edge Functions Deployment Script
# This script helps deploy the send-notification Edge Function

echo "🚀 Starting Supabase Edge Functions Deployment..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed. Please install it first."
    echo "Run: brew install supabase/tap/supabase"
    exit 1
fi

# Check if we're logged in
if ! supabase projects list &> /dev/null; then
    echo "❌ Not logged in to Supabase. Please login first."
    echo "Run: supabase login"
    exit 1
fi

# Check if project is linked
if [ ! -f "supabase/config.toml" ]; then
    echo "❌ Project not linked. Please link your project first."
    echo "Run: supabase link --project-ref pftfxvxyffqufypmsjen"
    exit 1
fi

# Deploy the function
echo "📦 Deploying send-notification function..."
supabase functions deploy send-notification

if [ $? -eq 0 ]; then
    echo "✅ Function deployed successfully!"
    echo ""
    echo "🔗 Function URL: https://pftfxvxyffqufypmsjen.supabase.co/functions/v1/send-notification"
    echo ""
    echo "📋 Next steps:"
    echo "1. Set up Resend API key: supabase secrets set RESEND_API_KEY=\"your_key_here\""
    echo "2. Test the function from your app"
    echo "3. Check logs: supabase functions logs send-notification"
else
    echo "❌ Deployment failed. Please check the error messages above."
    exit 1
fi
