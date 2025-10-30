import React from "react";

const About = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://www.pexels.com/download/video/2893780/"
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-blue-900/60"></div>

      {/* Content Section */}
      <div className="relative z-10 p-6 max-w-3xl mx-auto text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          🌍 About Clean Water Finder
        </h2>

        <p className="mb-4 leading-relaxed">
          <strong>Clean Water Finder</strong> is a community-powered platform that helps people locate
          <strong> safe, reliable, and accessible water sources</strong> near them. Our mission is to make
          clean water easy to find, report, and protect — especially in areas where access is limited or inconsistent.
        </p>

        <p className="mb-4 leading-relaxed">
          We believe access to clean water is a basic human right. Through the app, users can:
        </p>

        <ul className="text-left md:text-center mb-6 space-y-2">
          <li>🧭 <strong>Find</strong> nearby water points with accurate GPS locations.</li>
          <li>💧 <strong>Check</strong> water source status (available, dry, or under maintenance).</li>
          <li>📸 <strong>Report</strong> new or damaged water sources with photos and descriptions.</li>
          <li>🤝 <strong>Contribute</strong> to community data, helping improve water access and management.</li>
        </ul>

        <p className="mb-4 leading-relaxed">
          We believe technology can help bridge the gap between communities, NGOs, and local authorities — 
          working together to ensure everyone has access to safe water.
        </p>

        <p className="text-blue-200 font-semibold italic mt-4">
          “Empowering access to safe water for everyone.”
        </p>
      </div>
    </div>
  );
};

export default About;
