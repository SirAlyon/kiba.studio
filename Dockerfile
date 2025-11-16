FROM node:18-alpine

WORKDIR /app

# Copia package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copia il resto
COPY . .

# Expose port
EXPOSE 3000

# Start dev server
CMD ["npm", "run", "dev:original"]