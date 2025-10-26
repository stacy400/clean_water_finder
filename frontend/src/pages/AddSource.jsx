import React from "react";

const AddSource = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    location: '',
    latitude: '',
    longitude: '',
    status: 'Available',
    comments: '',
    photoUrl: ''
  });

  const [submitStatus, setSubmitStatus] = React.useState('idle');
  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Source name is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location description is required';
    }

    if (formData.latitude && !/^-?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?)$/.test(formData.latitude)) {
      newErrors.latitude = 'Enter a valid latitude (-90 to 90)';
    }

    if (formData.longitude && !/^-?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)$/.test(formData.longitude)) {
      newErrors.longitude = 'Enter a valid longitude (-180 to 180)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitStatus('submitting');

    setTimeout(() => {
      const existingReports = JSON.parse(localStorage.getItem('waterReports') || '[]');
      const newReport = {
        ...formData,
        id: Date.now(),
        reportedAt: new Date().toISOString()
      };

      localStorage.setItem('waterReports', JSON.stringify([...existingReports, newReport]));

      setSubmitStatus('success');
      setTimeout(() => {
        setFormData({
          name: '',
          location: '',
          latitude: '',
          longitude: '',
          status: 'Available',
          comments: '',
          photoUrl: ''
        });
        setSubmitStatus('idle');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Report a Water Source</h1>

      <div className="bg-white p-6 rounded-xl shadow-md">
        {submitStatus === 'success' ? (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" className="checkmark" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Report Submitted!</h2>
            <p className="text-gray-600 mb-4">Thank you for contributing to clean water accessibility.</p>
            <p className="text-sm text-gray-500">Your report will appear on the map shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Source Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="E.g. Community Well, Public Fountain"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location Description *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="E.g. Behind town hall, Near school"
                />
                {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
                  Latitude (optional)
                </label>
                <input
                  type="text"
                  id="latitude"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.latitude ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="E.g. 40.7128"
                />
                {errors.latitude && <p className="mt-1 text-sm text-red-600">{errors.latitude}</p>}
              </div>

              <div>
                <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
                  Longitude (optional)
                </label>
                <input
                  type="text"
                  id="longitude"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.longitude ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="E.g. -74.0060"
                />
                {errors.longitude && <p className="mt-1 text-sm text-red-600">{errors.longitude}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Water Availability
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Available">Available - Good supply</option>
                <option value="Limited">Limited - Low supply or seasonal</option>
                <option value="Unavailable">Unavailable - Dry or contaminated</option>
              </select>
            </div>

            <div>
              <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
                Comments
              </label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe the water quality, accessibility, etc."
              ></textarea>
            </div>

            <div>
              <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Photo URL (optional)
              </label>
              <input
                type="url"
                id="photoUrl"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="E.g. https://example.com/photo.jpg"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitStatus === 'submitting'}
                className={`btn-primary px-6 py-2 rounded-lg font-medium shadow-lg flex items-center justify-center min-w-[140px] ${submitStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {submitStatus === 'submitting' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i> Submit Report
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2 flex items-center">
          <i className="fas fa-info-circle mr-2"></i> Why Report Water Sources?
        </h3>
        <p className="text-blue-700 text-sm">
          By reporting water sources, you're helping communities identify reliable access to clean water. This data is crucial for humanitarian efforts and for individuals seeking water during shortages.
        </p>
      </div>
    </div>
  );
};
export default AddSource;