import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createComments, fetchComments} from "../../redux/slices/commentsSlice.js";
import {notify} from "../../utils/notify.js";

const ProductComments = () => {
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comments);

  const token = localStorage.getItem("Token");

  useEffect(()=>{
    dispatch(fetchComments())

  }, [dispatch])

  const handleAddComment = (event) => {
    event.preventDefault();

    if (!newComment ) {
      notify("Please fill in all fields", "red");
      return;
    }

    const Comm = {
      author: token,
      text: newComment,
      date: new Date().toISOString().split('T')[0]
    };

    dispatch(createComments(Comm))
    .unwrap()
    .then(() => {
      setNewComment("");
      notify("Product added successfully!", "green");
    })
    .catch((error) => {
      notify(`Error: ${error}`, "red");
    });
  };

  return (
    <div>
      <div className="flex-1 min-w-[500px]">
        <div className="bg-white dark:bg-gray-700 max dark:text-white shadow-sm border border-slate-200
        dark:border-slate-900 rounded-lg">
          <div className="p-6 border-b border-slate-200 dark:border-slate-600">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Comments</h2>
          </div>

          <div className="p-4 max-h-[33vh] overflow-y-auto">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-slate-800 dark:text-white">{comment.author}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{comment.date}</span>
                  </div>
                  <p className="text-slate-600 dark:text-gray-300">{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">No comments yet. Be the first to comment!</p>
            )}
          </div>

          <div className="p-4 border-t border-slate-200 dark:border-slate-600">
            <form>
              <div className="mb-4">
                <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
                  Add a comment
                </label>
                <textarea
                  id="comment"
                  rows="4"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  placeholder="Write your comment here..."
                ></textarea>
              </div>
              <button
                onClick={handleAddComment}
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Post Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComments;
