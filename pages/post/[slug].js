import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';
import { groq } from '@sanity/groq-store'
import BlockContent from '@sanity/block-content-to-react';
import { Toolbar } from '../../components/Toolbar';
import Comments from '../../components/Comment';
import { useRouter } from 'next/router';
import Image from 'next/image'

import sanityClient from "../../client";

export const Post = ({ slug, title, body, image }) => {

      const router = useRouter();

      const [imageUrl, setImageUrl] = useState('');
      const [otherPosts, setOtherPosts] = useState([]);

      useEffect(async () => {
            let res = await sanityClient.fetch("*[_type=='post']")

            if (!!res.length) {
                  const imgBuilder = imageUrlBuilder({
                        projectId: 'cxkian3k',
                        dataset: 'production',
                  });

                  let filteredData = res.reduce((acc, curr) => {
                        if (curr.slug.current !== slug) {
                              return [...acc, { ...curr, mainImage: imgBuilder.image(curr.mainImage) }]
                        }
                        return acc
                  }, [])

                  setOtherPosts(filteredData)
            }
      }, [router.query.slug])

      useEffect(async () => {
            const imgBuilder = imageUrlBuilder({
                  projectId: 'cxkian3k',
                  dataset: 'production',
            });

            setImageUrl(imgBuilder.image(image));
      }, [image]);


      return (
            <div>
                  <Toolbar />
                  <main className='flex mb-4'>

                        <article className="container shadow-lg  bg-gray rounded-lg">
                              <header className="relative">
                                    <div className="absolute h-full w-full flex items-center justify-center p-8">
                                          <div className="bg-white bg-opacity-75 rounded p-12">
                                                <h1 className="cursive text-3xl lg:text-6xl mb-4">
                                                      {title}
                                                </h1>
                                                <p>{ }</p>

                                          </div>
                                    </div>
                                    <img
                                          src={imageUrl}

                                          className="w-full object-cover rounded-t"
                                          style={{ height: "400px" }}
                                    />
                              </header>
                              <div className="px-8 lg:px-48 py-12 lg:py-20  lg:prose-xl max-w-full">
                                    <BlockContent blocks={body} projectId='cxkian3k' dataset='production' />
                              </div>
                        </article>

                        <div className='grid-cols-1 ' >
                              {/* const src = {post.mainImage} */}
                              {!!otherPosts.length && otherPosts.map((post, index) => {
                                    return <div style={{ cursor: 'pointer' }} className='p-4  ' onClick={() => router.push(`/post/${post.slug.current}`)} key={index}>


                                          <img
                                                src={post.mainImage}
                                                className=" flex w-32 flex items-center justify-center m-0  "
                                          />
                                          <div className='  flex items-center justify-center border-4 '>{post.title}
                                          </div></div>
                              })}
                        </div >
                  </main >
                  <Comments />
            </div >














            // <div>
            //       <Toolbar />
            //       <div className={styles.main}>
            //             <h1>{title}</h1>
            //             {imageUrl && <img className={styles.mainImage} src={imageUrl} />}

            //             <div className={styles.body}>
            //                   <BlockContent blocks={body} projectId='cxkian3k' dataset='production' />
            //             </div>
            //       </div>
            // </div>
      );
};

export const getServerSideProps = async pageContext => {
      const pageSlug = pageContext.query.slug;

      if (!pageSlug) {
            return {
                  notFound: true
            }
      }

      const query = encodeURIComponent(`*[ _type == "post" && slug.current == "${pageSlug}" ]`);
      const url = `https://cxkian3k.api.sanity.io/v1/data/query/production?query=${query}`;

      const result = await fetch(url).then(res => res.json());
      const post = result.result[0];

      if (!post) {
            return {
                  notFound: true
            }
      } else {
            return {
                  props: {
                        body: post.body,
                        title: post.title,
                        image: post.mainImage,
                        slug: post.slug.current
                  }
            }
      }
};

export default Post;