import { Link } from "@remix-run/react";
import { formatoFecha } from '~/utils/helpers'

function Post({post}) {
    //console.log('post :>> ', post);
    const {titulo, contenido, imagen, url, publishedAt} = post
  return (
    <article className="post">
        <img src={imagen.data.attributes.formats.small.url} alt={`imagen del blog ${titulo}`} />
        <div className="contenido">
            <h3>{titulo}</h3>
            <p className="fecha">{formatoFecha(publishedAt)}</p>
            <p className="resumen">{contenido}</p>
            <Link className="enlace" to={`/posts/${url}`}>Ir al artículo completo</Link>

        </div>
    </article>
  )
}

export default Post