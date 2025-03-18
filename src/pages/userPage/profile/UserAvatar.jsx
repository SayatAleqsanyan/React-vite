export const UserAvatar = ({ imgURL, userName }) => {
  if (imgURL) {
    return (
      <div className="flex-shrink-0">
        <img
          src={imgURL}
          alt={`${userName}'s profile`}
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
        />
      </div>
    );
  }

  // Fallback to initials avatar if no image URL
  const initials = userName ? userName.substring(0, 2).toUpperCase() : "??";

  return (
    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
      {initials}
    </div>
  );
};
