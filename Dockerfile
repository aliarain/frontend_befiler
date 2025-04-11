# Use Ubuntu 20.04 base image (which supports libssl1.1)
FROM ubuntu:20.04

# Install required dependencies, including libssl1.1
RUN apt update && apt install -y curl gnupg2 libssl1.1

# Install Node.js (use LTS version, Node 18)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt install -y nodejs

# Install Yarn globally
RUN npm install -g yarn

# Install PM2 globally
RUN yarn global add pm2

# Set the working directory
WORKDIR /app

# Copy project files to the container
COPY . /app

# Install project dependencies using Yarn
RUN yarn install

# Build the Next.js project
RUN yarn build

# Expose the application port
EXPOSE 3000

# Start the Next.js application with PM2 in production mode
CMD ["pm2-runtime", "start", "yarn", "--name", "live-taxstick-frontend", "--", "start"]
