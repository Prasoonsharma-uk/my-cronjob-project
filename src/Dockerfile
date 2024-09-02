# Use an official Node runtime as a parent image
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code and scripts to the working directory
COPY ./scripts/ /app/scripts

# Run the cron task script
CMD ["node", "scripts/cronTask.js"]
