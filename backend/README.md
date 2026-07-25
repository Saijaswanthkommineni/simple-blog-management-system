# Express.js Backend Server

A production-ready Express.js backend server with clean architecture, security middleware, and RESTful API endpoints.

## Features

- ✅ Express.js with modular architecture
- ✅ CORS enabled
- ✅ Helmet for security headers
- ✅ Morgan for request logging
- ✅ Environment variable configuration
- ✅ Error handling middleware
- ✅ 404 handler for unknown routes
- ✅ RESTful API endpoints
- ✅ Production-ready structure

## Project Structure

```
backend/
│
├── src/
│   ├── routes/
│   │   └── api.routes.js      # API route definitions
│   ├── controllers/
│   │   └── api.controller.js  # Business logic
│   ├── middleware/
│   │   └── errorHandler.js    # Error handling middleware
│   ├── config/
│   ├── app.js                 # Express app configuration
│   └── server.js              # Server entry point
│
├── .env                       # Environment variables
├── package.json               # Dependencies and scripts
└── README.md                  # Documentation
```

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
The `.env` file is already configured with:
```
PORT=5000
NODE_ENV=development
```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### GET /
Root endpoint to verify server is running.

**Response:**
```json
{
  "success": true,
  "message": "Backend server is running successfully."
}
```

**Example:**
```bash
curl http://localhost:5000/
```

### GET /api
API root endpoint.

**Response:**
```json
{
  "success": true,
  "message": "Backend server is running successfully."
}
```

**Example:**
```bash
curl http://localhost:5000/api
```

### GET /api/health
Health check endpoint to monitor server status.

**Response:**
```json
{
  "status": "OK",
  "uptime": 123.456,
  "timestamp": "2026-07-25T17:30:00.000Z"
}
```

**Example:**
```bash
curl http://localhost:5000/api/health
```

### POST /api/test
Test POST endpoint to accept JSON data.

**Request:**
```json
{
  "name": "John"
}
```

**Response:**
```json
{
  "success": true,
  "message": "POST request received.",
  "data": {
    "name": "John"
  }
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/test \
  -H "Content-Type: application/json" \
  -d '{"name": "John"}'
```

**Error Response (No body):**
```json
{
  "success": false,
  "message": "Request body is required."
}
```

### 404 Not Found
Any unknown route will return a 404 error.

**Response:**
```json
{
  "success": false,
  "message": "Route not found."
}
```

**Example:**
```bash
curl http://localhost:5000/api/unknown
```

## Error Handling

The server includes comprehensive error handling:
- Global error handler middleware
- 404 handler for unknown routes
- Consistent JSON error responses
- Stack traces in development mode

## Security Features

- **Helmet**: Sets security-related HTTP headers
- **CORS**: Enables Cross-Origin Resource Sharing
- **JSON Parsing**: Safely parses JSON request bodies
- **URL Encoding**: Handles URL-encoded data

## Dependencies

- `express` - Web framework
- `cors` - CORS middleware
- `dotenv` - Environment variable management
- `morgan` - HTTP request logger
- `helmet` - Security middleware
- `nodemon` - Development auto-reload (dev dependency)

## Future Extensions

This backend is designed to be easily extended with:
- Authentication (JWT, OAuth)
- Database integration (MongoDB, PostgreSQL)
- Additional API routes
- Rate limiting
- File upload handling
- WebSocket support
- API documentation (Swagger/OpenAPI)

## Validation Checklist

- ✅ Server starts successfully
- ✅ GET / returns success message
- ✅ GET /api/health returns server status
- ✅ POST /api/test accepts JSON data
- ✅ Invalid routes return 404
- ✅ Invalid POST body returns 400
- ✅ No runtime errors
- ✅ Backend is ready for future authentication and database integration

## License

MIT
