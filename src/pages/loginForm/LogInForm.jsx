import './loginForm.css';
import Login from "./Login.jsx";
import Register from "./Register.jsx";

const LogInForm = () => {
  return (
    <div className='flex justify-center items-center h-[90vh] '>
      <div className="container ">
        <Login />
        <Register />
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button
              onClick={() => document.querySelector('.container').classList.add('active')}
              className="btn register-btn"
            >Register</button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button
              onClick={() => document.querySelector('.container').classList.remove('active')}
              className="btn login-btn">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;