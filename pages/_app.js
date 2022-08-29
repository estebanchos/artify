import { useState } from 'react'
import Layout from '../components/Layout'
import AppContext from '../context/AppContext'
import '../styles/globals.css'
import 'antd/dist/antd.min.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [role, setRole] = useState(null)

  return (
    <AppContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, role, setRole }}
    >
      <Head>
        <title>Artify - The artist tool</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  )
}

export default MyApp
