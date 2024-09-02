# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code and scripts to the working directory
COPY scripts/ ./scripts/

# Run the cron task script
CMD ["node", "scripts/cronTask.js"]
