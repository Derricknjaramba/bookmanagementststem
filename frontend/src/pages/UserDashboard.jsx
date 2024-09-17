import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const UserDashboard = () => (
  <div>
    <Navbar />
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">User Dashboard</h1>
      <div className="mt-4">
        <Link to="/user/borrowed-books" className="block mb-2 text-blue-500">Borrowed Books</Link>
        <Link to="/user/purchased-books" className="block mb-2 text-blue-500">Purchased Books</Link>
        <Link to="/user/help" className="block mb-2 text-blue-500">Help</Link>
        <Link to="/user/books-to-borrow" className="block mb-2 text-blue-500">Books to Borrow</Link>
      </div>
    </div>
  </div>
);

export default UserDashboard;


