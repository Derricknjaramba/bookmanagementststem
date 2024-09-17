// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AboutUs from './pages/AboutUs';
import HelpPage from './pages/HelpPage';
import BorrowedBooks from './pages/BorrowedBooks';
import PurchasedBooks from './pages/PurchasedBooks';
import BooksToBorrow from './pages/BooksToBorrow';

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/user" element={<UserDashboard />} />
    <Route path="/user/borrowed-books" element={<BorrowedBooks />} />
    <Route path="/user/purchased-books" element={<PurchasedBooks />} />
    <Route path="/user/help" element={<HelpPage />} />
    <Route path="/user/books-to-borrow" element={<BooksToBorrow />} />
    <Route path="/about" element={<AboutUs />} />
  </Routes>
);

export default App;








