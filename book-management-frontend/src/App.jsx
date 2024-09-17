import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import BorrowedBooks from './components/BorrowedBooks';
import PurchasedBooks from './components/PurchasedBooks';
import HelpPage from './components/HelpPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/borrowed" element={<BorrowedBooks />} />
        <Route path="/purchased" element={<PurchasedBooks />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/" element={<SignIn />} /> {/* Redirect to sign-in by default */}
      </Routes>
    </Router>
  );
};

export default App;







