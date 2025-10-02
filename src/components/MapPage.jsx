const MapPage = ({ onNavigate }) => {
  React.useEffect(() => {
    const map = L.map('map').setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const sampleData = [
      { id: 1, name: "Community Well", lat: 40.7128, lng: -74.0060, status: "Available", comments: "Good water quality, regularly maintained." },
      { id: 2, name: "Mountain Spring", lat: 34.0522, lng: -118.2437, status: "Available", comments: "Natural spring water, accessible via hiking trail." },
      { id: 3, name: "Village Pump", lat: -1.2921, lng: 36.8219, status: "Limited", comments: "Currently low flow due to seasonal changes." },
      { id: 4, name: "River Access Point", lat: 51.5074, lng: -0.1278, status: "Unavailable", comments: "Currently contaminated, avoid usage." },
      { id: 5, name: "Public Fountain", lat: 48.8566, lng: 2.3522, status: "Available", comments: "Clean drinking water, high capacity." }
    ];

    sampleData.forEach(source => {
      const statusColor = source.status === "Available" ? "green" :
                          source.status === "Limited" ? "orange" : "red";

      L.marker([source.lat, source.lng])
        .addTo(map)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-bold text-lg">${source.name}</h3>
            <p class="text-${statusColor}-600 font-medium">Status: ${source.status}</p>
            <p class="text-gray-600 mt-2">${source.comments}</p>
          </div>
        `);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Water Source Map</h1>

      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-green-500 mr-2"></span>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-orange-500 mr-2"></span>
            <span className="text-sm">Limited</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-red-500 mr-2"></span>
            <span className="text-sm">Unavailable</span>
          </div>
        </div>

        <div id="map" className="rounded-lg shadow-inner border border-gray-300"></div>

        <div className="mt-4 text-center text-gray-600 text-sm">
          <p>Click on markers to see details about water sources</p>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-600 mb-4">Don't see a water source you know about?</p>
        <button
          onClick={() => onNavigate('report')}
          className="btn-primary px-6 py-3 rounded-lg font-medium shadow-lg"
        >
          <i className="fas fa-plus-circle mr-2"></i> Add a New Water Source
        </button>
      </div>
    </div>
  );
};