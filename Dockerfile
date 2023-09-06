# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code into the container
COPY . .

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Set the command to start the server
CMD ["npm", "run", "start:dev"]
