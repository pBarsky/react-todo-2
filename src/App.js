import { HashRouter } from 'react-router-dom'
import Layout from './containers/Layout/Layout'
import { AuthProvider } from './contexts/authContext'
import { DbProvider } from './contexts/dbContext'

function App () {
  return (
    <AuthProvider>
      <DbProvider>
        <HashRouter basename={process.env.PUBLIC_URL}>
          <Layout />
        </HashRouter>
      </DbProvider>
    </AuthProvider>
  )
}

export default App
