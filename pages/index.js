// import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Toolbar } from '../components/Toolbar';
import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CookieConsent from "react-cookie-consent";
<head>
  <script
    async
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
    crossOrigin="anonymous"
  />
</head>

export default function Home({ posts }) {
  const router = useRouter();

  const [mappedPosts, setMappedPosts] = useState([]);

  useEffect(() => {
    if (posts.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: 'cxkian3k',
        dataset: 'production',
      });

      setMappedPosts(
        posts.map(p => {
          return {
            ...p,
            mainImage: imgBuilder.image(p.mainImage).width(500).height(250),
          }
        })
      );
    } else {
      setMappedPosts([]);
    }
  }, [posts]);

  return (

    <main >
      <head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
          crossOrigin="anonymous"
        />
      </head>
      <div className={styles.body}>
        <Toolbar />


        <div className={styles.main}>
          <h1 className={styles.h1}>Welcome To My Blog</h1>

          <h3 className={styles.h1}>Recent Posts:</h3>

          <div className={styles.container}>

            {mappedPosts.length ? mappedPosts.map((p, index,) => (
              <div onClick={() => router.push(`/post/${p.slug.current}`)} key={index} >
                <div className={styles.container}>
                  <div className={styles.card}>
                    <div className={styles.card__header}>
                      <img src={p.mainImage} alt="card__image" className={styles.card__image} width="600" />
                    </div>
                    <div className={styles.card__body}>
                      <h4>{p.title}</h4>
                      <p>{p.text}</p>
                    </div>

                  </div>
                </div>
              </div>





            )) : <>No Posts Yet</>}
          </div>
        </div>


      </div>
      <CookieConsent
        location="bottom"
        buttonText="Sure"
        cookieName="myAwesomeCookieName2"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
        enableDeclineButton
        onDecline={() => {
          alert("That's Fine!!");
        }}
      >
        This website uses cookies to enhance the user experience.{""}
        <span style={{ fontSize: "10px" }}>Accept or Decline</span>
        <div onClick={() => router.push('/policy')} >Read More</div>
      </CookieConsent>
    </main>

  );
}

export const getServerSideProps = async pageContext => {
  const query = encodeURIComponent('*[ _type == "post" ]');
  const url = `https://cxkian3k.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then(res => res.json());

  if (!result.result || !result.result.length) {
    return {
      props: {
        posts: [],
      }
    }
  } else {
    return {
      props: {
        posts: result.result,
      }
    }
  }
};