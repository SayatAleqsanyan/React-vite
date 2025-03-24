import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
    .sendForm('service_ccien8t', 'template_r0bcmnx', form.current, {
      publicKey: '9KcpeN7tE7sLaudVG',
    })
    .then(
      () => {
        console.log('SUCCESS!');
      },
      (error) => {
        console.log('FAILED...', error.text);
      },
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 w-[50%] min-w-[300px]">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <form
          className="space-y-8"
          ref={form}
          onSubmit={sendEmail}
        >
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
            <input
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Let us know how we can help you"
              type="text"
              name="user_name"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
            <input
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              type="email"
              name="user_email"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Message</label>
            <textarea
              rows={10}
              placeholder="Leave a mesesage..."
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              name="message"
            />
          </div>
          <input
            className="cursor-pointer hover:bg-blue-600 hover:text-white py-3 px-5 text-sm font-medium text-center dark:text-white rounded-lg sm:w-fit focus:ring-4 focus:outline-none"
            type="submit"
            value="Send"
          />
        </form>
      </div>
    </div>
  );
};

export default Contact;