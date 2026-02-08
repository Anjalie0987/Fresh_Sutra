# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy Prisma schema and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy source code
COPY . .

# Expose port (Cloud Run defaults to 8080)
ENV PORT=8080
EXPOSE 8080

# Start the server
CMD ["npm", "start"]
