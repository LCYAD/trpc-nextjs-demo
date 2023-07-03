import Head from 'next/head';

import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Just a normal TPRC demo</title>
        <meta name="description" content="Just a normal TPRC demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.inputContainter} />
      </main>
    </div>
  );
}
