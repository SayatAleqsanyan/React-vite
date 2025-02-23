import { toast } from 'react-toastify'

export const notify = (text, color) =>
  toast(` 🔔  ${text} `, {
    position: 'top-center',
    autoClose: 2000,
    autoBackgroundColor: '#777',

    style: {
      background: color,
      color: '#fff',
      fontWeight: 'bold',
      fontSize: '18px',
    },
  })
