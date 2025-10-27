# Test Credentials

## Brand Account
- **Email:** brand@test.com
- **Password:** brand123
- **Dashboard:** `/brand/dashboard`

## Clipper Account
- **Email:** clipper@test.com
- **Password:** clipper123
- **Dashboard:** `/clipper/dashboard`

## Features

### For Brands
- View campaign statistics
- Manage submissions
- Create new campaigns
- Track performance metrics

### For Clippers
- Browse campaigns (with or without login)
- Submit clips to campaigns
- Track earnings and submissions
- View submission status

## How It Works

1. **Browse Campaigns** - Anyone can browse at `/campaigns` without logging in
2. **Try to Participate** - When clicking "Participate Now", users are prompted to login if not authenticated
3. **Login/Signup** - Users can create account or sign in with test credentials
4. **Role-Based Redirect** - After login:
   - Brands → `/brand/dashboard`
   - Clippers → `/clipper/dashboard`
5. **Persistent Session** - Auth state is persisted using Zustand middleware

## Navigation

- Home: `/`
- Login: `/login`
- Signup: `/signup`
- Campaigns (Public): `/campaigns`
- Brand Dashboard: `/brand/dashboard` (protected)
- Clipper Dashboard: `/clipper/dashboard` (protected)
- Forgot Password: `/forgot-password`
- Reset Password: `/reset-password`
- Verify Email: `/verify-email`
