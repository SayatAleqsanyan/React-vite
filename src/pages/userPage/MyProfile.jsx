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
      {user_name}
      {user && (
        <div>
          <p>My Profile</p>
        </div>
      )}
    </div>
  );
};

export default UserPage;