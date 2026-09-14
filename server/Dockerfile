# Production-ready Dockerfile for the small Node/Express server.
# - Multi-stage for smaller final image
# - Uses a non-root user
# - Installs only production deps with npm ci
# - Adds minimal utilities (curl) for healthcheck
# - Uses tini as PID 1 for proper signal handling
#
# NOTE: keep this file next to server/index.js and package*.json

#####################################
# Base image with common setup
#####################################
FROM node:20-alpine AS base

# Set working dir
WORKDIR /usr/src/app

# Runtime environment
ENV NODE_ENV=production
ENV PORT=4000

# Install tiny utilities and tini (for proper reaping of children / signal handling)
# Also install ca-certificates to ensure TLS works for outgoing requests
RUN apk add --no-cache tini ca-certificates curl && \
    addgroup -S appgroup && adduser -S appuser -G appgroup

# Expose port (documentation only; binding happens at runtime)
EXPOSE 4000

#####################################
# Dependencies stage
#####################################
FROM base AS deps

# Copy package manifests
COPY package.json package-lock.json ./

# Install production dependencies reproducibly
RUN npm ci --production --no-optional --no-audit --silent

#####################################
# Final release image
#####################################
FROM base AS release

# Copy only production node_modules from deps stage
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Copy application files
# Be explicit about copying only what you need for the runtime
COPY . .

# Drop privileges - run as unprivileged user
USER appuser

# Lightweight healthcheck to ensure container is healthy after start
# Uses curl which is provided in the base image installation above
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:${PORT:-4000}/ping || exit 1

# Use tini as the init process to handle signals properly
ENTRYPOINT ["/sbin/tini", "--"]

# Start the server
CMD ["node", "index.js"]
