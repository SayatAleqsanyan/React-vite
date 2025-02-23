import React from "react";

const Footer = () => {
    const date = new Date().getFullYear()

    return (
        <footer id='footer' className="w-[100%] min-h-[100px] bg-gray-500 dark:bg-gray-900 dark:text-white text-center flex items-center justify-center">
            {date} &copy; All rights reserved.
        </footer>
    )
};

export default Footer;
