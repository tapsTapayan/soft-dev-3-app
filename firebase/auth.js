import {
  browserLocalPersistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

import { auth } from './config';

//Firebase Functions
async function logout() {
  await signOut(auth);
}

async function setRememberUser(shouldRememberUser) {
  await setPersistence(auth, shouldRememberUser ? browserLocalPersistence : browserSessionPersistence);
}

async function login(email, password) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);

  return user;
}

export {login,logout,setRememberUser}