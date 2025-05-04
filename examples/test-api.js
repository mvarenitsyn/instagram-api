/**
 * Test script for the Instagram API
 * 
 * This script demonstrates how to use the Instagram API for:
 * 1. Posting comments on Instagram posts
 * 2. Liking Instagram posts
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

// Configuration
const API_URL = 'http://localhost:3000/api/instagram';
const COOKIE_PATH = path.resolve(__dirname, '../cookies/igcookie.json');
const POST_URL = 'https://www.instagram.com/p/CzVhc8WsLY6/';
const COMMENT_TEXT = 'Great post! Testing the Instagram API 🚀';

/**
 * Test posting a comment to an Instagram post
 */
async function testPostComment() {
    try {
        // Verify cookie file exists
        if (!fs.existsSync(COOKIE_PATH)) {
            console.error('Cookie file not found at:', COOKIE_PATH);
            console.error('Please place your Instagram cookie file at:', COOKIE_PATH);
            return;
        }

        // Create form data for the API request
        const formData = new FormData();
        formData.append('cookie', fs.createReadStream(COOKIE_PATH));
        formData.append('postUrl', POST_URL);
        formData.append('comment', COMMENT_TEXT);
        // Optional: Add postId to prevent duplicate comments on the same post
        // formData.append('postId', 'unique-post-id-123'); 
        formData.append('headless', 'false');  // Set to false to see the browser for testing

        console.log('Sending request to post comment on:', POST_URL);
        console.log('Comment text:', COMMENT_TEXT);

        // Make the API request
        const response = await axios.post(`${API_URL}/post-comment`, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        console.log('API Response:', response.data);
        console.log('Comment posted successfully!');
    } catch (error) {
        console.error('Error posting comment:');
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Server response:', error.response.data);
            console.error('Status code:', error.response.status);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Request error:', error.message);
        }
    }
}

/**
 * Test liking an Instagram post
 */
async function testLikePost() {
    try {
        // Verify cookie file exists
        if (!fs.existsSync(COOKIE_PATH)) {
            console.error('Cookie file not found at:', COOKIE_PATH);
            console.error('Please place your Instagram cookie file at:', COOKIE_PATH);
            return;
        }

        // Create form data for the API request
        const formData = new FormData();
        formData.append('cookie', fs.createReadStream(COOKIE_PATH));
        formData.append('postUrl', POST_URL);
        formData.append('headless', 'false');  // Set to false to see the browser for testing

        console.log('Sending request to like post:', POST_URL);

        // Make the API request
        const response = await axios.post(`${API_URL}/like-post`, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        console.log('API Response:', response.data);
        console.log('Post liked successfully!');
    } catch (error) {
        console.error('Error liking post:');
        if (error.response) {
            console.error('Server response:', error.response.data);
            console.error('Status code:', error.response.status);
        } else if (error.request) {
            console.error('No response received from server');
        } else {
            console.error('Request error:', error.message);
        }
    }
}

// Create cookies directory if it doesn't exist
const cookiesDir = path.dirname(COOKIE_PATH);
if (!fs.existsSync(cookiesDir)) {
    fs.mkdirSync(cookiesDir, { recursive: true });
    console.log(`Created cookies directory at: ${cookiesDir}`);
    console.log(`Please place your Instagram cookie file (igcookie.json) in this directory`);
}

// Display test options
console.log('\nInstagram API Test Script');
console.log('=======================');
console.log('1. Post a comment');
console.log('2. Like a post');
console.log('\nTo run a test, update the configuration in this file and then run:');
console.log('node test-api.js comment  # To test posting a comment');
console.log('node test-api.js like     # To test liking a post');

// Run the appropriate test based on command line argument
const testType = process.argv[2]?.toLowerCase();
if (testType === 'comment') {
    testPostComment();
} else if (testType === 'like') {
    testLikePost();
} else if (process.argv.length > 2) {
    console.error('Invalid test type. Use "comment" or "like"');
}