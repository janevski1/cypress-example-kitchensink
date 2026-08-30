FROM mcr.microsoft.com/playwright:v1.62.1-noble

WORKDIR /app

# Copy dependency files first for Docker layer caching.
COPY package.json package-lock.json ./

# Install dependencies exactly as locked.
RUN npm ci

# Copy the project.
COPY . .

# Application port.
EXPOSE 8080

# Run Playwright tests.
CMD ["npx", "playwright", "test"]
