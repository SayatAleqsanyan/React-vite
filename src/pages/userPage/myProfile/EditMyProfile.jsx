import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updateUser } from "../../../redux/slices/usersSlice.js";
import ProfileForm from './ProfileForm';
import Loading from "../../../components/ui/Loading";
import Error from "../../../components/ui/Error";

const EditMyProfile = () => {
  const token = localStorage.getItem("Token");
  const { user_name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, status, error } = useSelector((state) => state.users);
  const user = users.find((user) => user.userName === user_name);

  const [editValues, setEditValues] = useState({
    userName: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    mobile: '',
    company: '',
    profession: '',
    autobiography: '',
    skills: [],
    imgURL: ''
  });

  useEffect(() => {
    if (user) {
      setEditValues({
        userName: user.userName || '',
        email: user.email || '',
        password: user.password || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        gender: user.gender || '',
        dateOfBirth: user.dateOfBirth || '',
        address: user.address || '',
        mobile: user.mobile || '',
        company: user.company || '',
        profession: user.profession || '',
        autobiography: user.autobiography || '',
        skills: user.skills || [],
        imgURL: user.imgURL || ''
      });
    }
  }, [user]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        ...user,
        userName: editValues.userName,
        email: editValues.email,
        password: editValues.password,
        firstName: editValues.firstName,
        lastName: editValues.lastName,
        gender: editValues.gender,
        dateOfBirth: editValues.dateOfBirth,
        address: editValues.address,
        mobile: editValues.mobile,
        company: editValues.company,
        profession: editValues.profession,
        autobiography: editValues.autobiography,
        skills: editValues.skills,
        imgURL: editValues.imgURL
      };

      await dispatch(updateUser({
        id: user.id,
        updatedUser
      })).unwrap();
      navigate(-1);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleCancelEdit = () => {
    navigate(-1);
  };

  if (user_name !== token) {
    return navigate('/profile/' + user_name);
  }

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
      <ProfileForm
        editValues={editValues}
        setEditValues={setEditValues}
        handleSubmit={handleUpdateUser}
        handleCancel={handleCancelEdit}
      />
    </div>
  );
};

export default EditMyProfile;