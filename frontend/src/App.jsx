import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import StatCard from "./components/StatCard";
import Inventory from "./components/Inventory";
import AddMedicine from "./components/AddMedicine";
import Sales from "./components/Sales";
import SalesHistory from "./components/SalesHistory";
import RecentSales from "./components/RecentSales";




function App() {
     const [activePage, setActivePage] = useState("dashboard");
     const [sidebarOpen, setSidebarOpen] = useState(false);  
     const [medicines, setMedicines] = useState(() => {

    const savedMedicines = localStorage.getItem("medicines");

    return savedMedicines
      ? JSON.parse(savedMedicines)
      : [
          {
            id: 1,
            name: "Panadol",
            category: "Pain Relief",
            price: 100,
            quantity: 120,
            expiry: "2027-05-01"
          },
          {
            id: 2,
            name: "Vitamin C",
            category: "Supplements",
            price: 200,
            quantity: 80,
            expiry: "2028-01-01"
          },
          {
            id: 3,
            name: "Amoxicillin",
            category: "Antibiotics",
            price: 350,
            quantity: 10,
            expiry: "2026-12-01"
          }
        ];

  });

const [sales, setSales] = useState(() => {

  const savedSales = localStorage.getItem("sales");

  return savedSales
    ? JSON.parse(savedSales)
    : [];

});

  function addMedicine(newMedicine) {

    const updatedMedicines = [
      ...medicines,
      newMedicine
    ];

    setMedicines(updatedMedicines);

    localStorage.setItem(
      "medicines",
      JSON.stringify(updatedMedicines)
    );

  }
  function deleteMedicine(id) {

  const updatedMedicines = medicines.filter(
    (medicine) => medicine.id !== id
  );


  setMedicines(updatedMedicines);


  localStorage.setItem(
    "medicines",
    JSON.stringify(updatedMedicines)
  );

}

function updateMedicine(updatedMedicine) {

  const updatedMedicines = medicines.map(
    (medicine) =>

      medicine.id === updatedMedicine.id
        ? updatedMedicine
        : medicine
  );


  setMedicines(updatedMedicines);


  localStorage.setItem(
    "medicines",
    JSON.stringify(updatedMedicines)
  );

}

function completeSale(cart, paymentMethod) {

  setMedicines((currentMedicines) => {

    return currentMedicines.map((medicine) => {

      const soldItem = cart.find(
        (item) => item.id === medicine.id
      );


      if (soldItem) {

        return {
          ...medicine,
          quantity: medicine.quantity - soldItem.quantity
        };

      }


      return medicine;

    });

  });


  const saleTotal = cart.reduce(

    (total, item) => {

      return total + item.price * item.quantity;

    },

    0

  );


  const newSale = {

    id: Date.now(),

    items: cart,

    total: saleTotal,

    paymentMethod: paymentMethod,

    date: new Date().toLocaleString()

  };


  setSales((currentSales) => {

  const updatedSales = [

    ...currentSales,

    newSale

  ];


  localStorage.setItem(

    "sales",

    JSON.stringify(updatedSales)

  );


  return updatedSales;

});

}

const todaysSales = sales.reduce(

  (total, sale) => {

    return total + sale.total;

  },

  0

);

const lowStockMedicines = medicines.filter(
  (medicine) => medicine.quantity < 20
);

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
  onClick={() => setSidebarOpen(!sidebarOpen)}
  className="md:hidden fixed top-4 left-4 z-40 bg-green-700 text-white p-3 rounded-lg"
>
  ☰
</button>
        <Navbar />

        <main className="p-8">

          {activePage === "dashboard" && (

  <>

    <h1 className="text-3xl font-bold text-gray-800">
      Welcome back, Pharmacist 👋
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


    <RecentSales sales={sales} />

  </>

)}
{activePage === "inventory" && (

  <>

    <h1 className="text-3xl font-bold">
      💊 Medicine Inventory
    </h1>


    <Inventory 
    medicines={medicines}
    deleteMedicine={deleteMedicine}
    updateMedicine={updateMedicine}
     />


    <AddMedicine addMedicine={addMedicine} />

  </>

)}
{activePage === "sales" && (

  <>

    <h1 className="text-3xl font-bold">
      🧾 Point of Sale
    </h1>


    <Sales
      medicines={medicines}
      completeSale={completeSale}
    />

  </>

)}
{activePage === "history" && (

  <>

    <h1 className="text-3xl font-bold">
      📈 Sales History
    </h1>


    <SalesHistory sales={sales} />

  </>

)}

        </main>

      </div>

    </div>

  );

}


export default App;