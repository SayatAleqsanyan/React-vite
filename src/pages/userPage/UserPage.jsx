import { useParams } from "react-router-dom";
import MyProfile from "./MyProfile.jsx";
import Profile from "./Profile.jsx";

const UserPage = () => {
  const token = localStorage.getItem("Token");
  const { user_name } = useParams();

  return (
    <div>
      {token === user_name
        ? <MyProfile />
        : <Profile />
      }
    </div>
  );
};

export default UserPage;