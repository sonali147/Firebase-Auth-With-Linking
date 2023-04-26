import React from 'react'
import './LoginButton.css';

const LogoutButton = ({handleClick}) => {
  return (
    <div className='LogoutButton' onClick={handleClick}>
    <h2>Sign Out</h2>
    </div>
  )
}

export default LogoutButton