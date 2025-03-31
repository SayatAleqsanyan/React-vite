import { useState, useRef } from 'react';
import EmailVerifier from "./EmailVerifier.jsx";
import {notify} from "../../../utils/notify.js";

export const useEmailVerification = (initialEmail = '', initialUserName = '') => {
  const [verificationSent, setVerificationSent] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [userEmail, setUserEmail] = useState(initialEmail);
  const [userName, setUserName] = useState(initialUserName);
  const [resendCode, setResendCode] = useState(true);

  const verifierRef = useRef(null);

  const sendVerificationCode = (email, name) => {
    const emailToUse = email || userEmail;
    const nameToUse = name || userName || emailToUse.split('@')[0];

    setUserEmail(emailToUse);
    setUserName(nameToUse);

    try {
      verifierRef.current = EmailVerifier({
        number: 6,
        userEmail: emailToUse,
        userName: nameToUse
      });

      const code = verifierRef.current.sendEmail();

      if (code) {
        setVerificationSent(true);
        notify("Please check your email for the verification code.", "blue");
        return true;
      } else {
        notify("Failed to send verification email. Please try again.", "red");
        return false;
      }
    } catch (error) {
      notify(`Error: ${error}`, "red");
      return false;
    }
  };

  const verifyCode = () => {
    if (!verifierRef.current) {
      notify("Verification error. Please try again.", "red");
      return false;
    }

    const isVerified = verifierRef.current.verifyCode(inputCode);

    if (isVerified) {
      notify('Verification successful!', 'green');
      return true;
    } else {
      notify('Verification failed. Please try again.', 'red');
      return false;
    }
  };

  const resendVerificationCode = () => {
    if (!resendCode) return false;

    if (!verifierRef.current) {
      verifierRef.current = EmailVerifier({
        number: 6,
        userEmail: userEmail,
        userName: userName || userEmail.split('@')[0]
      });
    }

    const code = verifierRef.current.sendEmail();

    if (code) {
      notify("The verification code has been resent to your email. \nThis action is unavailable for 30 seconds.", "blue", 10);

      setResendCode(false);
      setTimeout(() => {
        setResendCode(true);
      }, 30000);

      return true;
    }

    return false;
  };

  const resetVerification = () => {
    setVerificationSent(false);
    setInputCode('');
  };

  return {
    verificationSent,
    setVerificationSent,
    inputCode,
    setInputCode,
    userEmail,
    userName,
    resendCode,
    sendVerificationCode,
    verifyCode,
    resendVerificationCode,
    resetVerification
  };
};