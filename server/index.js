/**
 * Hardened Express server for Eagle's Nest Tabernacle
 *
 * Features:
 *  - dotenv for environment
 *  - helmet for security headers
 *  - compression for responses
 *  - express-rate-limit for basic rate limiting
 *  - pino + pino-http for structured logging
 *  - CORS (configurable via env)
 *  - Postgres pool (pg) with optional SSL config for managed DBs
 *  - startup DB readiness checks with retries
 *  - /ping health endpoint and /db check endpoint
 *  - graceful shutdown (SIGINT, SIGTERM)
 *
 * NOTE:
 *  - This file introduces new dependencies: helmet, compression, express-rate-limit, pino, pino-http.
 *    Add them to server/package.json and run `npm ci` or `npm install` before deploying.
 */

require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const pino = require("pino");
const pinoHttp = require("pino-http");
const cors = require("cors");
const { Pool } = require("pg");

let logger;
if (process.env.NODE_ENV !== "production") {
  // In non-production, use a pino transport to pretty-print logs via pino-pretty.
  // This avoids the removed `prettyPrint` option and is supported in modern pino versions.
  logger = pino(
    { level: process.env.LOG_LEVEL || "debug" },
    pino.transport({
      target: "pino-pretty",
      options: {
        colorize: true,
        singleLine: false,
        translateTime: "SYS:standard",
      },
    }),
  );
} else {
  // Production: structured JSON logs at info level by default
  logger = pino({ level: process.env.LOG_LEVEL || "info" });
}

const app = express();

// Basic middleware
app.use(helmet());
app.use(compression());

// Never allow an unrestricted production CORS policy.
const corsOrigin =
  process.env.CORS_ORIGIN ||
  (process.env.NODE_ENV === "production" ? false : "http://localhost:8080");
app.use(
  cors({
    origin: corsOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

app.use(express.json());
app.use(pinoHttp({ logger }));

// Basic rate limiting - adjust to your needs
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000", 10), // default 1 minute
  max: parseInt(process.env.RATE_LIMIT_MAX || "120", 10), // default 120 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Validate some environment variables (recommendation rather than hard fail)
const recommendedEnv = ["PORT"];
const missingRecommended = recommendedEnv.filter((k) => !process.env[k]);
if (missingRecommended.length) {
  logger.warn(
    { missing: missingRecommended },
    "Recommended environment variables are missing",
  );
}

// Configure PostgreSQL pool
const poolConfig = {
  connectionString: process.env.DATABASE_URL || undefined,
  user: process.env.POSTGRES_USER,
  host:
    process.env.POSTGRES_HOST || process.env.POSTGRES_HOSTNAME || "postgres",
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT
    ? parseInt(process.env.POSTGRES_PORT, 10)
    : 5432,
  idleTimeoutMillis: process.env.PG_IDLE_TIMEOUT
    ? parseInt(process.env.PG_IDLE_TIMEOUT, 10)
    : 30000,
  max: process.env.PG_MAX_CLIENTS
    ? parseInt(process.env.PG_MAX_CLIENTS, 10)
    : 10,
};

// Managed DBs often require SSL; enable if env flags present.
// If using DATABASE_URL from providers (Heroku, Supabase), check provider docs for SSL config.
if (process.env.DB_SSL === "true" || process.env.PGSSLMODE === "require") {
  poolConfig.ssl = { rejectUnauthorized: false };
}

const pool = new Pool(poolConfig);

pool.on("error", (err) => {
  logger.error({ err }, "Unexpected error on idle PostgreSQL client");
});

// Wait for DB readiness with retries (useful in container orchestration)
async function waitForDb(maxAttempts = 10, delayMs = 3000) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const r = await pool.query("SELECT NOW()");
      logger.info({ now: r.rows[0] }, "Database connected");
      return true;
    } catch (e) {
      logger.warn(
        { attempt, message: e && e.message ? e.message : String(e) },
        "DB connect attempt failed",
      );
      if (attempt === maxAttempts) {
        logger.error(
          "Max DB connection attempts reached; continuing without a DB connection",
        );
        return false;
      }
      await new Promise((res) => setTimeout(res, delayMs));
    }
  }
  return false;
}

// Track readiness state for orchestrators / load balancers
let ready = false;

(async () => {
  const ok = await waitForDb(
    process.env.DB_MAX_ATTEMPTS
      ? parseInt(process.env.DB_MAX_ATTEMPTS, 10)
      : 12,
    process.env.DB_RETRY_DELAY_MS
      ? parseInt(process.env.DB_RETRY_DELAY_MS, 10)
      : 3000,
  );
  ready = ok;
})();

// Simple health endpoints
app.get("/ping", (req, res) => {
  res.json({ status: "ok", ts: new Date().toISOString() });
});

// Readiness probe - returns 200 only when DB checks succeeded
app.get("/ready", async (req, res) => {
  if (!ready) {
    return res.status(503).json({ ready: false });
  }
  return res.json({ ready: true });
});

// DB test endpoint (safe, no sensitive data)
app.get("/db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    return res.json({ now: result.rows[0] });
  } catch (err) {
    logger.error({ err }, "DB query error");
    return res.status(500).json({
      error: "Database error",
      details: err && err.message ? err.message : String(err),
    });
  }
});

// Example: limit what is exposed in production (you can add routing and authentication here)
// Keep a root informational endpoint minimal
app.get("/", (req, res) => {
  res.json({
    app: "Eagle's Nest Tabernacle - API",
    env: process.env.NODE_ENV || "development",
    uptime: process.uptime(),
  });
});

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
const server = app.listen(port, () => {
  logger.info({ port }, "ETM server started");
});

// Graceful shutdown
let shuttingDown = false;
async function shutdown(signal) {
  if (shuttingDown) {
    logger.warn("Shutdown already in progress, ignoring additional signal");
    return;
  }
  shuttingDown = true;
  logger.info({ signal }, "Received shutdown signal, closing server...");
  // Stop accepting new connections
  server.close(async (err) => {
    if (err) {
      logger.error({ err }, "Error closing server");
      process.exit(1);
    }
    try {
      logger.info("Draining DB pool...");
      await pool.end();
      logger.info("DB pool drained, exiting");
      process.exit(0);
    } catch (e) {
      logger.error({ err: e }, "Error shutting down DB pool");
      process.exit(1);
    }
  });

  // Force exit if graceful shutdown takes too long
  const forceTimeout = parseInt(
    process.env.SHUTDOWN_FORCE_TIMEOUT_MS || "30000",
    10,
  );
  setTimeout(() => {
    logger.warn("Forcing shutdown after timeout");
    process.exit(1);
  }, forceTimeout).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

// Export for testing (if needed)
module.exports = { app, server, pool };
