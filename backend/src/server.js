const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

const app = express();

const PORT = process.env.PORT || 5000;
const authRoutes =
  require("./routes/authRoutes");
const medicineRoutes =
  require("./routes/medicineRoutes");
const saleRoutes =
  require("./routes/salesRoutes");



app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Highway Care Pharmacy API is running 🚀",
  });
});

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT NOW()"
    );

    res.json({
      message: "Database connected successfully 🎉",
      time: result.rows[0].now,
    });

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      message: "Database connection failed",
    });

  }
});

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});
app.use(
  "/api/auth",
  authRoutes
);
app.use(
  "/api/medicines",
  medicineRoutes
);
app.use(
  "/api/sales",
  saleRoutes
);
