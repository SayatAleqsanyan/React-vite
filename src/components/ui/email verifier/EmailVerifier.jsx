import emailjs from '@emailjs/browser';
import { notify } from "../../../utils/notify.js";

const emailConfig = {
  serviceId: 'service_ccien8t',
  templateId: 'template_uyjq9zi',
  publicKey: '9KcpeN7tE7sLaudVG',
  toEmail: 'sayad.aleksanyan@mail.ru'
};

const EmailVerifier = ({ number = 7, userEmail, userName }) => {
  let verificationData = {
    code: null,
    email: userEmail,
    userName: userName
  };

  const sendEmail = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    if (!userName || !userEmail) {
      notify('Please provide email and username for verification', 'red');
      return null;
    }

    const code = Math.floor(Math.random() * (10 ** number)).toString().padStart(number, '0');

    verificationData = {
      code: code,
      email: userEmail,
      userName: userName
    };

    const templateParams = {
      user: userEmail,
      name: userName,
      from: emailConfig.toEmail,
      to: userEmail,
      code: code,
      title: "Registrant Email Address Verification"
    };

    emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      templateParams,
      emailConfig.publicKey
    )
    .then((response) => {
      notify('Verification email sent successfully!', 'green');
    })
    .catch((error) => {
      notify(`Failed to send verification email: ${error.text}`, 'red');
    });

    return code;
  };

  const verifyCode = (inputCode, email = userEmail, name = userName) => {
    return (
      inputCode === verificationData.code &&
      email === verificationData.email &&
      name === verificationData.userName
    );
  };

  const getVerificationData = () => {
    return { ...verificationData };
  };

  return {
    sendEmail,
    verifyCode,
    getVerificationData
  };
};

export default EmailVerifier;