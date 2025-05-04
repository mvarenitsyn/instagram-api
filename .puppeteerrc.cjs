/**
 * Puppeteer configuration file for Railway deployment
 */
const { join } = require('path');

/**
 * @type {import('puppeteer').Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
  // The executable path to use for the browser instance
  // Will use the pre-installed Chromium in Railway environment
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  // Additional browser args to use
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu',
    '--disable-extensions',
    '--no-first-run',
    '--no-zygote',
    '--single-process',
  ],
};