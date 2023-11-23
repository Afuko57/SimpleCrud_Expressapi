// app.js
const express = require("express");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Define Swagger options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "API documentation for the Express application",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./routes/students.js","./routes/users.js"], // Replace with the path to your route files
};

// Initialize Swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
const studentsRoute = require("./routes/students");
const usersRoute = require("./routes/users");

app.use("/", studentsRoute);
app.use("/", usersRoute);

app.listen(port, () => {
  console.log(`listening on port ${port} `);
});
