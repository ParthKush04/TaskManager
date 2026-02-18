const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./docs/swagger");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/v1/tasks", taskRoutes);

// Versioned API
app.use("/api/v1/auth", authRoutes);
app.use(errorHandler);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/v1/admin", adminRoutes);

module.exports = app;
