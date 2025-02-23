import React from 'react'

const Button = ({isValid, children}) => {
  return (
    <button type="submit" className="border border-black rounded-xl w-64 bg-amber-50" disabled={!isValid}>
      {children}
    </button>
  )
}

export default Button
