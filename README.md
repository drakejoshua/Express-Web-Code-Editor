# CodeBloks - Express Web Code Editor

A fullstack application for creating, editing, and sharing code within a modern web interface.

## Quick Navigation
- [About](#about)
- [Features](#features)
- [API Documentation](#api-documentation)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Contributing](#contributing)

**[View Live Demo](#)**

## About

CodeBloks is a web-based code editor that enables users to create, edit, customize, and share code blocks. Built with Express.js backend and React frontend, it provides an intuitive interface for managing code snippets with cloud storage integration.

## Key Features

- 🎨 **Interactive Code Editor** - Real-time code editing with syntax highlighting in the browser
- ⌨️ **Editor Shortcuts** - Keyboard shortcuts for faster coding in the editor
- 📦 **Create Bloks From Templates** - Create starter code from quick boilerplates
- 🗂️ **User Blok Management** - Users can create, fetch, edit, and delete their code bloks
- 🔐 **User Authentication** - Secure sign-up, sign-in, google auth, and magic link authentication with email verification and password reset notifications via email
- ☁️ **Cloud Storage** - Image uploads via Cloudinary integration
- 🎯 **Public API** - Public endpoints for accessing code blocks using an api
- 🌙 **Theme Support** - Light/dark mode toggle
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🔌 **Code Export** - Export code snippets from editor in .zip folder
- 👁️ **Live Preview** - Real-time preview of code output within the editor in a new tab
- 🔗 **Share Links** - Shareable links for easy code sharing for embedding iframes and social media

## API Documentation

For those looking to integrate and build on top of CodeBloks, here is the API documentation.

### General Information

**Base URL:** `to be disclosed upon deployment`

**Rate Limiting:** 100 requests per 15 minutes per IP

### Authentication

Include your API key in the request header for all public endpoints:
```
X-API-Key: your_api_key_here
```

**Generating API Keys:** Sign in to your dashboard and navigate to Settings → API Key to generate a new key.

### Public Endpoints

#### `GET /bloks`
Retrieve paginated list of code blocks created by the authenticated user using their API key with filtering options.

**Query Parameters:**
- `limit` (number, optional) - Number of results (default: 10, max: 100)
- `filter` (string, optional) - Search by blok name

**Success Response:**
```json
{
    "status": "success",
    "data": {
        "bloks": [
            {
                "id": "[ blok id ]",
                "name": "[ name of the blok ]",
                "user_id": "[ user id that created the blok ]",
                "html": "...",
                "css": "...",
                "javascript": "...",
                "settings": {
                    "theme": "[ valid monaco theme ]",
                    "font_size": 14,
                    "auto_complete": true,
                    "tab_size": 2,
                    "editor_layout": "[ top | left | right ]"
                }
            }
        ],
        "totalBloks": 150
    }
}
```


#### `GET /blok/:id`
Retrieve a specific code blok by ID.

**Parameters:**
- `id` (string, required) - Blok ID

**Success Response:**
```json
{
    "success": true,
    "data": {
        "blok": {
            "id": "[ blok id ]",
            "name": "[ name of the blok ]",
            "user_id": "[ user id that created the blok ]",
            "html": "...",
            "css": "...",
            "javascript": "...",
            "settings": {
                "theme": "[ valid monaco theme ]",
                "font_size": 14,
                "auto_complete": true,
                "tab_size": 2,
                "editor_layout": "[ top | left | right ]"
            }
        }
    }
}
```

#### General Error Response

All endpoints return errors in the following format:

```json
{
    "status": "error",
    "error": {
        "message": "[ error message here ]",
        "code": "[ error code here ]"
    }
}
```


## Frontend Setup

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
VITE_FRONTEND_URL= your frontend url here
VITE_BACKEND_URL= your backend url here
VITE_APP_ID= your backend app id here ( same as APP_ID in backend .env )
```

4. Start the development server:
```bash
npm run dev
```

## Backend Setup

### Prerequisites
- Node.js 16+
- MongoDB
- Cloudinary account
- Resend Account for email services
- Google OAuth credentials

### Installation

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
# mongodb connection string
MONGO_URI= your mongodb connection string here

# app identifier for authenticating requests specific to this app
APP_ID= app_id for authentication/communication between frontend and backend

# cloudinary config variables
CLOUDINARY_CLOUD_NAME= your cloudinary cloud name here
CLOUDINARY_API_KEY= your cloudinary api key here
CLOUDINARY_API_SECRET= your cloudinary api secret here
CLOUDINARY_URL= your cloudinary url here

# jwt config variables
JWT_SECRET= your jwt secret here
JWT_ACCESS_TOKEN_EXPIRY=30m
JWT_REFRESH_TOKEN_EXPIRY=7d

# resend email SDK api-key
RESEND_API_KEY= your resend api key here

# bcrypt encryption rounds
BCRYPT_ROUNDS=10

# frontend url
FRONTEND_URL= your frontend url here

# production mode
NODE_ENV=development

# google oauth credentials
GOOGLE_CLIENT_ID= your google client id here
GOOGLE_CLIENT_SECRET= your google client secret here
GOOGLE_CALLBACK_URL= your google callback url here
```

4. Start the server:
```bash
npm start
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Provisional Information

**Author:** [ Joshua Mabawonku ]  
**License:** Free for personal and commercial use  
**Repository:** [https://github.com/drakejoshua/Express-Web-Code-Editor]  

For questions or support, please contact us me on twitter @joshua_mabb or via email
