const PostsPagination = ({
  handleFirst,
  handlePrevious,
  handlePageClick,
  handleNext,
  handleLast,
  pageCount,
  currentPage,
  getPageNumbers,
}) => {
  return (
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
  )
}

export default PostsPagination
