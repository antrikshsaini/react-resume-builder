FROM node:12.22.12-alpine

WORKDIR /app

# Install build tools and Python for compiling node-sass
RUN apk add --no-cache \
  python3 \
  make \
  g++ \
  libc6-compat

# Install dependencies from package.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Rebuild node-sass to ensure compatibility with Alpine
RUN npm rebuild node-sass

# Copy the application files
COPY . .

# Expose the app port
EXPOSE 3000

# Command to start the app
CMD ["npm", "start"]
