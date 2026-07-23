const pool = require("../config/db");

async function getMedicines(req, res) {
  try {
    const result = await pool.query(
      "SELECT * FROM medicines ORDER BY id ASC"
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Failed to fetch medicines",
    });
  }
}

async function addMedicine(req, res) {
  try {
    const {
      name,
      category,
      price,
      quantity,
      expiry,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO medicines
      (name, category, price, quantity, expiry)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        name,
        category,
        price,
        quantity,
        expiry,
      ]
    );

    res.status(201).json({
      message: "Medicine added successfully",
      medicine: result.rows[0],
    });

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Failed to add medicine",
    });
  }
}
async function updateMedicine(req, res) {
  try {
    const { id } = req.params;

    const {
      name,
      category,
      price,
      quantity,
      expiry,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE medicines
      SET
        name = $1,
        category = $2,
        price = $3,
        quantity = $4,
        expiry = $5
      WHERE id = $6
      RETURNING *
      `,
      [
        name,
        category,
        price,
        quantity,
        expiry,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    res.json({
      message: "Medicine updated successfully",
      medicine: result.rows[0],
    });

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Failed to update medicine",
    });
  }
}


async function deleteMedicine(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM medicines
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    res.json({
      message: "Medicine deleted successfully",
    });

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Failed to delete medicine",
    });
  }
}

module.exports = {
  getMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
};