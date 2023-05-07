import type { AppProps } from 'next/app'
import '../styles/globals.css'
import '@tensorflow/tfjs-backend-cpu'
import '@tensorflow/tfjs-backend-webgl'
import '@tensorflow/tfjs'

import Header from '@/components/Header'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}
