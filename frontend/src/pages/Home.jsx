const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Background Image */}
      <div
        className="relative h-[70vh] bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center bg-no-repeat"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-900/40"></div>

        {/* Text content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Clean Water Finder
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl">
            Discover safe and clean water sources near you — because every drop counts 💧
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="p-8 text-center bg-white">
        <h2 className="text-2xl font-bold text-blue-700 mb-3">Our Mission</h2>
        <p className="max-w-2xl mx-auto text-gray-700 leading-relaxed">
          We aim to empower communities with easy access to clean water information.
          By using technology, we support <strong>UN SDG 6 — Clean Water and Sanitation</strong>,
          ensuring every person has access to safe and affordable water sources.
        </p>
      </section>
    </div>
  );
};

export default Home;
