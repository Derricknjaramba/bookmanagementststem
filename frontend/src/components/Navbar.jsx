import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-gray-800 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-white text-xl">Bookstore Management</Link>
      <div>
        <Link to="/admin" className="text-white ml-4">Admin Dashboard</Link>
        <Link to="/user" className="text-white ml-4">User Dashboard</Link>
        <Link to="/about" className="text-white ml-4">About Us</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;



