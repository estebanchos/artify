import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen space-y-8 lg-flex-row'>
      <Head>
        <title>Artify</title>
        <meta name="Art Management Tool" content="Artify helps artists manage their art and collectors find art" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="text-3xl font-bold">
          Welcome to Artify
        </h1>
      </main>

    </div>
  )
}
