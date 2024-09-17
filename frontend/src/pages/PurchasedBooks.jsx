import { useState, useEffect } from 'react';
import axios from '../api/api';

const PurchasedBooks = () => {
  const [purchasedBooks, setPurchasedBooks] = useState([]);

  useEffect(() => {
    axios.get('/user/purchased-books')
      .then(response => setPurchasedBooks(response.data))
      .catch(error => console.error('Error fetching purchased books:', error));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Purchased Books</h1>
      <ul>
        {purchasedBooks.map(book => (
          <li key={book.id}>{book.title} - Purchased on: {book.purchaseDate}</li>
        ))}
      </ul>
    </div>
  );
};

export default PurchasedBooks;


