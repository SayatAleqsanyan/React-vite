import Input from "../../components/ui/input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../utils/notify";
import { useForm } from "react-hook-form";
import { emailValidation, passwordValidation } from "../../utils/validations";
import { loginUser, setRememberMe, setToken, setUser, getUsers } from "../../redux/slices/authSlice";
import { useEmailVerification } from "../../components/ui/email verifier/emailVerification";

const Login = () => {
  const dispatch = useDispatch();
  const { rememberMe } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  const [verifiedOn, setVerifiedOn] = useState(false);

  const {
    verificationSent,
    inputCode,
    setInputCode,
    userEmail,
    resendCode,
    sendVerificationCode,
    verifyCode,
    resendVerificationCode,
    resetVerification
  } = useEmailVerification();

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
    const users = await dispatch(getUsers()).unwrap();
    const user = users.find(user => user.email === data.email);

    try {
      setUserData(data);

      setVerifiedOn(prevState => {
        const newVerifiedState = user.verified;

        const processVerification = async () => {
          if (newVerifiedState) {
            await sendVerificationCode(data.email);
          } else {
            await completeLogin(data);
          }
        };

        processVerification();
        return newVerifiedState;
      });
    } catch (error) {
      console.error(error);
      notify(`Error: ${error}`, "red");
    }
  };

  const completeLogin = async (data) => {
    try {
      const user = await dispatch(loginUser(data)).unwrap();

      if (user) {
        if (rememberMe) {
          localStorage.setItem("rememberMe", JSON.stringify({
            email: data.email,
            password: data.password
          }));
        } else {
          localStorage.removeItem("rememberMe");
        }

        localStorage.setItem("Token", user.userName);
        dispatch(setToken(user.userName));
        dispatch(setUser(user));

        setTimeout(()=> {
          notify('11111!', 'blue', 10);
        }, 5000)
        window.location.reload();
      } else {
        notify("Login or password is incorrect!", "red");
        if (verifiedOn) {
          resetVerification();
        }
      }
    } catch (error) {
      console.error(error);
      notify("An error occurred during login.", "red");
      if (verifiedOn) {
        resetVerification();
      }
    }
  };

  const handleVerify = async () => {
    if (!userData) {
      notify("Verification error. Please try again.", "red");
      return;
    }

    const isVerified = verifyCode();

    if (isVerified) {
      await completeLogin(userData);
    }
  };

  useEffect(() => {
    if (rememberMe && !errors.email && !errors.password) {
      document.querySelector(".btn").disabled = false;
    }
  }, [rememberMe, errors]);

  return (
    <div className="form-box login">
      {verifiedOn && verificationSent ? (
        <div className="verification-container">
          <p>Please enter the verification code sent to {userEmail}:</p>
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Verification Code"
            className="border-2 border-black w-64 rounded-xl h-9 px-2 mb-3"
          />
          <div>
            <button onClick={handleVerify} className="w-[40%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Verify</button>
            <button disabled={!resendCode} onClick={resendVerificationCode} className={`${resendCode ? "" : "opacity-50 cursor-default"} w-[40%] py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}>Resend Code</button>
            <button onClick={resetVerification} className="w-[80%] text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Cancel</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(logining)} className="form">
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
      )}
    </div>
  );
};

export default Login;