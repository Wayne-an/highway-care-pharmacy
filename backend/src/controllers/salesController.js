const pool = require("../config/db");

async function createSale(req, res) {
  const client = await pool.connect();

  try {
    const {
      items,
      paymentMethod,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Sale must contain at least one medicine",
      });
    }

    await client.query("BEGIN");

    const total = items.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );

    const saleResult = await client.query(
      `
      INSERT INTO sales
      (total, payment_method)
      VALUES ($1, $2)
      RETURNING *
      `,
      [
        total,
        paymentMethod,
      ]
    );

    const sale = saleResult.rows[0];

    for (const item of items) {
      await client.query(
        `
        INSERT INTO sale_items
        (
          sale_id,
          medicine_id,
          medicine_name,
          price,
          quantity
        )
        VALUES ($1, $2, $3, $4, $5)
        `,
        [
          sale.id,
          item.id,
          item.name,
          item.price,
          item.quantity,
        ]
      );

      await client.query(
        `
        UPDATE medicines
        SET quantity = quantity - $1
        WHERE id = $2
        `,
        [
          item.quantity,
          item.id,
        ]
      );
    }

    await client.query("COMMIT");

    res.status(201).json({
      message: "Sale completed successfully",
      sale,
    });

  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error.message);

    res.status(500).json({
      message: "Failed to complete sale",
    });

  } finally {
    client.release();
  }
}


async function getSales(req, res) {
  try {
    const result = await pool.query(
      `
      SELECT
        s.id,
        s.total,
        s.payment_method,
        s.created_at,
        COALESCE(
          json_agg(
            json_build_object(
              'id', si.medicine_id,
              'name', si.medicine_name,
              'price', si.price,
              'quantity', si.quantity
            )
          ) FILTER (
            WHERE si.id IS NOT NULL
          ),
          '[]'
        ) AS items
      FROM sales s
      LEFT JOIN sale_items si
        ON s.id = si.sale_id
      GROUP BY s.id
      ORDER BY s.created_at DESC
      `
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Failed to fetch sales",
    });
  }
}


module.exports = {
  createSale,
  getSales,
};