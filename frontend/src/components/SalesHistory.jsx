function SalesHistory({ sales }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        🧾 Sales History
      </h2>

      {sales.length === 0 ? (

        <p className="text-gray-500">
          No sales recorded yet.
        </p>

      ) : (

        <div className="space-y-4">

          {sales.map((sale) => (

            <div
              key={sale.id}
              className="border rounded-lg p-4"
            >

              <div className="flex justify-between">

                <div>

                  <h3 className="font-bold">
                    Sale #{sale.id}
                  </h3>

                  <p className="text-gray-500">
                    {new Date(
                      sale.created_at
                    ).toLocaleString()}
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-bold">
                    Ksh {sale.total}
                  </p>

                  <p className="text-sm text-gray-500">
                    {sale.payment_method}
                  </p>

                </div>

              </div>

              <div className="mt-3 text-sm">

                {sale.items.map((item) => (

                  <p key={item.id}>

                    {item.name} × {item.quantity}

                  </p>

                ))}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default SalesHistory;