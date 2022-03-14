import React, { useState, useEffect } from 'react'
import Login from './comps/Login';
import Signup from './comps/Signup'
import Home from './comps/Home'
import { auth } from './fbase';

function App() {

  const [user, setUser] = useState(() => auth.currentUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [init, setInit] = useState(true);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => {
      { user ? setUser(user) : setUser(null) }
      { init ? setInit(false) : setInit(true) }
    })

    return unsub;
  }, []);

  if(init) return "Loading . . .";

  return (
    <div>
      { user ? <Home user={user} email={email} /> : <Login user={user} setUser={setUser} email={email} setEmail={setEmail} password={password} setPassword={setPassword} /> }
    </div>
  );
}

export default App