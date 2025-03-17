import {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createComments, fetchComments, removeComments} from "../../redux/slices/commentsSlice.js";
import {notify} from "../../utils/notify.js";
import {useNavigate, useParams} from "react-router-dom";
import { Trash2 } from "lucide-react"
import {LikeDislikeButtons} from "./ProductUserActions/ui/LikeDislikeButtons.jsx";

const ProductComments = ({product}) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const commentsContainerRef = useRef(null);
  const dispatch = useDispatch();
  const { comments, status } = useSelector((state) => state.comments);
  const { id } = useParams();
  const token = localStorage.getItem("Token");
  const navigator = useNavigate();

  const filteredComments = comments.filter(comment => comment.postId === id);
  filteredComments.reverse();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchComments());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (commentsContainerRef.current && filteredComments.length > 0 && status === 'succeeded') {
      const containerHeight = commentsContainerRef.current.clientHeight;
      const scrollPosition = Math.max(0, commentsContainerRef.current.scrollHeight - containerHeight);

      commentsContainerRef.current.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [filteredComments, status]);

  const handleAddComment = async (event) => {
    event.preventDefault();

    if (!newComment.trim()) {
      notify("Please fill in all fields", "red");
      return;
    }

    setIsSubmitting(true);

    const newCommentData = {
      author: token,
      text: newComment,
      date: new Date().toISOString().split('T')[0],
      postId: id,
    };

    try {
      await dispatch(createComments(newCommentData)).unwrap();
      setNewComment("");
      notify("Comment added successfully!", "green");

      setTimeout(() => {
        if (commentsContainerRef.current) {
          commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
        }
      }, 100);
    } catch (error) {
      notify(`Error: ${error}`, "red");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await dispatch(removeComments(commentId)).unwrap();
      notify("Comment removed successfully", "green");
    } catch (error) {
      notify(`Error: ${error}`, "red");
    }
  };

  return (
    <div>
      <div className="flex-1 min-w-[500px] max-w-[700px]">
        <div className="bg-white dark:bg-gray-700 max dark:text-white shadow-sm border border-slate-200
        dark:border-slate-900 rounded-lgl">
          <div className="p-6 border-b flex justify-between border-slate-200 dark:border-slate-600">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Comments</h2>
            <div className="flex gap-4">
              <LikeDislikeButtons
                product={product}
                userName={token}
              />
            </div>
          </div>

          <div
            ref={commentsContainerRef}
            className="p-4 min-h-87 h-[300px] overflow-y-auto"
          >
            {filteredComments.length > 0 ? (
              filteredComments.map((comment) => (
                <div key={comment.id} className={`mb-4 p-4 rounded-lg  
                  ${ comment.author === token
                  ? 'bg-gray-200 dark:bg-gray-600 ml-10'
                  : 'bg-gray-100 dark:bg-gray-800 mr-10' }`}
                >
                  <div className="flex justify-between items-center mb-2 ">
                    <h3
                      onClick={() => navigator(`/profile/${comment.author}`)}
                      className={`font-medium cursor-pointer text-2xl
                      ${ comment.author === token ? 'text-green-800 dark:text-green-700' : 'text-slate-800 dark:text-white' }`}
                    >
                      {comment.author}
                    </h3>
                    <div className="flex gap-5">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{comment.date}</span>
                      {comment.author === token &&
                        <Trash2
                          onClick={() => handleDeleteComment(comment.id)}
                          className="border-none cursor-pointer hover:text-red-500"
                        />
                      }
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-gray-300">{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">No comments yet. Be the first to comment!</p>
            )}
          </div>

          <div className="p-4 border-t border-slate-200 dark:border-slate-600">
            <form onSubmit={handleAddComment}>
              <div className="mb-4">
                <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
                  Add a comment
                </label>
                <textarea
                  id="comment"
                  maxLength="500"
                  rows="4"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="resize-none w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  placeholder="Write your comment here..."
                  disabled={isSubmitting}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${isSubmitting ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded`}
              >
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComments;
