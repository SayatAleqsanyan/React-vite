// Register.jsx
import Input from "../../components/ui/input";
import { notify } from "../../utils/notify";
import { emailValidation, passwordValidation, userValidation } from "../../utils/validations";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onBlur" });

  const registration = async (data) => {
    const { email, password, username } = data;

    const user = {
      userName: username,
      email,
      password,
      isBlocked: false,
    };

    dispatch(registerUser(user))
    .unwrap()
    .then(() => {
      notify("Registration successful!", "green");
    })
    .catch((error) => {
      notify(`Error: ${error}`, "red");
    });
  };

  return (
    <div className="form-box register">
      <form onSubmit={handleSubmit(registration)} className="form">
        <h1>Registration</h1>
        <div className="input-box">
          <Input
            name="username"
            register={register}
            type="text"
            placeholder="Username"
            validation={userValidation}
            error={errors.username && errors.username.message}
          />
        </div>
        <div className="input-box">
          <Input
            name="email"
            register={register}
            type="text"
            placeholder="Email"
            validation={emailValidation}
            error={errors.email && errors.email.message}
          />
        </div>
        <div className="input-box">
          <Input
            name="password"
            register={register}
            type="password"
            placeholder="Password"
            validation={passwordValidation}
            error={errors.password && errors.password.message}
          />
        </div>
        <button className="btn" disabled={!isValid}>Register</button>
      </form>
    </div>
  );
};

export default Register;
