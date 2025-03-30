import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import { notify } from "../../../utils/notify.js";

const emailConfig = {
  serviceId: 'service_ccien8t',
  templateId: 'template_uyjq9zi',
  publicKey: '9KcpeN7tE7sLaudVG',
  toEmail: 'sayad.aleksanyan@mail.ru'
};

const Contact = ({ number }) => {
  const [verification, setVerification] = useState({
    code: null,
    email: null,
    userName: null
  });

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const userEmail = form.current.querySelector('input[name="user_email"]').value;
    const userName = form.current.querySelector('input[name="user_name"]').value;
    const userMessage = form.current.querySelector('textarea[name="message"]').value;

    if (!userName || !userEmail || !userMessage) {
      notify('Please fill in all required fields');
      return null;
    }

    const code = (Math.floor(Math.random() * 10 ** number) / 10 ** number).toFixed(number);

    setVerification({
      code: code,
      email: userEmail,
      userName: userName
    });

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
      notify('Registrant Email Address Verification!', 'green');
      form.current.reset();
    })
    .catch((error) => {
      notify(`Failed to send message: ${error.text}`, 'red');
    });

    return code;
  };

  const verifyCode = (inputCode, email, userName) => {
    return (
      inputCode === verification.code &&
      email === verification.email &&
      userName === verification.userName
    );
  };

  return {
    sendEmail,
    verifyCode,
    form
  };
};

export default Contact;