const HomePage = ({ onNavigate }) => {
  return (
    <div>
      <section className="hero-section h-96 flex items-center justify-center text-white">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Clean Water For Everyone</h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Helping communities locate clean water sources and access real-time information.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => onNavigate('map')}
              className="btn-primary px-6 py-3 rounded-lg font-medium shadow-lg"
            >
              <i className="fas fa-map-marker-alt mr-2"></i> Find Water Sources
            </button>
            <button
              onClick={() => onNavigate('report')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium shadow-lg transition duration-300"
            >
              <i className="fas fa-clipboard-list mr-2"></i> Report a Source
            </button>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <img
                src="https://cdn.pixabay.com/photo/2018/03/10/17/16/sdg-3214896_960_720.png"
                alt="UN SDG 6 Logo"
                className="h-32 mx-auto md:mx-0"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Aligned with UN Sustainable Development Goal 6</h2>
              <p className="text-gray-600">
                Our mission supports the UN's goal to ensure availability and sustainable management of water and sanitation for all. Through community engagement and data sharing, we're making clean water more accessible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How Clean Water Finder Helps</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="water-card bg-white rounded-xl shadow-md p-6">
              <div className="text-blue-500 text-4xl mb-4">
                <i className="fas fa-map-marked-alt"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
              <p className="text-gray-600">
                Locate clean water sources near you with our interactive map showing availability and quality information.
              </p>
            </div>

            <div className="water-card bg-white rounded-xl shadow-md p-6">
              <div className="text-blue-500 text-4xl mb-4">
                <i className="fas fa-hand-holding-water"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Reports</h3>
              <p className="text-gray-600">
                Contribute to our database by reporting water sources and their current conditions.
              </p>
            </div>

            <div className="water-card bg-white rounded-xl shadow-md p-6">
              <div className="text-blue-500 text-4xl mb-4">
                <i className="fas fa-chart-bar"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Insights</h3>
              <p className="text-gray-600">
                Access analytics and statistics about water availability in different regions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="max-w-2xl mx-auto text-blue-100 mb-8">
            Help us map clean water sources worldwide. Together we can make clean water accessible to everyone.
          </p>
          <button onClick={() => onNavigate('report')} className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium shadow-lg transition duration-300">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};