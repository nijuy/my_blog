import React, { useEffect, useState } from 'react';
import { authService } from "fbase";
import BlogRouter from './Router';

function App() {
  const[init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) { 
        setUserObj({
          displayName : user.displayName,
          uid : user.uid,
          email : user.email,
          photoURL : user.photoURL,
          updateProfile : (args) => user.updateProfile(args)
        });
      } else { setUserObj(null); }
      setInit(true);
    }
  )}, []);

  const refreshUser = () => {
    setUserObj(authService.currentUser);
  };

  return (
    <>
    { init ?
      <BlogRouter
        userObj = {userObj}
        isLoggedIn = {Boolean(userObj)}
        refreshUser = {refreshUser}
      /> :
      '잠시만 기다려주세요 . . . '
    }
    </>
  );
}

export default App;
