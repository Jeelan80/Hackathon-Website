# Deployment Guide

This guide covers deploying the InnovateSphere 2025 hackathon website to multiple platforms.

## Quick Start

1. **Build and validate locally:**
   ```bash
   npm run build:validate
   ```

2. **Deploy to your preferred platform:**
   - [Netlify](#netlify-deployment)
   - [Vercel](#vercel-deployment)
   - [Heroku](#heroku-deployment)

## Platform-Specific Deployment

### Netlify Deployment

#### Automatic Deployment (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** `18`

#### Manual Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

#### Environment Variables
Set these in Netlify dashboard:
```
VITE_API_URL=https://api.innovatesphere.com
VITE_DISCORD_INVITE_URL=https://discord.gg/innovatesphere
VITE_ENABLE_ANALYTICS=true
```

### Vercel Deployment

#### Automatic Deployment (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. No additional configuration needed

#### Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Build and deploy
vercel --prod
```

#### Environment Variables
Set these in Vercel dashboard:
```
VITE_API_URL=https://api.innovatesphere.com
VITE_DISCORD_INVITE_URL=https://discord.gg/innovatesphere
VITE_ENABLE_ANALYTICS=true
```

### Heroku Deployment

#### Setup
1. Create a new Heroku app
2. Add the static buildpack:
   ```bash
   heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static.git
   ```

#### Deploy
```bash
# Login to Heroku
heroku login

# Create app (if not exists)
heroku create your-app-name

# Deploy
git push heroku main
```

#### Configuration
The `static.json` file is already configured for Heroku deployment.

## Environment Variables

### Required Variables
- `VITE_API_URL` - API endpoint URL
- `VITE_DISCORD_INVITE_URL` - Discord server invite link
- `VITE_CONTACT_EMAIL` - Contact email address

### Optional Variables
- `VITE_ENABLE_ANALYTICS` - Enable Google Analytics (true/false)
- `VITE_ENABLE_ERROR_TRACKING` - Enable error tracking (true/false)
- `VITE_GOOGLE_ANALYTICS_ID` - Google Analytics tracking ID
- `VITE_SENTRY_DSN` - Sentry error tracking DSN

## Troubleshooting

### Common Issues

#### 1. Build Failures

**Symptom:** Build fails with TypeScript errors
```bash
# Check for type errors
npx tsc --noEmit

# Fix common issues
npm run lint --fix
```

**Symptom:** Build fails with missing dependencies
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 2. Deployment Issues

**Symptom:** 404 errors on page refresh
- **Cause:** Missing client-side routing configuration
- **Solution:** Ensure `netlify.toml`, `vercel.json`, or `static.json` is properly configured

**Symptom:** CSS styles not loading
- **Cause:** Tailwind CSS purging required classes
- **Solution:** Check `tailwind.config.js` safelist configuration

**Symptom:** Environment variables not working
- **Cause:** Missing `VITE_` prefix or incorrect configuration
- **Solution:** Ensure all environment variables start with `VITE_`

#### 3. Performance Issues

**Symptom:** Large bundle size
```bash
# Analyze bundle
npm run build
npx vite-bundle-analyzer dist
```

**Symptom:** Slow loading times
- Check image optimization
- Verify code splitting is working
- Enable compression on hosting platform

#### 4. Case Sensitivity Issues

**Symptom:** Build works locally but fails on deployment
```bash
# Check for case sensitivity issues
npm run validate:case-sensitivity
```

### Platform-Specific Issues

#### Netlify
- **Issue:** Build timeout
  - **Solution:** Increase build timeout in Netlify settings
- **Issue:** Function deployment errors
  - **Solution:** Check `netlify.toml` functions configuration

#### Vercel
- **Issue:** Serverless function cold starts
  - **Solution:** Consider using Edge Functions for better performance
- **Issue:** Build memory limits
  - **Solution:** Optimize build process or upgrade plan

#### Heroku
- **Issue:** Slug size too large
  - **Solution:** Add `.slugignore` file to exclude unnecessary files
- **Issue:** Static buildpack issues
  - **Solution:** Verify `static.json` configuration

## Monitoring and Health Checks

### Built-in Monitoring
The application includes built-in monitoring for:
- Core Web Vitals (LCP, FID, CLS)
- Error tracking
- Performance metrics
- Deployment health checks

### External Monitoring Setup

#### Google Analytics
1. Create a Google Analytics property
2. Add tracking ID to environment variables:
   ```
   VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
   VITE_ENABLE_ANALYTICS=true
   ```

#### Sentry Error Tracking
1. Create a Sentry project
2. Add DSN to environment variables:
   ```
   VITE_SENTRY_DSN=your_sentry_dsn
   VITE_ENABLE_ERROR_TRACKING=true
   ```

#### Lighthouse CI
Automated performance monitoring is set up in GitHub Actions:
- Runs on every deployment
- Tracks Core Web Vitals
- Generates performance reports

## Rollback Procedures

### Netlify
```bash
# List deployments
netlify sites:list

# Rollback to previous deployment
netlify rollback
```

### Vercel
```bash
# List deployments
vercel ls

# Promote previous deployment
vercel promote [deployment-url]
```

### Heroku
```bash
# List releases
heroku releases

# Rollback to previous release
heroku rollback v[version-number]
```

## Security Considerations

### Content Security Policy
The application includes security headers in deployment configurations:
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `X-Content-Type-Options: nosniff`

### Environment Variables
- Never commit sensitive data to version control
- Use platform-specific environment variable management
- Rotate API keys regularly

## Performance Optimization

### Bundle Optimization
- Code splitting is configured for vendor libraries
- Lazy loading for non-critical components
- Tree shaking for unused code elimination

### Asset Optimization
- Images are optimized with WebP format support
- CSS is minified and purged
- JavaScript is minified with Terser

### Caching Strategy
- Static assets have long-term caching headers
- HTML files have short-term caching
- Service worker for offline functionality (if enabled)

## Support

For deployment issues:
1. Check this troubleshooting guide
2. Review platform-specific documentation
3. Check GitHub Actions logs for CI/CD issues
4. Contact the development team

## Validation Checklist

Before deploying to production:

- [ ] All tests pass (`npm run test:run`)
- [ ] Build completes successfully (`npm run build`)
- [ ] Deployment validation passes (`npm run validate:deployment`)
- [ ] Case sensitivity check passes (`npm run validate:case-sensitivity`)
- [ ] Environment variables are configured
- [ ] Monitoring is set up
- [ ] Performance metrics are within acceptable ranges
- [ ] Accessibility standards are met
- [ ] Security headers are configured