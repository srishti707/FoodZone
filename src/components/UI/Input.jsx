import React from 'react'

const Input = ({label,id,...props}) => {
  return (
    <div>
      <p className="control">
        <label htmlFor={id}>{label}</label>
        <input id={id} name={id}{...props} required />
      </p>
    </div>
  )
}

export default Input
