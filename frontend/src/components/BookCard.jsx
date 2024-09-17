const BookCard = ({ book }) => (
    <div className="border p-4 rounded-lg shadow-lg mb-4">
      <h2 className="text-xl font-bold">{book.title}</h2>
      <p className="text-gray-600">Author: {book.author}</p>
      <p className="text-gray-600">Available: {book.available ? 'Yes' : 'No'}</p>
    </div>
  );
  
  export default BookCard;
  
  
  