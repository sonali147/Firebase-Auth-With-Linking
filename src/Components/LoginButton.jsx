import React from 'react';
import './LogoutButton.css';

export const GoogleLoginButton = ({handleClick}) => {


  return (
      <div className="LoginButton" onClick={handleClick}>
          <h2>Sign In With Google</h2>   
      </div>
  )
}

export const GithubLoginButton = ({handleClick}) => {


  return (
      <div className="LoginButton" onClick={handleClick}>
          <h2>Sign In With Github</h2>   
      </div>
  )
}
