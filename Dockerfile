# Use Node.js 20 as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json .
COPY package-lock.json .

# Install the dependencies
RUN npm ci --production

# Copy the rest of the application files to the container
COPY . .

# Expose the desired port (replace <PORT_NUMBER> with the appropriate port)
EXPOSE 3000

# Start the application
CMD ["sh", "-c", "source .env && npm start"]
