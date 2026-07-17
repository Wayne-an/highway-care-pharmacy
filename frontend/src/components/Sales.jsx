import { useState } from "react";


function Sales({ medicines, completeSale }) {
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [searchTerm, setSearchTerm] = useState("");

  const [cart, setCart] = useState([]);


  const searchResults = medicines.filter((medicine) => {

    return medicine.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  });


  function addToCart(medicine) {

    const existingItem = cart.find(
      (item) => item.id === medicine.id
    );


    if (existingItem) {

      setCart(

        cart.map((item) =>

          item.id === medicine.id

            ? {
                ...item,
                quantity: item.quantity + 1
              }

            : item

        )

      );

    } else {

      setCart([

        ...cart,

        {
          ...medicine,
          quantity: 1
        }

      ]);

    }

  }


  function removeFromCart(id) {

    setCart(

      cart.filter((item) => item.id !== id)

    );

  }


  const total = cart.reduce(

    (sum, item) =>

      sum + item.price * item.quantity,

    0

  );


  return (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">


      {/* Medicine Search */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">

          🔍 Find Medicine

        </h2>


        <input

          type="text"

          placeholder="Search medicine..."

          value={searchTerm}

          onChange={(e) => setSearchTerm(e.target.value)}

          className="w-full border rounded-lg p-3 mb-4"

        />


        <div className="space-y-3">


          {searchResults.map((medicine) => (

            <div

              key={medicine.id}

              className="flex justify-between items-center border p-4 rounded-lg"

            >

              <div>

                <h3 className="font-bold">

                  {medicine.name}

                </h3>


                <p className="text-gray-500">

                  Ksh {medicine.price}

                </p>


                <p className="text-sm text-gray-500">

                  Stock: {medicine.quantity}

                </p>

              </div>


              <button

                onClick={() => addToCart(medicine)}

                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"

              >

                Add

              </button>


            </div>

          ))}


        </div>

      </div>


      {/* Shopping Cart */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">

          🧾 Current Sale

        </h2>


        {cart.length === 0 ? (

          <p className="text-gray-500">

            No medicines added yet.

          </p>

        ) : (

          <div className="space-y-4">


            {cart.map((item) => (

              <div

                key={item.id}

                className="flex justify-between items-center border-b pb-3"

              >

                <div>

                  <h3 className="font-semibold">

                    {item.name}

                  </h3>


                  <p>

                    {item.quantity} × Ksh {item.price}

                  </p>

                </div>


                <button

                  onClick={() => removeFromCart(item.id)}

                  className="text-red-500 hover:text-red-700"

                >

                  Remove

                </button>

              </div>

            ))}


            <div className="border-t pt-4">

              <div className="flex justify-between text-xl font-bold">

                <span>Total</span>

                <span>

                  Ksh {total}

                </span>

              </div>
              <div className="mt-4">

  <label className="block font-semibold mb-2">
    Payment Method
  </label>

  <select
    value={paymentMethod}
    onChange={(e) => setPaymentMethod(e.target.value)}
    className="w-full border rounded-lg p-3"
  >

    <option value="Cash">
      💵 Cash
    </option>

    <option value="M-Pesa">
      📱 M-Pesa
    </option>

    <option value="Card">
      💳 Card
    </option>

  </select>

</div>

              <button
  onClick={() => {

    completeSale(cart, paymentMethod);

    setCart([]);

    alert(
      `Sale completed using ${paymentMethod}`
    );

  }}

  className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
>
  Complete Sale
</button>

            </div>


          </div>

        )}

      </div>


    </div>

  );

}


export default Sales;