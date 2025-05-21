import React from 'react'

function Button({submit, children, handler}) {
  return (
    <button onClick={handler} type={submit?"submit":"button"} className='w-1/2 rounded-xl bg-[#D7C7F4] shadow hover:cursor-pointer hover:bg-[#AF9FCD]'>
      {children}
    </button>
  )
}

export default Button
