import { useParams } from "react-router-dom";
import { profilUser } from "../../redux/slices/authSlice.js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const UserPage = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const { user_name } = useParams();

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const userData = await dispatch(profilUser({ userName: user_name })).unwrap();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }

    fetchUserInfo();
  }, [dispatch, user_name]);

  return (
    <div>
      {user && (
        <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
          {!!user.imgURL && <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
            <img className="object-cover object-center h-32"
                 src={user.imgURL}
                 alt={user.userName}/>
          </div>}
          <div className="text-center mt-2">
            <h2 className="font-semibold">{user.userName}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
          <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">

          </ul>
        </div>
      )}
    </div>
  );
};

export default UserPage;