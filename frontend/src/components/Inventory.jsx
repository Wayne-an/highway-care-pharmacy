import { useState } from "react";

function Inventory({ medicines, deleteMedicine, updateMedicine, inventoryFilter }) {
const [searchTerm, setSearchTerm] = useState("");
const [editingMedicine, setEditingMedicine] = useState(null);

const filteredMedicines = medicines.filter((medicine) => {
  const search = searchTerm.toLowerCase();

  const matchesSearch =
    medicine.name.toLowerCase().includes(search) ||
    medicine.category.toLowerCase().includes(search);

  const today = new Date();

  const expiryDate = new Date(medicine.expiry);

  const difference =
    expiryDate - today;

  const daysUntilExpiry =
    difference / (1000 * 60 * 60 * 24);

  const matchesFilter =
    inventoryFilter === "all" ||
    (inventoryFilter === "low-stock" &&
      medicine.quantity < 20) ||
    (inventoryFilter === "expiring-soon" &&
      daysUntilExpiry <= 30 &&
      daysUntilExpiry >= 0) ||
    (inventoryFilter === "expired" &&
      expiryDate < today);

  return matchesSearch && matchesFilter;
});

return (
<>
 <div className="bg-white rounded-xl shadow p-6 mt-8"> <div className="flex flex-col md:flex-row justify-between gap-4 mb-6"> <h2 className="text-2xl font-bold">
💊 Medicine Inventory </h2>

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
            <th className="p-3">Medicine</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Expiry</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredMedicines.map((medicine) => (
            <tr
  key={medicine.id}
  className={`border-b hover:bg-gray-50 ${
    medicine.quantity < 20
      ? "bg-red-50"
      : ""
  }`}
>
              <td className="p-3 font-semibold">
                {medicine.name}
              </td>

              <td className="p-3">
                <div className="flex items-center gap-2">

  <span
    className={
      medicine.quantity < 20
        ? "bg-red-100 text-red-600 px-3 py-1 rounded"
        : "bg-green-100 text-green-600 px-3 py-1 rounded"
    }
  >
    {medicine.quantity}
  </span>

  {medicine.quantity < 20 && (
    <span className="text-xs text-red-600 font-semibold">
      Low Stock
    </span>
  )}

</div>
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

              <td className="p-3 space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingMedicine(medicine)}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded"
                >
                  ✏️ Edit
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const confirmed = window.confirm(
                      `Delete ${medicine.name}?`
                    );

                    if (confirmed) {
                      deleteMedicine(medicine.id);
                    }
                  }}
                  className="bg-red-100 text-red-600 px-3 py-1 rounded"
                >
                  🗑️ Delete
                </button>
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

  {/* Edit Medicine Modal */}
  {editingMedicine && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            ✏️ Edit Medicine
          </h2>

          <button
            type="button"
            onClick={() => setEditingMedicine(null)}
            className="text-gray-500 text-xl"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            updateMedicine(editingMedicine);

            setEditingMedicine(null);
          }}
          className="space-y-4"
        >
          <input
            type="text"
            value={editingMedicine.name}
            onChange={(e) =>
              setEditingMedicine({
                ...editingMedicine,
                name: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
            placeholder="Medicine name"
          />

          <input
            type="text"
            value={editingMedicine.category}
            onChange={(e) =>
              setEditingMedicine({
                ...editingMedicine,
                category: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
            placeholder="Category"
          />

          <input
            type="number"
            value={editingMedicine.price}
            onChange={(e) =>
              setEditingMedicine({
                ...editingMedicine,
                price: Number(e.target.value),
              })
            }
            className="w-full border rounded-lg p-3"
            placeholder="Price"
          />

          <input
            type="number"
            value={editingMedicine.quantity}
            onChange={(e) =>
              setEditingMedicine({
                ...editingMedicine,
                quantity: Number(e.target.value),
              })
            }
            className="w-full border rounded-lg p-3"
            placeholder="Quantity"
          />

          <input
            type="date"
            value={editingMedicine.expiry}
            onChange={(e) =>
              setEditingMedicine({
                ...editingMedicine,
                expiry: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setEditingMedicine(null)}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</>

);
}
export default Inventory;