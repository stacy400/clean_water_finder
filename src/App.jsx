const App = () => {
  const [currentPage, setCurrentPage] = React.useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'map':
        return <MapPage onNavigate={setCurrentPage} />;
      case 'report':
        return <ReportPage />;
      case 'analytics':
        return <AnalyticsPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-grow">
        <div className="fade-in page-transition">
          {renderPage()}
        </div>
      </main>
      <Footer />
    </div>
  );
};