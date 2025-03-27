import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import {notify} from "../../utils/notify.js";

const Contact = () => {
  const TO_EMAIL = 'sayad.aleksanyan@mail.ru';
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const userEmail = form.current.querySelector('input[name="user_email"]').value;
    const userName = form.current.querySelector('input[name="user_name"]').value;
    const userMessage = form.current.querySelector('textarea[name="message"]').value;
    const userMobile = form.current.querySelector('input[name="user_mobile"]').value;

    if (!userName || !userEmail || !userMessage) {
      notify('Please fill in all required fields');
      return;
    }

    const serviceId = 'service_ccien8t';
    const templateId = 'template_r0bcmnx';
    const publicKey = '9KcpeN7tE7sLaudVG';

    const templateParams = {
      user: userEmail,
      name: userName,
      to: TO_EMAIL,
      email: userEmail,
      message: userMessage,
      mobile: userMobile
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
    .then((response) => {
      notify('Message sent successfully!', 'green');
      form.current.reset();
    })
    .catch((error) => {
      notify(`Failed to send message: ${error.text}`, 'red');
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 w-[50%] min-w-[300px]">
      <div className="lg:py-16 px-4 mx-auto max-w-screen-md">
        <form
          className="space-y-8"
          ref={form}
          onSubmit={sendEmail}
        >
          <div>
            <label htmlFor="user_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
            <input
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Enter your Name"
              type="text"
              name="user_name"
              required
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="user_email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
            <input
              className="text-sm block p-3 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Enter your email"
              type="email"
              name="user_email"
              required
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="user_mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mobile Number</label>
            <input
              className="text-sm block p-3 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Enter your Mobile Number (not required)"
              type="tel"
              name="user_mobile"
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Message</label>
            <textarea
              rows={5}
              placeholder="Enter your message"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              name="message"
              required
              autoComplete="off"
            />
          </div>

          <input
            className="cursor-pointer bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 text-sm font-medium text-center rounded-lg sm:w-fit focus:ring-4 focus:outline-none"
            type="submit"
            value="Send Message"
          />
        </form>
      </div>
    </div>
  );
};

export default Contact;