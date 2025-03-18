import { useParams } from "react-router-dom";
import Profile from "./Profile/Profile.jsx";
import EditMyProfile from "./myProfile/EditMyProfile.jsx";

const UserPage = () => {
  const token = localStorage.getItem("Token");
  const { user_name } = useParams();

  return (
    <div>
      {token === user_name
        ? <EditMyProfile />
        : <Profile />
      }
    </div>
  );
};

export default UserPage;