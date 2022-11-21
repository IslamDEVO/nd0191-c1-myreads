import Shelf from "./Shelf";
import { Link } from "react-router-dom";

const Home = ({ books, onMove }) => {
  // separate out currently reading books
  const currentlyReadingBooks = books.filter((book) => {
    return book.shelf === "currentlyReading";
  });

  // separate out want to read books
  const wantToReadBooks = books.filter((book) => {
    return book.shelf === "wantToRead";
  });

  // separate out read books
  const readBooks = books.filter((book) => {
    return book.shelf === "read";
  });
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <Shelf
              books={currentlyReadingBooks}
              name="Currently Reading"
              onMove={onMove}
            />
            <Shelf
              books={wantToReadBooks}
              name="Want to Read"
              onMove={onMove}
            />
            <Shelf books={readBooks} name="Read" onMove={onMove} />
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="search">Add a book</Link>
      </div>
    </div>
  );
};

export default Home;
