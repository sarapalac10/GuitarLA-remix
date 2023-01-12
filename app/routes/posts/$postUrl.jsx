import { useLoaderData } from '@remix-run/react';
import { getPost } from '~/models/posts.server'
import { formatoFecha } from '~/utils/helpers';
import styles from '~/styles/blog.css'

export function meta({data}) {
    if(!data){
        return{
            title: 'GuitarLA - Entrada de blog no encontrada',
            description: `Guitarra, blog de música, blog no encontrado`
        }
    }

    return{
        title: `GuitarLA- ${data.data[0].attributes.titulo}`,
        description: `Guitarra, blog de música, ${data.data[0].attributes.titulo}`
    }
}

export function links(){
    return [
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

export async function loader({params}){
    const { postUrl } = params;
    //console.log('postUrl', postUrl)
    const post = await getPost(postUrl);

    if(post.data.length === 0){
        throw new Response('', {
            status: 404,
            statusText: ' Entrada de Blog No encontrada'
        })
    }

    //console.log('post :>> ', post.data);
    return post
}

function Post() {
    const post = useLoaderData()
    //console.log('post :>> ', post.data[0].attributes);

    const {titulo, contenido, imagen, publishedAt} = post.data[0]?.attributes

  return (
    <article className='contenedor post mt-3'>
        <img src={imagen?.data?.attributes?.url} alt={`imagen del blog ${titulo}`} />
        <div className="contenido">
            <h3>{titulo}</h3>
            <p className='fecha'>{formatoFecha(publishedAt)}</p>
            <p className='texto'>{contenido}</p>
        </div>

    </article>
  )
}

export default Post