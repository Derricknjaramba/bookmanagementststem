// src/components/Admin.jsx
import { Link } from 'react-router-dom';

const Admin = () => {
    return (
        <div className="p-19 text-white text-center">
            <h1 className="text-5xl font-bold mb-4 text-center">Admin Dashboard </h1>
            <nav className="space-y-4 text-xl hover:underline">
                <Link to="/help">
                    View Help
                </Link>
                <br />
                <Link to="/feedback" className="text-white hover:underline">
                    View Feedback
                </Link>
            </nav>
        </div>
    );
};

export default Admin;
