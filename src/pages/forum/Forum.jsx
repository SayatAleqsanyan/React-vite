import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createForums, fetchForums, removeForums} from "../../redux/slices/forumsSlice.js";
import {notify} from "../../utils/notify.js";
import {useNavigate, useParams} from "react-router-dom";
import { Trash2 } from "lucide-react"

const Forum = () => {
  const forumsContainerRef = useRef(null);
  const [newForum, setNewForum] = useState("");
  const dispatch = useDispatch();
  const { forums } = useSelector((state) => state.forums);
  const { id } = useParams();
  const token = localStorage.getItem("Token");
  const navigator = useNavigate()
  let filteredForums =  forums.filter(message => message.postId === id)
  useEffect(()=>{
    dispatch(fetchForums())

  }, [dispatch])

  const handleAddForum = (event) => {
    event.preventDefault();

    if (!newForum ) {
      notify("Please fill in all fields", "red");
      return;
    }

    const Comm = {
      author: token,
      text: newForum,
      date: new Date().toISOString().split('T')[0],
    };

    dispatch(createForums(Comm))
    .unwrap()
    .then(() => {
      setNewForum("");
      notify("Product added successfully!", "green");
    })
    .catch((error) => {
      notify(`Error: ${error}`, "red");
    });
  };

  useEffect(() => {
    if (forumsContainerRef.current && filteredForums.length > 0 && status === 'succeeded') {

      const containerHeight = forumsContainerRef.current.clientHeight;
      const scrollPosition = Math.max(0, forumsContainerRef.current.scrollHeight / 2 - containerHeight / 2);

      forumsContainerRef.current.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [filteredForums, status]);

  setTimeout(() => {
    if (forumsContainerRef.current) {
      forumsContainerRef.current.scrollTop = forumsContainerRef.current.scrollHeight;
    }
  }, 100);

  return (
    <div className="flex flex-col h-[30vh] w-[1000px] max-w-[80vw]">
      <div className=" bg-gray-400 dark:bg-gray-700 dark:text-white shadow-sm border border-slate-200 dark:border-slate-900 flex-1">
        <h2 className="mx-auto my-3 text-xl font-semibold text-center text-slate-700 dark:text-white">Forum</h2>
        <div
          ref={forumsContainerRef}
          className="h-[500px] overflow-y-auto p-4 bg-gray-300 dark:bg-gray-800"
        >
          {filteredForums.length > 0 ? (
            filteredForums.map((message) => (
              <div
                key={message.id}
                className={`mb-4 p-4 rounded-lg border-2 ${
                  message.author === token
                    ? 'ml-auto bg-gray-500 dark:bg-gray-600 border-green-400'
                    : 'mr-auto bg-gray-400 dark:bg-gray-700 border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3
                    onClick={() => navigator(`/profile/${message.author}`)}
                    className={`text-2xl font-medium cursor-pointer ${
                      message.author === token
                        ? 'text-green-800 dark:text-green-700'
                        : 'text-slate-800 dark:text-white'
                    }`}
                  >
                    {message.author}
                  </h3>
                  <div className="flex gap-5">
                    <div className="text-sm text-gray-600 dark:text-gray-400">{message.date}</div>
                    {(message.author === token || token === "Admin") &&
                      <Trash2
                        onClick={() => {
                          notify(`Remove message!`, 'red')
                          return dispatch(removeForums(message.id))
                        }}
                        className="cursor-pointer hover:text-red-500 transition-colors"
                      />
                    }
                  </div>
                </div>
                <p className="text-slate-600 dark:text-gray-300">{message.text}</p>
              </div>
            ))
          ) : (
            <p className="py-4 text-center text-gray-500 dark:text-gray-400">No forums yet. Be the first to message!</p>
          )}


        </div>
        <form className="w-full max-w-[700px] mx-auto mt-3">
          <div className="flex mb-4">
        <textarea
          id="message"
          maxLength="500"
          rows="4"
          value={newForum}
          onChange={(e) => setNewForum(e.target.value)}
          className="w-full px-3 py-2 text-gray-700 border resize-none dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your message here..."
        />
            <button
              onClick={handleAddForum}
              type="button"
              className="px-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-700"
            >
              Post Forum
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forum;


