# Multi-stage build for React app
FROM node:18-alpine AS frontend-build

# Set working directory for frontend
WORKDIR /app/frontend

# Copy frontend package files
COPY facerecognitionbrain/package*.json ./

# Install frontend dependencies
RUN npm ci --only=production

# Copy frontend source code
COPY facerecognitionbrain/ ./

# Build the React app
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Copy server package files
COPY server/package*.json ./

# Install server dependencies
RUN npm ci --only=production

# Copy server source code
COPY server/ ./

# Copy built React app from frontend-build stage
COPY --from=frontend-build /app/frontend/build ./build

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S smartbrain -u 1001

# Change ownership of the app directory
RUN chown -R smartbrain:nodejs /app
USER smartbrain

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/api', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the server
CMD ["node", "server.js"]
