function Sidebar({ activePage, setActivePage, sidebarOpen, setSidebarOpen }) {

  const navigationItems = [

    {
      id: "dashboard",
      label: "Dashboard",
      icon: "📊"
    },

    {
      id: "inventory",
      label: "Inventory",
      icon: "💊"
    },

    {
      id: "sales",
      label: "Point of Sale",
      icon: "🧾"
    },

    {
      id: "history",
      label: "Sales History",
      icon: "📈"
    }

  ];


  return (

    <aside
  className={`
    fixed md:static
    top-0 left-0
    z-50
    w-64
    min-h-screen
    bg-green-900
    text-white
    p-6
    transform
    transition-transform
    duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `}
>

      <h1 className="text-2xl font-bold mb-10">
        Highway Care
      </h1>


      <nav className="space-y-3">

        {navigationItems.map((item) => (

          <button

            key={item.id}

            onClick={() => {
              setActivePage(item.id); 
              setSidebarOpen(false);
            }}

            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition ${
              activePage === item.id
                ? "bg-green-700"
                : "hover:bg-green-800"
            }`}

          >

            <span>
              {item.icon}
            </span>


            <span>
              {item.label}
            </span>

          </button>

        ))}

      </nav>

    </aside>

  );

}


export default Sidebar;