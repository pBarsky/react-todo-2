import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'

export default function PrivateRoute ({ component: Component, ...rest }: { component: any }) {
  const currentUser = useAuth()
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login"/>
      }}
    />
  )
}
