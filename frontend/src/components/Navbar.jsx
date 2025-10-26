import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">Clean Water Finder</h1>
      <ul className="flex space-x-6">
        <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
        <li><Link to="/find" className="hover:text-blue-200">Find Water</Link></li>
        <li><Link to="/add" className="hover:text-blue-200">Add Source</Link></li>
        <li><Link to="/about" className="hover:text-blue-200">About</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
