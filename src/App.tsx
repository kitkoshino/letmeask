import { createContext, useState, useEffect } from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { auth, firebase } from './services/firebase';

import './styles/global.scss';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  sigInWithGoogle: () => Promise<void>;
}

// "formato" do valor do contexto
export const AuthContext = createContext({} as AuthContextType );

function App() {
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

  async function sigInWithGoogle() {
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
    <BrowserRouter>
      <AuthContext.Provider value={{ user, sigInWithGoogle }}>
        {/* tudo que está dentro do provider tem acesso ao valor do contexto */}
        <>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
        </>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
