# Use an official Node runtime as a parent image
FROM node:22

# Set the working directory
WORKDIR /portfolio-app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code and other necessary files
COPY ./src ./src

RUN npm install typescript

# Copy tsconfig.json
COPY ./tsconfig.json ./

# Compile TypeScript code
RUN npx tsc 

# Expose the port the app runs on (optional, depends on your app)
EXPOSE 3000

# Define the command to run the app (optional, depends on your app)
CMD ["node", "./dist/main.js"] 