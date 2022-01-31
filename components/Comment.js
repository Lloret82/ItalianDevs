import { DiscussionEmbed } from "disqus-react"
import { useUser } from '@auth0/nextjs-auth0';
import styles from '../styles/Home.module.css'
import Link from "next/link";

const Comments = (post) => {
      const disqusShortname = "ItalianDevs"
      const { user } = useUser()
      const disqusConfig = {
            url: "https://italian-devs.vercel.app/post.slug",
            identifier: post.id,
            title: post.slug
      }

      return (
            <div>
                  {user && (<div>
                        <DiscussionEmbed
                              shortname={disqusShortname}
                              config={disqusConfig}
                        />
                  </div>)}
                  {!user && <h1 className={styles.comment_link}> Please <button><Link href="/api/auth/login" type="link">Login</Link></button>  to comment</h1>}
            </div>

      )
}

export default Comments;