import { useEffect, useState } from "react";

import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import StatCard from "./components/StatCard";
import Inventory from "./components/Inventory";
import AddMedicine from "./components/AddMedicine";
import Sales from "./components/Sales";
import SalesHistory from "./components/SalesHistory";
import RecentSales from "./components/RecentSales";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const [activePage, setActivePage] =
    useState("dashboard");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [inventoryFilter, setInventoryFilter] =
    useState("all");

  const [medicines, setMedicines] = useState(() => {
    const savedMedicines =
      localStorage.getItem("medicines");

    return savedMedicines
      ? JSON.parse(savedMedicines)
      : [];
  });

  const [sales] = useState(() => {
    const savedSales =
      localStorage.getItem("sales");

    return savedSales
      ? JSON.parse(savedSales)
      : [];
  });

  useEffect(() => {
    async function fetchMedicines() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/medicines"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setMedicines(data);

      } catch (error) {
        console.error(
          "Failed to fetch medicines:",
          error
        );
      }
    }

    fetchMedicines();

  }, []);

  async function addMedicine(newMedicine) {
    try {
      const response = await fetch(
        "http://localhost:5000/api/medicines",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(newMedicine),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setMedicines((currentMedicines) => [
        ...currentMedicines,
        data.medicine,
      ]);

      alert(
        "Medicine added successfully 🎉"
      );

    } catch (error) {
      console.error(error);

      alert(
        "Failed to add medicine"
      );
    }
  }

  async function deleteMedicine(id) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/medicines/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setMedicines((currentMedicines) =>
        currentMedicines.filter(
          (medicine) =>
            medicine.id !== id
        )
      );

      alert(
        "Medicine deleted successfully 🗑️"
      );

    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete medicine"
      );
    }
  }

  async function updateMedicine(
    updatedMedicine
  ) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/medicines/${updatedMedicine.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(
            updatedMedicine
          ),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setMedicines((currentMedicines) =>
        currentMedicines.map(
          (medicine) =>
            medicine.id === updatedMedicine.id
              ? data.medicine
              : medicine
        )
      );

      alert(
        "Medicine updated successfully ✏️"
      );

    } catch (error) {
      console.error(error);

      alert(
        "Failed to update medicine"
      );
    }
  }

  const todaysSales =
    sales.reduce(
      (total, sale) =>
        total + sale.total,

      0
    );

  const lowStockMedicines =
    medicines.filter(
      (medicine) =>
        medicine.quantity < 20
    );

  const today = new Date();

  const expiringSoonMedicines =
    medicines.filter(
      (medicine) => {

        const expiryDate =
          new Date(
            medicine.expiry
          );

        const difference =
          expiryDate - today;

        const daysUntilExpiry =
          difference /
          (1000 * 60 * 60 * 24);

        return (
          daysUntilExpiry <= 30 &&
          daysUntilExpiry >= 0
        );
      }
    );

  const expiredMedicines =
    medicines.filter(
      (medicine) =>
        new Date(
          medicine.expiry
        ) < today
    );

  if (!user) {
    return (
      <Login
        onLogin={(loggedInUser) => {

          setUser(loggedInUser);

          localStorage.setItem(
            "user",
            JSON.stringify(
              loggedInUser
            )
          );

        }}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1">

        <button
          type="button"
          onClick={() =>
            setSidebarOpen(
              !sidebarOpen
            )
          }
          className="md:hidden fixed top-4 left-4 z-40 bg-green-700 text-white p-3 rounded-lg"
        >
          ☰
        </button>

        <Navbar />

        <main className="p-8">

          {activePage === "dashboard" && (
            <>

              <h1 className="text-3xl font-bold text-gray-800">
                Welcome back, {user.name} 👋
              </h1>

              <p className="text-gray-500 mt-2">
                Manage medicines, sales, and customer orders.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

                <StatCard
                  title="Today's Sales"
                  value={`Ksh ${todaysSales}`}
                  icon="💰"
                />

                <StatCard
                  title="Medicines Available"
                  value={medicines.length}
                  icon="💊"
                />

                <StatCard
                  title="Low Stock Items"
                  value={lowStockMedicines.length}
                  icon="⚠️"
                />

                <StatCard
                  title="Total Transactions"
                  value={sales.length}
                  icon="🧾"
                />

              </div>

              <RecentSales
                sales={sales}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                <button
                  type="button"
                  onClick={() => {

                    setActivePage(
                      "inventory"
                    );

                    setInventoryFilter(
                      "low-stock"
                    );

                  }}
                  className="text-left w-full bg-red-50 border border-red-200 rounded-xl p-6 hover:shadow-lg transition"
                >

                  <h2 className="text-xl font-bold text-red-700">
                    ⚠️ Low Stock
                  </h2>

                  <p className="text-3xl font-bold mt-3">
                    {lowStockMedicines.length}
                  </p>

                  <p className="text-gray-600">
                    medicines need restocking
                  </p>

                </button>

                <button
                  type="button"
                  onClick={() => {

                    setActivePage(
                      "inventory"
                    );

                    setInventoryFilter(
                      "expiring-soon"
                    );

                  }}
                  className="text-left w-full bg-yellow-50 border border-yellow-200 rounded-xl p-6 hover:shadow-lg transition"
                >

                  <h2 className="text-xl font-bold text-yellow-700">
                    ⏳ Expiring Soon
                  </h2>

                  <p className="text-3xl font-bold mt-3">
                    {expiringSoonMedicines.length}
                  </p>

                  <p className="text-gray-600">
                    expire within 30 days
                  </p>

                </button>

                <button
                  type="button"
                  onClick={() => {

                    setActivePage(
                      "inventory"
                    );

                    setInventoryFilter(
                      "expired"
                    );

                  }}
                  className="text-left w-full bg-gray-100 border border-gray-300 rounded-xl p-6 hover:shadow-lg transition"
                >

                  <h2 className="text-xl font-bold text-gray-700">
                    ❌ Expired
                  </h2>

                  <p className="text-3xl font-bold mt-3">
                    {expiredMedicines.length}
                  </p>

                  <p className="text-gray-600">
                    medicines should be removed
                  </p>

                </button>

              </div>

            </>
          )}

          {activePage === "inventory" && (
            <>

              <h1 className="text-3xl font-bold">
                💊 Medicine Inventory
              </h1>

              <Inventory
                medicines={medicines}
                deleteMedicine={
                  deleteMedicine
                }
                updateMedicine={
                  updateMedicine
                }
                inventoryFilter={
                  inventoryFilter
                }
              />

              <AddMedicine
                addMedicine={
                  addMedicine
                }
              />

            </>
          )}

          {activePage === "sales" && (
            <>

              <h1 className="text-3xl font-bold">
                🧾 Point of Sale
              </h1>

              <Sales
                medicines={medicines}
              />

            </>
          )}

          {activePage === "history" && (
            <>

              <h1 className="text-3xl font-bold">
                📈 Sales History
              </h1>

              <SalesHistory
                sales={sales}
              />

            </>
          )}

        </main>

      </div>

    </div>
  );
}

export default App;