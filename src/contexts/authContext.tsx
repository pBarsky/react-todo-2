import React, { createContext, useContext, useEffect, useState } from 'react'
import firebase, { auth } from '../firebase'

interface authContextState {
  resetPassword: (email: string, actionCodeSettings?: (firebase.auth.ActionCodeSettings | null | undefined)) => Promise<void>;
  currentUser: firebase.User | null;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<firebase.auth.UserCredential | null>;
  signup: (email: string, password: string) => Promise<firebase.auth.UserCredential | null>
}

const initialState: authContextState = {
  login (email: string, password: string): Promise<firebase.auth.UserCredential | null> {
    return Promise.resolve(null)
  },
  logout (): Promise<void> {
    return Promise.resolve(undefined)
  },
  resetPassword (email: string, actionCodeSettings: firebase.auth.ActionCodeSettings | null | undefined): Promise<void> {
    return Promise.resolve(undefined)
  },
  signup (email: string, password: string): Promise<firebase.auth.UserCredential | null> {
    return Promise.resolve(null)
  },
  currentUser: null
}

const AuthContext = createContext(initialState)

interface Props {
  children: React.ReactElement
}

export function AuthProvider ({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })
  }, [])

  function signup (email: string, password: string): Promise<firebase.auth.UserCredential> {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login (email: string, password: string): Promise<firebase.auth.UserCredential> {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout (): Promise<void> {
    return auth.signOut()
  }

  function resetPassword (email: string, actionCodeSettings?: firebase.auth.ActionCodeSettings | null | undefined): Promise<void> {
    return auth.sendPasswordResetEmail(email, actionCodeSettings)
  }

  const value: authContextState = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth () {
  return useContext(AuthContext)
}
