import "./App.css";
import SearchBooks from "./components/SearchBooks";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import {getAll, update} from "./BooksAPI";

function App() {
  // define books using useState hook
  const [books, setBooks] = useState([]);

  // get books using useEffect hook
  useEffect(() => {
    const getBooks = async () => {
      const res = await getAll();
      setBooks(res);
    };
    getBooks();
  }, []);

  // handle move between shelves
  const handleMoveToShelves = async (book, shelf, oldShelf) => {
    // add a new book to the collection
    if (oldShelf === "none") {
      book.shelf = shelf;
      setBooks(books.concat(book));
      update(book, shelf);
    }
    // move a book which is already in the collecton
    else {
      update(book, shelf);
      setBooks(
        books.map((bk) => {
          if (bk.id === book.id) {
            bk.shelf = shelf;
          }
          return bk;
        })
      );
    }
  };
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Home books={books} onMove={handleMoveToShelves} />}
      />
      <Route
        path="/search"
        element={<SearchBooks books={books} onMove={handleMoveToShelves} />}
      />
      <Route path='*' element={<NotFoundComponent />} />
    </Routes>
  );
}

const NotFoundComponent = () => {
  return <h1>404 Not Found</h1>;
};

export default App;
