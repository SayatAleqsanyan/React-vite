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
      <div className="flex-1 w-full min-w-[500px] max-w-[1200px] mr-[50px] ">
        <div className="bg-gray-400 dark:bg-gray-700 max dark:text-white shadow-sm border border-slate-200
        dark:border-slate-900 rounded-lgl">
          <h2 className="text-xl font-semibold mx-auto my-5 text-center text-slate-700 dark:text-white">Forum</h2>
          <div ref={forumsContainerRef}  className="p-4 mx-10 bg-gray-300 dark:bg-gray-800 overflow-y-auto min-h-87 h-[40vh]">
            {filteredForums.length > 0 ? (
              filteredForums.map((message) => (
                <div key={message.id} className={`mb-4 p-4 rounded-lg  
                  ${ message.author === token
                  ? 'bg-gray-500 dark:bg-gray-600 ml-50 border-2 border-green-400'
                  : 'bg-gray-400 dark:bg-gray-700 mr-50 border-2 border-slate-400' }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3
                      onClick={()=>{
                        navigator(`/profile/${message.author}`)
                      }}
                      className={`font-medium cursor-pointer text-2xl
                      ${ message.author === token ? 'text-green-800 dark:text-green-700' : 'text-slate-800 dark:text-white' }`}>{message.author}</h3>
                    <div className="flex gap-5">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{message.date}</span>
                      {(message.author === token || token === "Admin" )&& <Trash2
                        onClick={() => {
                          dispatch(removeForums(message.id))
                        }}
                        className="border-none cursor-pointer hover:text-red-500"
                      />}
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-gray-300">{message.text}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">No forums yet. Be the first to message!</p>
            )}
          </div>

          <div className="p-4 border-t border-slate-200 dark:border-slate-600">
            <form className=" w-full mx-auto max-w-[700px]">
              <div className="mb-4">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
                  Add a message
                </label>
                <textarea
                  id="message"
                  maxLength="500"
                  rows="4"
                  value={newForum}
                  onChange={(e) => setNewForum(e.target.value)}
                  className="resize-none w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              <button
                onClick={handleAddForum}
                type="button"
                className="bg-blue-500 block hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto"
              >
                Post Forum
              </button>
            </form>
          </div>
        </div>
      </div>

  );
};

export default Forum;


