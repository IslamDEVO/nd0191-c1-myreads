import { useState } from "react";
import { Link } from "react-router-dom";
import { search } from "../BooksAPI";
import Book from "./Book";

const SearchBooks = ({ books, onMove }) => {
  // define variables using useState hook
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const showingResults = query === "" ? [] : searchResults;

  const searchQuery = async (e) => {
    if (e.target.value === "") {
      setQuery("");
    }
    // search if there is a query
    else {
      setQuery(e.target.value);
      try {
        const res = await search(e.target.value, 20);
        if (res && !res.error) {
          res.forEach((searchResult) => {
            // setting all default shelves to "none"
            searchResult.shelf = "none";
            books.forEach((shelfBook) => {
              // changing shelves of the books that are already in the collection
              if (searchResult.id === shelfBook.id) {
                searchResult.shelf = shelfBook.shelf;
              }
            });
          });
          setSearchResults(res);
        } else {
          setSearchResults([]);
        }
      } catch (err) {
        setSearchResults([]);
      }
    }
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={searchQuery}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {showingResults.map((book) => {
            return <Book key={book.id} book={book} onMove={onMove} />;
          })}
        </ol>
      </div>
    </div>
  );
};

export default SearchBooks;
