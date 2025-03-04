import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, toggleUserBlock, deleteUser } from '../../redux/slices/usersSlice';
import { notify } from '../../utils/notify';

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleBlockUser = (user) => {

    if (user.userName === 'Admin') {
      notify("You can't block this user!", 'blue');
      return;
    }

    dispatch(toggleUserBlock({
      id: user.id,
      isBlocked: user.isBlocked
    }))
    .then(() => {
      !user.isBlocked
        ? notify(`User blocked ${user.userName}!`, 'red')
        : notify(`User unblocked ${user.userName}!`, 'green');
    });
  };

  const handleDeleteUser = (user) => {


    if (user.userName === 'Admin') {
      notify("You can't delete this user!", 'blue');
      return;
    }

    dispatch(deleteUser(user.id))
    .then(() => {
      notify(`User deleted ${user.userName}!`, 'red');
    });
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className='flex justify-center p-10 '>
      <table className='min-w-full bg-white border text-black border-gray-200 text-center'>
        <thead>
        <tr>
          <th className='py-2 px-4 border-b'>No</th>
          <th className='py-2 px-4 border-b'>Name</th>
          <th className='py-2 px-4 border-b'>Email</th>
          <th className='py-2 px-4 border-b'>Password</th>
          <th className='py-2 px-4 border-b'>Blocked</th>
          <th className='py-2 px-4 border-b'>Action</th>
        </tr>
        </thead>
        <tbody>
        {users.map(user => (
          <tr key={user.id} className='hover:bg-gray-100'>
            <td className='py-2 px-4 border-b'>{user.id}</td>
            <td className='py-2 px-4 border-b'>{user.userName}</td>
            <td className='py-2 px-4 border-b'>{user.email}</td>
            <td className='py-2 px-4 border-b'>{user.password}</td>
            {user.userName !== 'Admin' && (
              <td className='py-2 px-4 border-b'>
                <button
                  className={
                    !user.isBlocked
                      ? 'text-green-600 hover:text-green-800'
                      : 'text-red-600 hover:text-red-800 w-[75px]'
                  }
                  onClick={e => {
                    e.preventDefault()
                    handleBlockUser(user)
                  }}
                >
                  {user.isBlocked ? 'Blocking' : 'Unblocking'}
                </button>
              </td>
            )}
            {user.userName !== 'Admin' && (
              <td className='py-2 px-4 border-b'>
                <button
                  className='text-red-600 hover:text-red-800 w-[75px]'
                  onClick={e => {
                    e.preventDefault()
                    handleDeleteUser(user)}}
                >
                  Delete
                </button>
              </td>
            )}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;