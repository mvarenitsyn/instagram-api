const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const instagramRoutes = require('./routes/instagram.routes');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Create cookies directory if it doesn't exist
const cookiesDir = path.join(__dirname, '../cookies');
if (!fs.existsSync(cookiesDir)) {
    fs.mkdirSync(cookiesDir, { recursive: true });
}

// If INSTAGRAM_COOKIE environment variable is set, create a cookie file from it
if (process.env.INSTAGRAM_COOKIE) {
    try {
        // Validate that it's valid JSON
        JSON.parse(process.env.INSTAGRAM_COOKIE);
        
        // Write the cookie to a file
        const cookiePath = path.join(cookiesDir, 'igcookie.json');
        fs.writeFileSync(cookiePath, process.env.INSTAGRAM_COOKIE);
        console.log('Created cookie file from environment variable');
    } catch (error) {
        console.error('Error creating cookie file from environment variable:', error.message);
    }
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/instagram', instagramRoutes);

// Base route
app.get('/', (req, res) => {
    res.json({
        message: 'Instagram API Server',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        endpoints: {
            instagram: {
                postComment: '/api/instagram/post-comment',
                likePost: '/api/instagram/like-post'
            }
        }
    });
});

// Health check endpoint for Railway
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API is available at http://localhost:${PORT}/api/instagram`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;