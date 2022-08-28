import { useState } from 'react'
import Layout from '../components/Layout'
import AppContext from '../context/AppContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <AppContext.Provider
      value={{ isAuthenticated, setIsAuthenticated }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  )
}

export default MyApp
