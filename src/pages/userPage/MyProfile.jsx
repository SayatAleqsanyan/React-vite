import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers, updateUser} from "../../redux/slices/usersSlice.js";


const UserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { users, status, error } = useSelector((state) => state.users);
  const [user, setUser] = useState(null);
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
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  useEffect(() => {
    const foundUser = users.find(user => user.id === id);
    setUser(foundUser || null);
  }, [users, id]);

  useEffect(() => {
    if (user) {
      setEditValues({
        userName: user.userName || '',
        email: user.email || '',
        password: '',
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

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        await dispatch(updateUser({
          id: user.id,
          updatedUser: editValues
        })).unwrap();
        navigate(-1);
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    navigate(-1);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="user-edit-container">
      <h1>Edit User Profile</h1>
      <form onSubmit={handleUpdateUser}>
        {/* Username */}
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={editValues.userName}
            onChange={(e) => setEditValues({...editValues, userName: e.target.value})}
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={editValues.email}
            onChange={(e) => setEditValues({...editValues, email: e.target.value})}
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={editValues.password}
            onChange={(e) => setEditValues({...editValues, password: e.target.value})}
            placeholder="Enter new password"
          />
        </div>

        {/* First Name */}
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            value={editValues.firstName}
            onChange={(e) => setEditValues({...editValues, firstName: e.target.value})}
          />
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            value={editValues.lastName}
            onChange={(e) => setEditValues({...editValues, lastName: e.target.value})}
          />
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>Gender:</label>
          <select
            value={editValues.gender}
            onChange={(e) => setEditValues({...editValues, gender: e.target.value})}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            value={editValues.dateOfBirth}
            onChange={(e) => setEditValues({...editValues, dateOfBirth: e.target.value})}
          />
        </div>

        {/* Address */}
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={editValues.address}
            onChange={(e) => setEditValues({...editValues, address: e.target.value})}
          />
        </div>

        {/* Mobile */}
        <div className="form-group">
          <label>Mobile:</label>
          <input
            type="tel"
            value={editValues.mobile}
            onChange={(e) => setEditValues({...editValues, mobile: e.target.value})}
          />
        </div>

        {/* Company */}
        <div className="form-group">
          <label>Company:</label>
          <input
            type="text"
            value={editValues.company}
            onChange={(e) => setEditValues({...editValues, company: e.target.value})}
          />
        </div>

        {/* Profession */}
        <div className="form-group">
          <label>Profession:</label>
          <input
            type="text"
            value={editValues.profession}
            onChange={(e) => setEditValues({...editValues, profession: e.target.value})}
          />
        </div>

        {/* Autobiography */}
        <div className="form-group">
          <label>Autobiography:</label>
          <textarea
            value={editValues.autobiography}
            onChange={(e) => setEditValues({...editValues, autobiography: e.target.value})}
          />
        </div>

        {/* Skills */}
        <div className="form-group">
          <label>Skills (comma-separated):</label>
          <input
            type="text"
            value={editValues.skills.join(', ')}
            onChange={(e) => setEditValues({
              ...editValues,
              skills: e.target.value.split(',').map(skill => skill.trim())
            })}
          />
        </div>

        {/* Image URL */}
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            value={editValues.imgURL}
            onChange={(e) => setEditValues({...editValues, imgURL: e.target.value})}
          />
        </div>

        <div className="button-group">
          <button type="submit" className="save-btn">Save Changes</button>
          <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserPage;