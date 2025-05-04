# Instagram API

A lightweight API for automated Instagram interactions using Puppeteer. This API provides endpoints for posting comments and liking posts on Instagram.

## Features

- 📝 Post comments on Instagram posts
- ❤️ Like Instagram posts
- 🔑 Uses your Instagram cookie file for authentication
- 🔄 Prevents duplicate comments (optional)
- 👀 Option to run in visible or headless browser mode

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mvarenitsyn/instagram-api.git
cd instagram-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a cookies directory and add your Instagram cookie file:
```bash
mkdir -p cookies
# Place your igcookie.json file in the cookies directory
```

## Usage

### Start the API server

```bash
npm start
```

The server will start on port 3000 by default. You can change this by setting the `PORT` environment variable.

### API Endpoints

#### Post a comment on an Instagram post

```
POST /api/instagram/post-comment
```

**Parameters (form-data):**
- `postUrl` (required): URL of the Instagram post to comment on
- `comment` (required): Text of the comment to post
- `cookie` (required): Instagram cookie file (JSON format)
- `postId` (optional): Unique ID to prevent duplicate comments
- `headless` (optional): Whether to run browser in headless mode (default: true)

**Example response:**
```json
{
  "success": true,
  "message": "Comment posted successfully",
  "postUrl": "https://www.instagram.com/p/CzVhc8WsLY6/"
}
```

#### Like an Instagram post

```
POST /api/instagram/like-post
```

**Parameters (form-data):**
- `postUrl` (required): URL of the Instagram post to like
- `cookie` (required): Instagram cookie file (JSON format)
- `headless` (optional): Whether to run browser in headless mode (default: true)

**Example response:**
```json
{
  "success": true,
  "message": "Post liked successfully",
  "postUrl": "https://www.instagram.com/p/CzVhc8WsLY6/"
}
```

## Example Code

See the `examples` directory for sample code demonstrating how to use the API.

To test the API:

```bash
# Make sure the server is running first
npm start

# In another terminal, run:
node examples/test-api.js comment  # To test posting a comment
node examples/test-api.js like     # To test liking a post
```

## Cookie File

You need to obtain your Instagram cookie file to use this API. The cookie file should be a JSON array of cookie objects.

## Security Considerations

- This API is intended for personal use only
- Do not expose this API publicly without proper authentication
- Use responsibly and respect Instagram's terms of service
- Consider rate limiting to avoid getting your account flagged

## License

MIT