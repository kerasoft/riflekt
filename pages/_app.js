import { Layout } from '../components'
import { AuthProvider } from '../context/authContext'
import { StateContext } from '../context/stateContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <StateContext>
    <AuthProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </AuthProvider>
  </StateContext>
}

export default MyApp
