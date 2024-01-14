import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout/Layout';
import "./global.css"

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Verifica si la página actual es "about"
  const isAboutPage = router.pathname === '/about';

  useEffect(() => {
    // Puedes realizar acciones específicas cuando estás en la página "about"
    if (isAboutPage) {
      console.log('Estás en la página "about"');
    }
  }, [isAboutPage]);

  // Utiliza el diseño específico o el diseño predeterminado
  return isAboutPage ? (
    <Component {...pageProps} />
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;