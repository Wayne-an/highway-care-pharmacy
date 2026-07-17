function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-green-700 text-white p-6">

      <h1 className="text-2xl font-bold mb-8">
        💊 Highway Care
      </h1>

      <nav className="space-y-4">

        <p className="hover:bg-green-600 p-3 rounded cursor-pointer">
          🏠 Dashboard
        </p>

        <p className="hover:bg-green-600 p-3 rounded cursor-pointer">
          💊 Inventory
        </p>

        <p className="hover:bg-green-600 p-3 rounded cursor-pointer">
          🧾 Sales
        </p>

        <p className="hover:bg-green-600 p-3 rounded cursor-pointer">
          👥 Customers
        </p>

        <p className="hover:bg-green-600 p-3 rounded cursor-pointer">
          ⚙ Settings
        </p>

      </nav>

    </aside>
  )
}

export default Sidebar