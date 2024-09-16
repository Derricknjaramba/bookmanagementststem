import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PurchasedBooks = () => {
  const [books, setBooks] = useState([]);
  const username = 'current_user';  // Replace with the actual username

  useEffect(() => {
    axios.get(`/api/purchased?username=${username}`)
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching purchased books:', error));
  }, [username]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Purchased Books</h1>
      <nav className="mb-4">
        <ul className="flex space-x-4">
          <li><Link to="/borrowed" className="text-blue-500 hover:underline">Borrowed Books</Link></li>
          <li><Link to="/purchased" className="text-blue-500 hover:underline">Purchased Books</Link></li>
          <li><Link to="/help" className="text-blue-500 hover:underline">Help</Link></li>
        </ul>
      </nav>
      {books.length === 0 ? (
        <p>No purchased books found.</p>
      ) : (
        <ul className="list-disc ml-5">
          {books.map((book, index) => (
            <li key={index}>{book.title} (Genre: {book.genre}, Purchased on: {book.purchased_date})</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PurchasedBooks;



