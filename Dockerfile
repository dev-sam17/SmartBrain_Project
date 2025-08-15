FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY facerecognitionbrain/package*.json ./frontend/
COPY server/package*.json ./

# Install dependencies
RUN cd frontend && npm install
RUN npm install

# Copy source code
COPY facerecognitionbrain/ ./frontend/
COPY server/ ./

# Build React app
RUN cd frontend && npm run build

# Move build to server directory
RUN mv frontend/build ./build

# Clean up frontend files
RUN rm -rf frontend

# Expose port
EXPOSE 3001

# Start server
CMD ["node", "server.js"]
