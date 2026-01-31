# 1. Use Node 20 (Compatible with latest Prisma)
FROM node:20-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package files first (for better caching)
COPY package*.json ./
COPY prisma ./prisma/

# 4. Install dependencies
RUN npm ci

# 5. Generate Prisma Client (Critical step!)
RUN npx prisma generate

# 6. Copy the rest of your backend code
COPY . .

# 7. Use the PORT environment variable (Google Cloud sets this automatically)
ENV PORT=8080
EXPOSE 8080

# 8. Start the server
CMD ["node", "index.js"]