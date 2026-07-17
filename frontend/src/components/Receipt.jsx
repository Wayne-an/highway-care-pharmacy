function Receipt({ sale, onClose }) {
  if (!sale) {
    return null;
  }
function printReceipt() {
  window.print();
}
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">

        <div className="text-center border-b pb-4">

          <h1 className="text-2xl font-bold">
            Highway Care Pharmacy
          </h1>

          <p className="text-gray-500">
            Your health, our priority
          </p>

          <p className="text-sm text-gray-500 mt-2">
            {sale.date}
          </p>

        </div>


        <div className="py-4 space-y-3">

          {sale.items.map((item) => (

            <div
              key={item.id}
              className="flex justify-between"
            >

              <div>

                <p className="font-semibold">
                  {item.name}
                </p>

                <p className="text-sm text-gray-500">
                  {item.quantity} × Ksh {item.price}
                </p>

              </div>


              <p className="font-semibold">
                Ksh {item.quantity * item.price}
              </p>

            </div>

          ))}

        </div>


        <div className="border-t pt-4">

          <div className="flex justify-between text-xl font-bold">

            <span>
              Total
            </span>

            <span>
              Ksh {sale.total}
            </span>

          </div>


          <div className="flex justify-between mt-2">

            <span>
              Payment
            </span>

            <span>
              {sale.paymentMethod}
            </span>

          </div>

        </div>


        <div className="text-center mt-6 text-gray-500 text-sm">

          Thank you for shopping with us! 💚

        </div>

        <div className="no-print"> 
        <button
  type="button"
  onClick={printReceipt}
  className="w-full mt-3 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
>
  🖨️ Print Receipt
</button>


        <button
        type="button"
          onClick={onClose}
          className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Close Receipt
        </button>
        </div>

      </div>

    </div>
  );
}

export default Receipt;