import { useState } from "react";


function Inventory({ medicines }) {

  const [searchTerm, setSearchTerm] = useState("");


  const filteredMedicines = medicines.filter((medicine) => {

    const search = searchTerm.toLowerCase();

    return (
      medicine.name.toLowerCase().includes(search) ||
      medicine.category.toLowerCase().includes(search)
    );

  });


  return (

    <div className="bg-white rounded-xl shadow p-6 mt-8">

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

        <h2 className="text-2xl font-bold">
          💊 Medicine Inventory
        </h2>


        <input
          type="text"
          placeholder="🔍 Search medicine..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
        />

      </div>


      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead>

            <tr className="border-b">

              <th className="p-3">
                Medicine
              </th>

              <th className="p-3">
                Category
              </th>

              <th className="p-3">
                Price
              </th>

              <th className="p-3">
                Stock
              </th>

              <th className="p-3">
                Expiry
              </th>

            </tr>

          </thead>


          <tbody>

            {filteredMedicines.map((medicine) => (

              <tr
                key={medicine.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-3 font-semibold">
                  {medicine.name}
                </td>


                <td className="p-3">
                  {medicine.category}
                </td>


                <td className="p-3">
                  Ksh {medicine.price}
                </td>


                <td className="p-3">

                  <span
                    className={
                      medicine.quantity < 20
                        ? "bg-red-100 text-red-600 px-3 py-1 rounded"
                        : "bg-green-100 text-green-600 px-3 py-1 rounded"
                    }
                  >
                    {medicine.quantity}
                  </span>

                </td>


                <td className="p-3">
                  {medicine.expiry}
                </td>


              </tr>

            ))}


          </tbody>

        </table>

      </div>


      {filteredMedicines.length === 0 && (

        <p className="text-center text-gray-500 py-8">
          No medicines found.
        </p>

      )}

    </div>

  );

}


export default Inventory;