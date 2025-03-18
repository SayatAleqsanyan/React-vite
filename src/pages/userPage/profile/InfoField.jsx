export const InfoField = ({ label, value }) => {
  if (!value) return null;

  return (
    <div className="mb-2">
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}: </span>
      <span className="text-gray-800 dark:text-gray-200">{value}</span>
    </div>
  );
};

