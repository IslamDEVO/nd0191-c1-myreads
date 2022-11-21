import Book from "./Book";

const Shelf = ({ books, name, onMove }) => {
  return (
    <div>
      <h2 className="bookshelf-title">{name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => {
            return <Book key={book.id} book={book} onMove={onMove} />;
          })}
        </ol>
      </div>
    </div>
  );
};

export default Shelf;
