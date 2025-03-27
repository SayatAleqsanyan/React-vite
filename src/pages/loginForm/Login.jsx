import Input from "../../components/ui/input";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../utils/notify";
import { useForm } from "react-hook-form";
import { emailValidation, passwordValidation } from "../../utils/validations";
import { loginUser, setRememberMe, setToken, setUser } from "../../redux/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { rememberMe } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("rememberMe"));
    if (savedUser) {
      setValue("email", savedUser.email);
      setValue("password", savedUser.password);
      dispatch(setRememberMe(true));
    }
  }, [setValue, dispatch]);

  const logining = async (data) => {
    try {
      const user = await dispatch(loginUser(data)).unwrap();
      if (user) {
        if (rememberMe) {
          localStorage.setItem("rememberMe", JSON.stringify({ email: data.email, password: data.password }));
        } else {
          localStorage.removeItem("rememberMe");
        }

        localStorage.setItem("Token", user.userName);
        dispatch(setToken(user.userName));
        dispatch(setUser(user));
        window.location.reload();
      } else {
        notify("Login or password is incorrect!", "red");
      }
    } catch (error) {
      console.error(error);
      notify("An error occurred during login.", "red");
    }
  };

  useEffect(() => {
    if (rememberMe && !errors.email && !errors.password) {
      document.querySelector(".btn").disabled = false;
    }
  }, [rememberMe, errors]);

  return (
    <div className="form-box login " >
      <form onSubmit={handleSubmit(logining)}  className="form">
        <h1>Login</h1>
        <div className="input-box">
          <Input
            name="email"
            register={register}
            type="text"
            placeholder="Email"
            validation={emailValidation}
            error={errors.email?.message}
          />
        </div>
        <div className="input-box">
          <Input
            name="password"
            register={register}
            type="password"
            placeholder="Password"
            validation={passwordValidation}
            error={errors.password?.message}
          />
        </div>
        <div className="forgot-link flex justify-center">
          <label className="flex items-center gap-2 text-center cursor-pointer">
            Remember me
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => dispatch(setRememberMe(e.target.checked))}
              className="w-4 h-4"
            />
          </label>
        </div>
        <button className="btn" disabled={!isValid}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
