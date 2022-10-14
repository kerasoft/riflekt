import { Layout } from '../components'
import { AuthProvider } from '../context/authContext'
import { StateContext } from '../context/stateContext'
import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }) {
  return <StateContext>
    <Toaster />
    <AuthProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </AuthProvider>
  </StateContext>
}

export default MyApp
