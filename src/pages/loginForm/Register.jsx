import React from 'react';

const Register = () => {
  return (
    <div className="form-box register">
      <form action="#">
        <h1>Registration</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" required/>
          <i className='bx bxs-user'></i>
        </div>
        <div className="input-box">
          <input type="email" placeholder="Email" required/>
          <i className='bx bxs-envelope'></i>
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required/>
          <i className='bx bxs-lock-alt'></i>
        </div>
        <button type="submit" className="btn">Register</button>
      </form>
    </div>
  );
};

export default Register;