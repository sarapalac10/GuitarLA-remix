import Post from './post'

function ListadoPost({posts}) {
  return (
    <>
        <h2 className="heading">Blog</h2>
        <div className="blog">
            {posts.map(post => (
            <Post
                post={post.attributes}
                key={post.id}
            />
            ))}
      </div>
    </>
  )
}

export default ListadoPost