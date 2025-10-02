const AnalyticsPage = () => {
  const stats = {
    totalSources: 253,
    availableSources: 187,
    limitedSources: 42,
    unavailableSources: 24,
    recentReports: [
      { id: 1, name: "Community Well", location: "Central Park", status: "Available", reportedAt: "2025-04-10T15:23:00Z" },
      { id: 2, name: "River Access Point", location: "Riverside Road", status: "Limited", reportedAt: "2025-04-09T08:45:00Z" },
      { id: 3, name: "Public Fountain", location: "Main Square", status: "Unavailable", reportedAt: "2025-04-07T12:10:00Z" },
      { id: 4, name: "Natural Spring", location: "Mountain Trail", status: "Available", reportedAt: "2025-04-06T09:30:00Z" },
      { id: 5, name: "Village Pump", location: "Eastern District", status: "Available", reportedAt: "2025-04-05T16:55:00Z" }
    ]
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'green';
      case 'Limited': return 'orange';
      case 'Unavailable': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Water Source Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="stat-card bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 uppercase">Total Sources</p>
              <h3 className="text-3xl font-bold text-gray-800">{stats.totalSources}</h3>
            </div>
            <div className="text-blue-500 text-3xl">
              <i className="fas fa-water"></i>
            </div>
          </div>
        </div>

        <div className="stat-card bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 uppercase">Available</p>
              <h3 className="text-3xl font-bold text-gray-800">{stats.availableSources}</h3>
            </div>
            <div className="text-green-500 text-3xl">
              <i className="fas fa-check-circle"></i>
            </div>
          </div>
        </div>

        <div className="stat-card bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 uppercase">Limited</p>
              <h3 className="text-3xl font-bold text-gray-800">{stats.limitedSources}</h3>
            </div>
            <div className="text-orange-500 text-3xl">
              <i className="fas fa-exclamation-circle"></i>
            </div>
          </div>
        </div>

        <div className="stat-card bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 uppercase">Unavailable</p>
              <h3 className="text-3xl font-bold text-gray-800">{stats.unavailableSources}</h3>
            </div>
            <div className="text-red-500 text-3xl">
              <i className="fas fa-times-circle"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-semibold text-lg text-gray-800 mb-4">Water Availability Trends</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-center p-4">
              <i className="fas fa-chart-line text-blue-400 text-4xl mb-2"></i>
              <p className="text-gray-500">
                This is a prototype visualization. Charts will be available in the full version.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-semibold text-lg text-gray-800 mb-4">Recent Reports</h3>
          <div className="overflow-y-auto max-h-64">
            <ul className="space-y-4">
              {stats.recentReports.map(report => (
                <li key={report.id} className="border-b border-gray-100 pb-3">
                  <div className="flex items-start">
                    <div className={`mt-1 w-3 h-3 rounded-full bg-${getStatusColor(report.status)}-500 mr-2`}></div>
                    <div>
                      <h4 className="font-medium text-gray-800">{report.name}</h4>
                      <p className="text-sm text-gray-600">{report.location}</p>
                      <div className="flex justify-between mt-1">
                        <span className={`text-xs font-medium text-${getStatusColor(report.status)}-600`}>
                          {report.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(report.reportedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 text-center">
            <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
              View All Reports <i className="fas fa-arrow-right ml-1"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 p-5 bg-white rounded-xl shadow-md">
        <h3 className="font-semibold text-lg text-gray-800 mb-4">Regional Distribution</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-center p-4">
            <i className="fas fa-globe-americas text-blue-400 text-4xl mb-2"></i>
            <p className="text-gray-500">
              Regional map visualization will be available in the full version.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};