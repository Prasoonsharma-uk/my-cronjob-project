# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application source
# Since the Dockerfile is in the 'src' folder, and 'scripts' is relative to it,
# you just need to copy it directly.
COPY scripts/ ./scripts/

# Run the cron task script
CMD ["node", "scripts/cronTask.js"]
