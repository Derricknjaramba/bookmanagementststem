import { useState, useEffect } from 'react';
import axios from '../api/api';
import BookCard from '../components/BookCard';

const BooksToBorrow = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('/api/genres')
      .then(response => setGenres(response.data))
      .catch(error => console.error('Error fetching genres:', error));
  }, []);

  useEffect(() => {
    axios.get('/api/books-to-borrow', { params: { genre: selectedGenre, search } })
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, [selectedGenre, search]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Books to Borrow</h1>
      <div className="mt-4">
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="border p-2"
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search by title or author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 ml-4"
        />
      </div>
      <div className="mt-4">
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BooksToBorrow;

