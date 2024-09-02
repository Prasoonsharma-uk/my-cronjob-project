# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY src/package*.json ./

# Install dependencies
RUN npm install

# Copy the application source code
COPY . .

# Run the cron task script
CMD ["node", "cronTask.js"]
