import { useState, useEffect } from 'react';
import axios from '../api/api';

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    axios.get('/user/borrowed-books')
      .then(response => setBorrowedBooks(response.data))
      .catch(error => console.error('Error fetching borrowed books:', error));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Borrowed Books</h1>
      <ul>
        {borrowedBooks.map(book => (
          <li key={book.id}>{book.title} - Due: {book.dueDate}</li>
        ))}
      </ul>
    </div>
  );
};

export default BorrowedBooks;

