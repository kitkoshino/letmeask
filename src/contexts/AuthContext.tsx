import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth, firebase } from '../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

// "formato" do valor do contexto
export const AuthContext = createContext({} as AuthContextType );

export const AuthContextProvider = (props: AuthContextProviderProps) => {

  const [user, setUser] = useState<User>();

  useEffect(() => {
    // event listener do firebase, detecta se o user já tinha logado antes
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const {displayName, photoURL, uid} = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google account.')
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    //"desliga" o event listener
    return () => {
      unsubscribe();
    }
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const res = await auth.signInWithPopup(provider);
 
    if (res.user) {
      const {displayName, photoURL, uid} = res.user;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>

  );
};
