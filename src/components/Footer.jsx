const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <i className="fas fa-water text-blue-400 text-2xl mr-2"></i>
              <h2 className="text-xl font-bold">Clean Water Finder</h2>
            </div>
            <p className="text-gray-400 text-sm">
              Helping communities locate clean water sources and access real-time information on water quality and availability.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="javascript:void(0)" className="text-gray-400 hover:text-white transition duration-300">About Us</a></li>
              <li><a href="javascript:void(0)" className="text-gray-400 hover:text-white transition duration-300">Water Safety Tips</a></li>
              <li><a href="javascript:void(0)" className="text-gray-400 hover:text-white transition duration-300">Support Our Mission</a></li>
              <li><a href="javascript:void(0)" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="javascript:void(0)" className="text-gray-400 hover:text-white transition duration-300">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="javascript:void(0)" className="text-gray-400 hover:text-white transition duration-300">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="javascript:void(0)" className="text-gray-400 hover:text-white transition duration-300">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="javascript:void(0)" className="text-gray-400 hover:text-white transition duration-300">
                <i className="fab fa-github text-xl"></i>
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              <i className="fas fa-envelope mr-2"></i> contact@cleanwaterfinder.org
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Clean Water Finder. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <img
              src="https://cdn.pixabay.com/photo/2018/03/10/17/16/sdg-3214896_960_720.png"
              alt="UN SDG 6 Logo"
              className="h-10 mr-2"
            />
            <span className="text-sm text-gray-400">Aligned with UN SDG 6</span>
          </div>
        </div>
      </div>
    </footer>
  );
};