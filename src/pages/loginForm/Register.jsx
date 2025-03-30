import Input from "../../components/ui/input";
import { notify } from "../../utils/notify";
import { emailValidation, passwordValidation, userValidation } from "../../utils/validations";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser, getUsers } from "../../redux/slices/authSlice";
import { useEffect, useState, useRef } from "react";
import EmailVerifier from "../../components/ui/email verifier/EmailVerifier.jsx";

const Register = () => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({ mode: "all" });
  const [validations, setValidations] = useState({
    length: false,
    number: false,
    special: false
  });

  const [verificationSent, setVerificationSent] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  const verifierRef = useRef(null);

  const password = watch("password") || "";

  useEffect(() => {
    setValidations({
      length: password.length >= 8 && password.length <= 16,
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password)
    });
  }, [password]);

  const registration = async (data) => {
    const { email, password, userName } = data;

    setUserEmail(email);
    setUserName(userName);

    setUser({
      userName,
      email,
      password,
      verified: false,
      isBlocked: false,
      skills: [],
      autobiography: null,
      dateOfBirth: null,
      firstName: null,
      lastName: null,
      gender: null,
      address: null,
      mobile: null,
      company: null,
      profession: null,
      imgURL: null
    });

    await dispatch(getUsers()).unwrap();

    const users = await dispatch(getUsers()).unwrap();
    const emailExists = users.some(user => user.email === email);
    const userNameExists = users.some(user => user.userName === userName);

    if (emailExists || userNameExists) {
      return notify("User with this email or username already exists.", "red");
    }

    try {
      verifierRef.current = EmailVerifier({
        number: 6,
        userEmail: email,
        userName: userName
      });

      const code = verifierRef.current.sendEmail();

      if (code) {
        setVerificationSent(true);
        notify("Registration successful! Please check your email for the verification code.", "green");
      } else {
        notify("Registration successful, but failed to send verification email.", "yellow");
      }

    } catch (error) {
      notify(`Error 001: ${error}`, "red");
    }
  };

  const handleVerify = () => {
    if (!verifierRef.current) {
      notify("Verification error. Please try again.", "red");
      return;
    }

    const isVerified = verifierRef.current.verifyCode(inputCode);

    if (isVerified) {
      dispatch(registerUser(user)).unwrap();

      setInputCode('');
      setUserEmail('');
      setUserName('');
      setUser({});

      setVerificationSent(false);
      notify('Email verified successfully!', 'green');

    } else {
      notify('Verification failed. Please try again.', 'red');
    }
  };

  const handleResendCode = () => {
    if (!verifierRef.current) {
      verifierRef.current = EmailVerifier({
        number: 6,
        userEmail: userEmail,
        userName: userName
      });
    }

    const code = verifierRef.current.sendEmail();

    if (code) {
      notify("Verification code has been resent to your email.", "blue");
    }
  };

  return (
    <div className="form-box register">
      {!verificationSent ? (
        <form onSubmit={handleSubmit(registration)} className="form">
          <h1>Registration</h1>
          <div className="input-box">
            <Input
              name="userName"
              register={register}
              type="text"
              placeholder="Username"
              validation={userValidation}
              error={errors.userName && errors.userName.message}
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
            <div className={` ${validations.length ? "text-green-600" : "text-red-600"} `}>
              Password Must be 8-16 characters long</div>
            <div className={` ${validations.number ? "text-green-600" : "text-red-600"} `}>
              Must contain at least one number (0-9)</div>
            <div className={` ${validations.special ? "text-green-600" : "text-red-600"} `}>
              Must contain at least one special character (!@#$%^&*)</div>
          </div>
          <button className="btn" disabled={!isValid}>Register</button>
        </form>
      ) : (
        <div className="verification-container">
          <p>Please enter the verification code sent to {userEmail}:</p>
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Verification Code"
            className="verification-input"
          />
          <div className="verification-actions">
            <button onClick={handleVerify} className="btn">Verify</button>
            <button onClick={handleResendCode} className="btn-secondary">Resend Code</button>
            <button onClick={() => setVerificationSent(false)} className="btn-secondary">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;