import { useState, useEffect } from 'react';

const Posts = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const URL = "https://jsonplaceholder.typicode.com/posts";
  useEffect(() => {
    fetch(URL)
    .then(response => response.json())
    .then(data => setItems(data));
  }, []);

  const pageCount = Math.ceil(items.length / itemsPerPage);

  const getCurrentItems = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(pageCount - 1, prev + 1));
  };

  const handleFirst = () => {
    setCurrentPage(0);
  };

  const handleLast = () => {
    setCurrentPage(pageCount - 1);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(pageCount - 1, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(0, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handlePageClick = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const currentItems = getCurrentItems();

  return (
    <>
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="space-y-4">
          {currentItems.map(item => (
            <div key={item.id} className="border p-4 rounded">
              <h3 className="text-lg font-semibold">{item.id}. {item.title}</h3>
              <p className="text-gray-600">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={handleFirst}
            disabled={currentPage === 0}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Սկիզբ
          </button>

          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Նախորդ
          </button>

          {getPageNumbers().map(pageNumber => (
            <button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              className={`px-3 py-1 border rounded min-w-[40px]
              ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
            >
              {pageNumber + 1}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === pageCount - 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Հաջորդ
          </button>

          <button
            onClick={handleLast}
            disabled={currentPage === pageCount - 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Վերջ
          </button>
        </div>
      </div>
    </>
  );
};

export default Posts;
