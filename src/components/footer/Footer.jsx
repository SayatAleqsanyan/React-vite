const Footer = () => {
    const date = new Date().getFullYear()

    return (
        <footer id='footer' className="w-[100%] min-h-[50px] transition-all duration-300 bg-blue-600 dark:bg-gray-900 text-white text-center flex items-center justify-center">
            {date} &copy; All rights reserved.
        </footer>
    )
};

export default Footer;
