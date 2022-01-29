import { useRouter } from 'next/router';
import styles from '../styles/Toolbar.module.css'
import Auth from '../components/auth'



export const Toolbar = () => {
      const router = useRouter();
      return (
            <div className={styles.main}>
                  <div onClick={() => router.push('/')}>Home</div>
                  <div onClick={() => window.location.href = 'https://twitter.com/'}>Twitter</div>
                  <div onClick={() => window.location.href = 'https://github.com/lloret82'}>GitHub</div>
                  <Auth/>

            </div>
      );
};