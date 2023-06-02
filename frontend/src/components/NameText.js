import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

export const NameText = () => {

    const [user] = useAuthState(auth);

  return (
    <span>{user?.displayName.split(" ")[0]}</span>
  )
}
