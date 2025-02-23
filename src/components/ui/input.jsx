import React from 'react';

const Input = ({name, register, validation, error, ...props}) => {

  return (
    <div>
      <input
        {...props}
        {...register(name, validation)}
        className="border-2 border-black w-64 rounded-xl h-9 px-2 "
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
