import { useState } from "react";
import Receipt from "./Receipt";

function Sales({ medicines }) {
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [completedSale, setCompletedSale] = useState(null);

  const searchResults = medicines.filter((medicine) =>
    medicine.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  function addToCart(medicine) {
    const existingItem = cart.find(
      (item) => item.id === medicine.id
    );

    if (existingItem) {
      if (existingItem.quantity >= medicine.quantity) {
        alert("Not enough stock available.");
        return;
      }

      setCart(
        cart.map((item) =>
          item.id === medicine.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );

      return;
    }

    setCart([
      ...cart,
      {
        ...medicine,
        quantity: 1,
      },
    ]);
  }

  function increaseQuantity(item) {
    const medicine = medicines.find(
      (medicine) => medicine.id === item.id
    );

    if (item.quantity >= medicine.quantity) {
      alert("Maximum available stock reached.");
      return;
    }

    setCart(
      cart.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem
      )
    );
  }

  function decreaseQuantity(item) {
    if (item.quantity === 1) {
      removeFromCart(item.id);
      return;
    }

    setCart(
      cart.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            }
          : cartItem
      )
    );
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

  async function handleCompleteSale() {
  if (cart.length === 0) {
    alert("Please add medicine to the cart first.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/sales",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          paymentMethod: paymentMethod,

          items: cart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    const sale = {
      id: data.sale.id,
      items: cart,
      total: total,
      paymentMethod: paymentMethod,
      date: new Date().toLocaleString(),
    };

    setCompletedSale(sale);

    setCart([]);

    alert("Sale completed successfully 🎉");

  } catch (error) {
    console.error("Sale error:", error);

    alert(
      error.message ||
      "Failed to complete sale"
    );
  }
}
  return (
    <>
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
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
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
                    Stock available: {medicine.quantity}
                  </p>

                </div>

                <button
                  type="button"
                  disabled={medicine.quantity === 0}
                  onClick={() =>
                    addToCart(medicine)
                  }
                  className={`px-4 py-2 rounded-lg text-white ${
                    medicine.quantity === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {medicine.quantity === 0
                    ? "Out of Stock"
                    : "Add"}
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
                  className="border-b pb-4"
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <h3 className="font-semibold">
                        {item.name}
                      </h3>

                      <p className="text-gray-600">
                        Ksh {item.price} each
                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>

                  </div>


                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-3">

                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(item)
                      }
                      className="bg-gray-200 px-3 py-1 rounded"
                    >
                      −
                    </button>

                    <span className="font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(item)
                      }
                      className="bg-gray-200 px-3 py-1 rounded"
                    >
                      +
                    </button>

                    <span className="ml-auto font-semibold">
                      Ksh{" "}
                      {item.price * item.quantity}
                    </span>

                  </div>

                </div>

              ))}


              {/* Total */}
              <div className="border-t pt-4">

                <div className="flex justify-between text-xl font-bold">

                  <span>
                    Total
                  </span>

                  <span>
                    Ksh {total}
                  </span>

                </div>


                {/* Payment Method */}
                <div className="mt-4">

                  <label className="block font-semibold mb-2">
                    Payment Method
                  </label>

                  <select
                    value={paymentMethod}
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
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


                {/* Complete Sale */}
                <button
                  type="button"
                  onClick={handleCompleteSale}
                  className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                >
                  Complete Sale
                </button>

              </div>

            </div>

          )}

        </div>

      </div>


      {/* Receipt Modal */}
      <Receipt
        sale={completedSale}
        onClose={() => setCompletedSale(null)
        }
      />

    </>
  );
}

export default Sales;