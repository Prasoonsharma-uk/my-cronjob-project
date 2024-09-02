# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# List files to debug
RUN ls -la

# Install dependencies
RUN npm install

# Copy the application source code
COPY . .

# Run the cron task script
CMD ["node", "cronTask.js"]
