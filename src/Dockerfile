FROM node:16-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application source
COPY ./scripts/ .

# Run the cron task script
CMD ["node", "cronTask.js"]
