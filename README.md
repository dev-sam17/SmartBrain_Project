# 🧠 SmartBrain - AI Face Detection App

A full-stack web application that uses artificial intelligence to detect faces in images. Built with React.js frontend, Node.js/Express backend, and powered by Clarifai's face detection API.

![SmartBrain Demo](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

## 🌟 Features

- **AI-Powered Face Detection**: Detect multiple faces in uploaded images or URLs
- **Real-time Processing**: Instant face detection with visual bounding boxes
- **File Upload Support**: Upload images directly or provide image URLs
- **Image Compression**: Automatic optimization for large images (5MB+ handling)
- **User Authentication**: Firebase-based sign up/sign in system
- **Responsive Design**: Modern UI with animated particle backgrounds
- **Glass-morphism Effects**: Beautiful gradient animations and modern styling
- **RESTful API**: Clean backend architecture with Express.js

## 🚀 Live Demo

The application serves both frontend and backend on a single port for easy deployment.

## 🛠️ Technology Stack

### Frontend
- **React.js** (18.2.0) - UI framework
- **React Router** - Client-side routing
- **Firebase** - Authentication
- **OGL** - WebGL particles background
- **Tachyons** - CSS framework

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Clarifai API** - AI face detection
- **CORS** - Cross-origin resource sharing
- **Body-parser** - Request parsing

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Multi-stage builds** - Optimized production images

## 📁 Project Structure

```
SmartBrain_Project/
├── facerecognitionbrain/          # React frontend
│   ├── src/
│   │   ├── components/            # Reusable components
│   │   ├── routes/               # Page components
│   │   ├── contexts/             # React contexts
│   │   └── utils/                # Utility functions
│   ├── public/                   # Static assets
│   └── build/                    # Production build
├── server/                       # Express backend
│   ├── server.js                 # Main server file
│   ├── package.json             # Server dependencies
│   └── .env                     # Environment variables
├── docker-compose.yml           # Production Docker setup
├── docker-compose.dev.yml       # Development Docker setup
├── Dockerfile                   # Production container
└── package.json                # Root project scripts
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Clarifai API account

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/dev-sam17/SmartBrain_Project.git
   cd SmartBrain_Project
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   Create `.env` file in the `server/` directory:
   ```env
   CLARIFAI_USER_ID=your_user_id
   CLARIFAI_APP_ID=your_app_id
   CLARIFAI_PAT=your_personal_access_token
   CLARIFAI_MODEL_ID=face-detection
   ```

4. **Run in development mode**
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

5. **Build and run production**
   ```bash
   npm run build-and-start
   ```
   - Full app: http://localhost:3001

## 🐳 Docker Setup

### Production Deployment

1. **Using Docker Compose (Recommended)**
   ```bash
   docker-compose up --build -d
   ```

2. **Using Docker directly**
   ```bash
   docker build -t smartbrain .
   docker run -p 3001:3001 --env-file server/.env smartbrain
   ```

### Development with Docker

```bash
docker-compose -f docker-compose.dev.yml up --build
```

This runs frontend and backend in separate containers with hot reload.

## 📚 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api` | Get all users |
| GET | `/api/profile/:id` | Get user profile |
| POST | `/api/signin` | User authentication |
| POST | `/api/signup` | User registration |
| POST | `/api/imageurl` | Face detection |
| PUT | `/api/image` | Update user entry count |

### Face Detection API

**POST** `/api/imageurl`

```json
{
  "input": "image_url_or_base64_data"
}
```

**Response:**
```json
{
  "outputs": [
    {
      "data": {
        "regions": [
          {
            "region_info": {
              "bounding_box": {
                "top_row": 0.123,
                "left_col": 0.456,
                "bottom_row": 0.789,
                "right_col": 0.012
              }
            }
          }
        ]
      }
    }
  ]
}
```

## 🎨 Features in Detail

### Face Detection
- Supports both image URLs and file uploads
- Automatic image compression for files >5MB
- Real-time bounding box visualization
- Multiple face detection in single image

### User Interface
- Animated particle background using WebGL
- Glass-morphism design elements
- Responsive layout for all devices
- Loading states and error handling

### Performance Optimizations
- Image compression and resizing
- Lazy loading components
- Optimized Docker builds
- Static file serving from Express

## 🔒 Environment Variables

Required environment variables for Clarifai API:

```env
CLARIFAI_USER_ID=your_clarifai_user_id
CLARIFAI_APP_ID=your_clarifai_app_id  
CLARIFAI_PAT=your_personal_access_token
CLARIFAI_MODEL_ID=face-detection
```

## 🚀 Deployment

### Production Build
```bash
npm run build-and-start
```

### Docker Production
```bash
docker-compose up -d
```

### Health Checks
The application includes health check endpoints for monitoring:
- Container health check on `/api`
- 30-second intervals with 3 retries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run install-all` | Install dependencies for all packages |
| `npm run build` | Build React app for production |
| `npm start` | Start production server |
| `npm run dev` | Run both frontend and backend in development |
| `npm run build-and-start` | Build and start production server |

## 🐛 Troubleshooting

### Common Issues

1. **Port 3001 already in use**
   ```bash
   lsof -ti:3001 | xargs kill -9
   ```

2. **Clarifai API errors**
   - Verify environment variables
   - Check API key permissions
   - Ensure sufficient API credits

3. **Docker build fails**
   - Check Docker daemon is running
   - Verify .dockerignore excludes node_modules
   - Ensure sufficient disk space

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**dev-sam17**
- GitHub: [@dev-sam17](https://github.com/dev-sam17)

## 🙏 Acknowledgments

- [Clarifai](https://clarifai.com/) for face detection API
- [React](https://reactjs.org/) team for the amazing framework
- [Firebase](https://firebase.google.com/) for authentication services
- [OGL](https://github.com/oframe/ogl) for WebGL particle effects

---

⭐ Star this repository if you found it helpful!