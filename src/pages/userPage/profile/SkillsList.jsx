export const SkillsList = ({ skills }) => {
  if (!skills || skills.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400">No skills listed</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded"
        >
          {skill}
        </span>
      ))}
    </div>
  );
};