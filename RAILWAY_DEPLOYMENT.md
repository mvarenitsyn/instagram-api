# Deploying to Railway

This guide will help you deploy the Instagram API to Railway.app.

## Prerequisites

1. A [Railway account](https://railway.app/)
2. A GitHub account (you're here!)
3. Your Instagram cookie file

## Deployment Steps

### Option 1: Direct from GitHub

1. Log in to [Railway](https://railway.app/)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose this repository
5. Railway will automatically detect the configuration and start the deployment

### Option 2: Using Railway CLI

1. Install the Railway CLI:
   ```bash
   npm i -g @railway/cli
   ```

2. Login to Railway:
   ```bash
   railway login
   ```

3. Clone this repository:
   ```bash
   git clone https://github.com/mvarenitsyn/instagram-api.git
   cd instagram-api
   ```

4. Link to a Railway project:
   ```bash
   railway link
   ```

5. Deploy the application:
   ```bash
   railway up
   ```

## Environment Setup

After deployment, you need to upload your Instagram cookie file. There are two ways to do this:

### 1. Using the Railway Volume Storage

1. Go to your project in the Railway dashboard
2. Navigate to the "Volumes" tab
3. Create a volume and mount it to `/app/cookies`
4. Upload your `igcookie.json` file to this volume

### 2. Using Environment Variables

1. Go to your project in the Railway dashboard
2. Navigate to the "Variables" tab
3. Add an environment variable named `INSTAGRAM_COOKIE` with the contents of your cookie file as a JSON string

## API Usage

Once deployed, your API will be available at the URL provided by Railway. You can use it with the same endpoints as described in the README:

- `POST /api/instagram/post-comment` - Post a comment on an Instagram post
- `POST /api/instagram/like-post` - Like an Instagram post

## Common Issues

### Puppeteer on Railway

The default configuration handles Puppeteer dependencies in Railway's environment. If you encounter issues with Puppeteer, you may need to customize the Nixpacks configuration.

### Cookie Management

Ensure your cookie file is properly loaded. The application checks for cookies in the `/app/cookies` directory by default.

## Monitoring

Railway provides logs and metrics for your deployment. Use them to troubleshoot any issues:

1. Go to your project in the Railway dashboard
2. Click on your service
3. Navigate to the "Logs" tab to see application logs

## Scaling

Railway allows you to scale your application as needed:

1. Go to your project settings
2. Adjust CPU and RAM allocations based on your needs

Remember that Puppeteer is resource-intensive, so allocate sufficient memory for smooth operation.