
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../redux/slices/usersSlice.js";
import { UserProfileInfo } from './UserProfileInfo';
import Loading from "../../../components/ui/Loading.jsx";
import Error from "../../../components/ui/Error.jsx";

const Profile = () => {
  const { user_name } = useParams();
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);
  const user = users.find((user) => user.userName === user_name);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'failed') {
    return <Error message={error} />;
  }

  if (!user) {
    return <Error message="User not found" />;
  }

  return (
    <div className='mt-4 p-4 bg-white border rounded dark:bg-gray-800'>
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      <UserProfileInfo user={user} />
    </div>
  );
};

export default Profile;