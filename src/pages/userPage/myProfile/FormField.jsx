export const FormField = ({ id, label, type, value, onChange, autoComplete, placeholder, disabled }) => {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium mb-1" htmlFor={id}>{label}</label>
      <input
        id={id}
        className='w-full p-2 border rounded mb-2 dark:bg-gray-500'
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
      />
    </div>
  );
};