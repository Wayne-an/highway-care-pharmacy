function RecentSales({ sales }) {

  const recentSales = [...sales]
    .reverse()
    .slice(0, 5);


  return (

    <div className="bg-white rounded-xl shadow p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        🧾 Recent Sales
      </h2>


      {recentSales.length === 0 ? (

        <p className="text-gray-500">
          No recent sales.
        </p>

      ) : (

        <div className="space-y-4">

          {recentSales.map((sale) => (

            <div
              key={sale.id}
              className="flex justify-between items-center border-b pb-3"
            >

              <div>

                <p className="font-semibold">
                  Sale #{sale.id}
                </p>

                <p className="text-sm text-gray-500">
                  {sale.items.length} item(s) · {sale.paymentMethod}
                </p>

              </div>


              <p className="font-bold">
                Ksh {sale.total}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}


export default RecentSales;