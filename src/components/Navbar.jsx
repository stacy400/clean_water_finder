const Navbar = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { name: 'Home', id: 'home', icon: 'fa-home' },
    { name: 'Map', id: 'map', icon: 'fa-map-location-dot' },
    { name: 'Report', id: 'report', icon: 'fa-clipboard' },
    { name: 'Analytics', id: 'analytics', icon: 'fa-chart-line' }
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <i className="fas fa-water text-blue-500 text-3xl mr-2"></i>
              <span className="font-bold text-xl text-blue-600">Clean Water Finder</span>
            </div>
          </div>

          <div className="hidden sm:flex sm:space-x-8 items-center">
            {navItems.map(item => (
              <a
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`cursor-pointer px-3 py-2 text-sm font-medium ${
                  currentPage === item.id
                    ? 'text-blue-600 border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                <i className={`fas ${item.icon} mr-1`}></i> {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-blue-600 focus:outline-none"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map(item => (
              <a
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block pl-3 pr-4 py-2 text-base font-medium cursor-pointer ${
                  currentPage === item.id
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                <i className={`fas ${item.icon} mr-2`}></i> {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};