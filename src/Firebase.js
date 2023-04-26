// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, fetchSignInMethodsForEmail, signOut, signInWithCredential, linkWithCredential } from "firebase/auth";

const firebaseConfig = {
  apiKey: "<api key>",
  authDomain: "<auth domain>",
  projectId: "<project id>",
  storageBucket: "<storage bucket>",
  messagingSenderId: "<sender id>",
  appId: "<app id>"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.addScope("profile")
provider.addScope("email")
const auth = getAuth(app);

const githubProvider = new GithubAuthProvider();
githubProvider.addScope('repo');

function getProvider(providerId) {
  switch (providerId) {
    case GoogleAuthProvider.PROVIDER_ID:
      return new GoogleAuthProvider();
    case GithubAuthProvider.PROVIDER_ID:
      return new GithubAuthProvider();
    default:
      throw new Error(`No provider implemented for ${providerId}`);
  }
}

const supportedPopupSignInMethods = [
  GoogleAuthProvider.PROVIDER_ID,
  GithubAuthProvider.PROVIDER_ID,
];

export const signInWithGoogle = async () => {
  const res =  await signInWithPopup(auth, provider);
  // extract email and oauthToken from res and store in localStorage
  // will be used if user tries to login with another auth provider using same email as google's
  return res;
};

export const signInWithGithub = async () => {
  let result;
  try {
    result = await signInWithPopup(auth, githubProvider);
    return result;
  } catch (err) {
    console.log(err.code)
    if (err.code === 'auth/account-exists-with-different-credential') {
      // Ref: https://blog.wedport.co.uk/2020/05/29/react-native-firebase-social-auth-with-linking/
      const email = '<get this value from local storage>';
      let credential = GoogleAuthProvider.credential(null, '<get this value from local storage>');
      const providers = await fetchSignInMethodsForEmail(auth, email)
      const firstPopupProviderMethod = providers.find(p => supportedPopupSignInMethods.includes(p));

      // Test: Could this happen with email link then trying social provider?
      if (!firstPopupProviderMethod) {
        throw new Error(`Your account is linked to a provider that isn't supported.`);
      }

      const linkedProvider = getProvider(firstPopupProviderMethod);
      linkedProvider.setCustomParameters({ login_hint: email });

      result = await signInWithCredential(auth, credential);
      try {
        await linkWithCredential(result.user, credential);
      } catch (error) {
        console.log(error.code);
        if (error.code !== 'auth/provider-already-linked') {
          throw new Error(error)
        }
        return result;
      }
      return result;
    }
  }
};

export const logOut = () => {
  signOut(auth)
}