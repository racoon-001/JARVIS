# Stage 1: Build JARVIS
FROM node:22-bookworm AS builder

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install native build dependencies
RUN apt-get update && apt-get install -y python3 make g++ \
    && rm -rf /var/lib/apt/lists/*


# Install dependencies
RUN npm ci

# Copy TypeScript configuration and source code
COPY tsconfig.json ./
COPY src ./src

# Compile TypeScript → JavaScript
RUN npm run build


# Stage 2: Production image
FROM node:22-bookworm-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install native build dependencies
RUN apt-get update && apt-get install -y python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

# Install production dependencies only
RUN npm ci --omit=dev

# Copy compiled application
COPY --from=builder /app/dist ./dist

# Start JARVIS
CMD ["node", "dist/index.js"]