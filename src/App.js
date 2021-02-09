import { BrowserRouter } from 'react-router-dom'
import Layout from './containers/Layout/Layout'
import { AuthProvider } from './contexts/authContext'
import { DbProvider } from './contexts/dbContext'

function App () {
  return (
    <AuthProvider>
      <DbProvider>
        <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>
          <Layout />
        </BrowserRouter>
      </DbProvider>
    </AuthProvider>
  )
}

export default App
