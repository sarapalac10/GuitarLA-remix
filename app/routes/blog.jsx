import { useLoaderData } from '@remix-run/react';
import { getPosts } from '~/models/posts.server'
import Post from '~/components/post'
import styles from '~/styles/blog.css'

export async function loader() {
   const posts = await getPosts();
   //console.log('posts', posts.data)
   return posts.data
}

export function links(){
  return[
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

export function meta() {
    return{
      title: 'GuitarLA - Blog',
    }
}

function Blog() {
  const posts = useLoaderData()

  return (
    <main className="contenedor">
      <h2 className="heading">Blog</h2>
      <div className="blog">
        {posts.map(post => (
          <Post
            post={post.attributes}
            key={post.id}
          />
        ))}
      </div>
    </main>
  )
}

export default Blog