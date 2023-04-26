import { useState } from 'react'
import './App.css';
import logo from './assets/logo.png';
import { GoogleLoginButton, GithubLoginButton } from './Components/LoginButton';
import LogoutButton from './Components/LogoutButton';
import { signInWithGoogle, signInWithGithub, logOut } from './Firebase';


const App = () => {

  const [userName, setUserName] = useState();
  const [photoURL, setPhotoURL] = useState();

  const login = async () => {
  const result =  await signInWithGoogle();
    setUserName(result?.user?.displayName);
    setPhotoURL(result?.user?.photoURL);
    console.log(result)
  }

  const githubLogin = async () => {
    const result =  await signInWithGithub();
      setUserName(result?.user?.displayName);
      setPhotoURL(result?.user?.photoURL);
      console.log(result)
    }

  const signOut = () => {
    logOut();
    setUserName("");
    setPhotoURL("");
  }

  return (
    <div className="App">

      <div className="App__Login">
          <h2 className="App__header">Login to DeveloperBud</h2>
          <p className="App__subHeader">Dont have an account yet? <span className="App__subHeaderSign">Sign Up for Free</span></p>

          {userName? <LogoutButton handleClick={signOut}/> : <GoogleLoginButton handleClick={login}/>}
          {userName? <LogoutButton handleClick={signOut}/> : <GithubLoginButton handleClick={githubLogin}/>}

          {photoURL? <img className="App__UserPhoto" src={photoURL} alt="User Profile" /> : <div></div>}

         {!userName ?  <h2 className="App__UserName">Welcome User, Please Sign In!</h2> : <h2 className="App__UserName">Welcome {userName}!</h2> }
      </div>


      <div className="App__Logo">
        <img src={logo} alt="Logo" />
      </div>
      
    </div>
  )
}

export default App
