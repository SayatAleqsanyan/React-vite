const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
const usernameRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{1,}$/

export const userValidation = {
  pattern: {
    value: usernameRegex,
    message: 'Username error',
  },
  required: {
    value: true,
    message: 'Username is required',
  },
}

export const emailValidation = {
  pattern: {
    value: emailRegex,
    message: 'Email error',
  },
  required: {
    value: true,
    message: 'Email is required',
  },
}

export const passwordValidation = {
  pattern: {
    value: passwordRegex,
    message: 'Password error',
  },
  required: {
    value: true,
    message: 'Password is required',
  },
  minLength: {
    value: 8,
    message: 'Min 8 symbols',
  },
  maxLength: {
    value: 16,
    message: 'Max 16 symbols',
  },
}
